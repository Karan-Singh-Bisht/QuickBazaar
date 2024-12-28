const userService = require("../services/user.service");

const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];
    if (!jwt) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await userService.getUserProfileByToken(jwt);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json({
      user: rest,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getUserProfile, getAllUsers };
