const express = require("express");
const { getAllBlogs, addBlog, updateBlog, getBlogById, deleteBlog, getByUserId } = require("../controllers/blog.controller");

const blogsRouter = express.Router();

blogsRouter.get("/", getAllBlogs);
blogsRouter.post("/add", addBlog);
blogsRouter.put("/update/:id", updateBlog);
blogsRouter.get("/:id", getBlogById);
blogsRouter.delete("/:id", deleteBlog);
blogsRouter.get("/user/:id", getByUserId);

module.exports = blogsRouter;
