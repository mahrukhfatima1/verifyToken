const Comment = require("../schema/commentModel");

exports.createComment = async (req, res) => {
    try {
        const comment = new Comment({ ...req.body, user: req.user.id });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
