const User = require("../models/user.mongo");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({
      message: "No users found!",
    });
  }
  return res.status(200).json({
    users,
  });
};

async function signup(req, res) {
  const { name, email, password } = req.body;

  let existingUser;

  //temukan user berdasarkan email apakah sudah ada atau belum
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  //handling jika user sudah ada
  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }

  //encrypt password
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    return console.log(err);
  }
}

async function login(req, res) {
  const { name, email, password } = req.body;
  let existingUser;

  //temukan user berdasarkan email apakah sudah ada atau belum
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  //handling jika user sudah ada
  if (!existingUser) {
    return res.status(404).json({ message: "User not found!" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password!" });
  }
  return res.status(200).json({ message: "Login succeed!" });
}

module.exports = {
  getAllUsers,
  signup,
  login,
};
