const Blog = require("../models/blog.mongo");
const User = require("../models/user.mongo");
const mongoose = require("mongoose");

//menampilkan semua blog
async function getAllBlogs(req, res) {
  let blogs;

  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }

  if (!blogs) {
    return res.status(404).json({ message: "No blogs found!" });
  }
  return res.status(200).json({ blogs });
}

//tambah data blog
async function addBlog(req, res) {
  const { title, description, image, user } = req.body;

  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Can't find this user!" });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    // await blog.save();
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({
      session,
    });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
}

//update blog
async function updateBlog(req, res) {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(500).json({ message: "Unable to update this blog" });
  }
  return res.status(200).json({ blog });
}

//get blog by id
async function getBlogById(req, res) {
  const blogId = req.params.id;
  let blog;

  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(404).json({ message: "No blogs found!" });
  }
  return res.status(200).json({ blog });
}

//delete blog
async function deleteBlog(req, res) {
  const blogId = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndDelete(blogId).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    return console.log(err);
  }

  if (!blog) {
    return res.status(500).json({ message: "Fail to delete blog!" });
  }
  return res.status(200).json({ message: "Sucess to delete blog!" });
}

//get blog by user id
async function getByUserId(req, res) {
  const userId = req.params.id;
  let userBlog;
  try {
    userBlog = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlog) {
    return res.status(404).json({ message: "No blog found!" });
  }
  return res.status(200).json({ blogsById: userBlog });
}

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getByUserId,
};
