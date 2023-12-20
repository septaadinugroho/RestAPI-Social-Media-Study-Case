const express = require("express");
const { getAllUsers, signup, login } = require("../controllers/user.controller");

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/signup", signup);
usersRouter.post("/login", login);

module.exports = usersRouter;
