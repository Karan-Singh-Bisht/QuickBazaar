const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

// Create a new user
const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, password } = userData;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User({ firstName, lastName, email, password });
    const savedUser = await user.save();

    if (!savedUser) {
      throw new Error("Failed to create user");
    }

    return savedUser;
  } catch (err) {
    console.error("Error creating user", err.message);
    throw err;
  }
};

// Find user by ID
const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");

    if (!user) {
      throw new Error(`User not found with id ${userId}`);
    }

    return user;
  } catch (err) {
    console.error("Error finding user by id", err.message);
  }
};

// Get user by email
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(`User not found with email ${email}`);
    }

    return user;
  } catch (err) {
    console.error("Error getting user by email", err.message);
    throw err;
  }
};

// Get user profile by token
const getUserProfileByToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.id;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Invalid token or user not found");
    }

    return user;
  } catch (err) {
    console.error("Error verifying token", err.message);
    throw err;
  }
};

// Get all users
const getAllUsers = asyncHandler(async () => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      throw new Error("No users found");
    }

    return users;
  } catch (err) {
    console.error("Error getting all users", err.message);
    throw err;
  }
});

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
