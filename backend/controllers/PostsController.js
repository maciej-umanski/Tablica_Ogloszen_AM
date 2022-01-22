const Posts = require('../models/posts');

exports.getPosts = async (req, res) => {
    const result = await Posts.getPosts()
    res.json(result)
};

exports.getPostById = async (req, res) => {
    const posts = await Posts.getPosts();
    const result = posts.find(item => item.id === req.params.id)
    res.json(result)
};

exports.createPost = async (req, res) => {
    const insertedId = await Posts.createPost(req.body)
    const posts = await Posts.getPosts();
    const result = posts.find(item => item.id === insertedId[0]);
    res.json(result)
};

exports.updatePost = async (req, res) => {
    await Posts.updatePost(req.body)
    const posts = await Posts.getPosts();
    const result = posts.find(item => item.id === req.body.id);
    res.json(result)
};

exports.deletePost = async (req, res) => {
    const result = await Posts.deletePost(req.params.id)
    res.json(result)
};

exports.addPhoto = async (req, res) => {
    try {
        res.send({
            filename: req.file.filename
        });
    } catch (error) {
        res.status(500).send("Error");
    }
};