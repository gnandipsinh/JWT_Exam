import User from "../model/user.models.js";

import HttpError from "../middleware/httpError.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "user added successfully", newUser });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HttpError("Email and password are required", 400));
    }

    const user = await User.findByCredential(email, password);
    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return next(new HttpError(error.message, 401));
  }
};

const authLogin = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user",
    user: req.user,
  });
};

const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const user = await User.deleteOne({ _id });

    if (user.deletedCount === 0) {
      return next(new HttpError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
export default { add, getAll, login,authLogin,deleteUser};
