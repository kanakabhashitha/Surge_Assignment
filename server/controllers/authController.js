import User from "../models/User.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    accountType,
    mobile,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !dateOfBirth ||
    !accountType ||
    !mobile
  ) {
    const err = new BadRequestError("Please provide all values");
    next(err);
  }

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    const err = new BadRequestError("Email is already exists");
    next(err);
  }

  try {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(201).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        mobile: user.mobile,
        accountType: user.accountType,
        status: user.status,
      },
      token,
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

const updateUser = async (req, res) => {
  try {
    const { email, name, lastName } = req.body;

    if (!email || !name || !lastName) {
      throw new BadRequestError("Please provide all values");
    }

    const admin = await Admin.findOne({ _id: req.admin.adminId });

    admin.email = email;
    admin.name = name;
    admin.lastName = lastName;

    await admin.save();

    const token = admin.createJWT();

    res.status(200).json({ admin, token });
  } catch (error) {
    next(error);
  }
};

export { register, login, updateUser };
