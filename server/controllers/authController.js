import User from "../models/User.js";
import Verification from "../models/Verification.js";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from "../errors/index.js";
import { generateOtp, mailTransport } from "../utils/Mail.js";
import { EmailTemplate, SuccessEmailTemplate } from "../utils/EmailTemplate.js";
import bcrypt from "bcryptjs";

const addUser = async (req, res, next) => {
  const { firstName, email } = req.body;

  if (!firstName || !email) {
    const err = new BadRequestError("Please provide all values");
    next(err);
  }

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    const err = new BadRequestError("Email is already exists");
    next(err);
  }

  try {
    const OTP = generateOtp();

    const user = new User({
      firstName: firstName,
      email: email,
      password: OTP,
    });

    await user.save();
    const token = user.createJWT();

    const verification = new Verification({
      createdBy: user._id,
    });

    await verification.save();

    mailTransport().sendMail({
      from: process.env.MAILTRAP_USER,
      to: user.email,
      subject: "Verify your email account",
      html: EmailTemplate(OTP, user.firstName, user._id),
    });

    res.status(201).json({
      user: {
        firstName: "Admin",
        accountType: "Admin",
        status: user.status,
      },
      token,
      msg: "User add successfully",
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { id: userId } = req.params;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new UnAuthenticatedError("Invalid Credentials");
    }

    if (user.verify) {
      const err = new BadRequestError("This account is already verified");
      next(err);
    }

    const verifyUser = await Verification.findOne({ createdBy: user._id });
    if (!verifyUser) {
      const err = new BadRequestError("Sorry! user not found");
      next(err);
    }

    user.verify = true;
    await Verification.findByIdAndDelete(verifyUser._id);
    await user.save();

    res
      .status(200)
      .json({ verify: user.verify, msg: "Verification successfully" });

    mailTransport().sendMail({
      from: process.env.MAILTRAP_USER,
      to: user.email,
      subject: "Verify successfully",
      html: SuccessEmailTemplate(user.firstName),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, accountType } = req.body;

    if (!email || !password || !accountType) {
      throw new BadRequestError("Please provide all values");
    }

    if (accountType != "Admin") {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      if (user.accountType != accountType) {
        throw new UnAuthenticatedError("Invalid Account Type");
      }

      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }
      const token = user.createJWT();
      user.password = undefined;
      res.status(200).json({ user, token });
    } else {
      const tempEmail = "admin@gmail.com";
      const tempPass = "admin";

      if (email != tempEmail && password != tempPass) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const user = new User({
        email: tempEmail,
        password: tempPass,
        accountType: "Admin",
        firstName: "Admin",
        status: true,
        verify: true,
      });
      const token = user.createJWT();
      user.password = undefined;
      res.status(200).json({ user, token });
    }
  } catch (error) {
    next(error);
  }
};

const resetUser = async (req, res, next) => {
  try {
    const {
      id,
      firstName,
      lastName,
      mobile,
      tempPassword,
      newPassword,
      confirmPassword,
      dateOfBirth,
    } = req.body;

    if (
      !id ||
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !mobile ||
      !tempPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      const err = new BadRequestError("Please provide all values");
      next(err);
    }

    const userDetails = await User.findOne({ _id: id }).select("+password");
    if (!userDetails) {
      const err = new NotFoundError(`No user with id :${id}`);
      next(err);
    }

    if (confirmPassword != newPassword) {
      throw new BadRequestError("Password is mismatch");
    }

    const isTempPassCorrect = await userDetails.comparePassword(tempPassword);
    if (!isTempPassCorrect) {
      throw new UnAuthenticatedError("Invalid temporary password");
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    const updateUser = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      mobile: mobile,
      status: true,
      password: password,
    };

    const user = await User.findOneAndUpdate({ _id: id }, updateUser, {
      new: true,
      runValidators: true,
    });

    // await user.save();
    const token = user.createJWT();

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const { sort, search } = req.query;

    const queryObject = {};

    // let result = User.find({ status: true });

    // search from first name
    if (search) {
      queryObject.firstName = { $regex: search, $options: "i" };
    }

    queryObject.status = true;
    let result = User.find(queryObject);

    //result sort

    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("firstName");
    }
    if (sort === "z-a") {
      result = result.sort("-firstName");
    }

    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const users = await result;

    const totalUser = await User.countDocuments(queryObject);

    const numOfPages = Math.ceil(totalUser / limit);

    res.status(200).json({ users, totalUser, numOfPages });
  } catch (error) {
    next(error);
  }
};

export { addUser, verifyEmail, login, resetUser, getAllUser };
