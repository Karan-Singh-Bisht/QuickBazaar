const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service");

module.exports.registerUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    await cartService.createCart(newUser);

    // Send user details along with token
    return res.status(201).json({
      message: "User created successfully",
      token: token,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Couldn't create user",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid  password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
