const {
    sign
} = require("jsonwebtoken")
const Users = require('../models/users');

exports.login = async (req, res) => {
    const data = req.body;
    const result = await Users.getUsers()
    const user = result.find(item => {
        return item.email == data.email
    });

    if (user && data.password === user.password) {
        const jsontoken = sign({
            result: {
                email: user.email,
                name: user.name,
                surname: user.surname
            }
        }, process.env.JWT_KEY, {
            expiresIn: "120h"
        })
        res.json({
            success: 1,
            message: "Login successfully",
            token: jsontoken,
            user: user
        })
    } else {
        res.json({
            success: 0,
            message: "Invalid username or password"
        })
    }
};

exports.getUsers = async (req, res) => {
    let result = await Users.getUsers()
    res.json(result)
};

exports.getUserById = async (req, res) => {
    const users = await Users.getUsers();
    const result = users.find(item => item.id === req.params.id)
    res.json(result)
};

exports.createUser = async (req, res) => {
    const insertedId = await Users.createUser(req.body)
    const users = await Users.getUsers()
    const user = users.find(item => item.id == insertedId[0]);
    const jsontoken = sign({
        result: {
            ...user
        }
    }, process.env.JWT_KEY, {
        expiresIn: "120h"
    })
    res.json({
        success: 1,
        message: "Login successfully",
        token: jsontoken,
        user: user
    })
};

exports.updateUser = async (req, res) => {
    await Users.updateUser(req.body)
    const users = await Users.getUsers();
    const result = users.find(item => item.id === req.body.id);
    res.json(result)
};

exports.deleteUser = async (req, res) => {
    const result = await Users.deleteUser(req.params.id)
    res.json(result)
};