import User from "../models/User.js";
import Verification from "../models/Verification.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import { generateOtp, mailTransport } from "../utils/Mail.js";
import { EmailTemplate, SuccessEmailTemplate } from "../utils/EmailTemplate.js";

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
        firstName: user.firstName,
        email: user.email,
        status: user.status,
        _id: user._id,
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
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnAuthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    user.password = undefined;
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const resetUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      tempPassword,
      newPassword,
      confirmPassword,
      dateOfBirth,
      mobile,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !mobile ||
      !tempPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      throw new BadRequestError("Please provide all values");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!confirmPassword === newPassword) {
      const err = new BadRequestError("Password is mismatch");
      next(err);
    }

    const isTempPassCorrect = await user.comparePassword(tempPassword);
    if (!isTempPassCorrect) {
      throw new UnAuthenticatedError("Invalid temporary password");
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.dateOfBirth = dateOfBirth;
    user.mobile = mobile;
    user.status = true;
    user.password = newPassword;

    await user.save();
    const token = user.createJWT();

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export { addUser, verifyEmail, login, resetUser };
