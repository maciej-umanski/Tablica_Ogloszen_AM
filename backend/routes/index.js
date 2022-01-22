const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/PostsController');
const UserController = require('../controllers/UserController')
const {
    checkToken
} = require('../middlewares/auth')
const errorHandler = require('../middlewares/errors')
const multer = require("multer");

router.get("/", (req, res) => {
    res.send("App running");
});

router.post('/login', errorHandler.catchAsync(UserController.login));

router.post('/sign_up', errorHandler.catchAsync(UserController.createUser))

router.get('/users',
    errorHandler.catchAsync(UserController.getUsers)
)

router.get('/users/:id',
    checkToken,
    errorHandler.catchAsync(UserController.getUserById)
)

router.put('/users',
    checkToken,
    errorHandler.catchAsync(UserController.updateUser)
)

router.delete('/users/:id',
    checkToken,
    errorHandler.catchAsync(UserController.deleteUser)
)


router.get('/posts',
    checkToken,
    errorHandler.catchAsync(PostsController.getPosts)
)

router.get('/posts/:id',
    checkToken,
    errorHandler.catchAsync(PostsController.getPostById)
)

router.post('/posts',
    checkToken,
    errorHandler.catchAsync(PostsController.createPost)
)

router.put('/posts',
    checkToken,
    errorHandler.catchAsync(PostsController.updatePost)
)

router.delete('/posts/:id',
    checkToken,
    errorHandler.catchAsync(PostsController.deletePost)
)

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const diskStorage = multer({
    storage: storage
});

router.post('/upload',
    diskStorage.single('photo'),
    errorHandler.catchAsync(PostsController.addPhoto)
);

module.exports = router;