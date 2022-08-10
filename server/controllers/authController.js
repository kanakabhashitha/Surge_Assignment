import User from "../models/User.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
  const { firstName, email, password } = req.body;

  if (!firstName || !email || !password) {
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
        email: user.email,
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

const updateUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      mobile,
      status,
    } = req.body;

    if (!firstName || !lastName || !email || !dateOfBirth || !mobile) {
      throw new BadRequestError("Please provide all values");
    }

    const user = await User.findOne({ _id: req.user.userId });

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.dateOfBirth = dateOfBirth;
    user.mobile = mobile;
    user.status = status;

    await user.save();

    const token = user.createJWT();

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export { register, login, updateUser };
