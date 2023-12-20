const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const usersRouter = require("./routes/user.router");
const blogsRouter = require("./routes/blog.router");

const app = express();

//handling cross origin
app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

app.use(morgan("combined"));
app.use(express.json());

app.use("/api/user", usersRouter);
app.use("/api/blog", blogsRouter);

module.exports = app;
