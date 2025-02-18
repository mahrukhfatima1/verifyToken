const Post = require("../schema/postModel");

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, user: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
