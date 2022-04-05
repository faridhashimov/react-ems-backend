const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// REGISTER NEW USER
const registerUser = async (req, res) => {
    const newUser = new User({
        user: req.body.user,
        pwd: CryptoJS.AES.encrypt(req.body.pwd, process.env.PWD_KEY).toString(),
    })

    const userExists = await User.findOne({
        user: req.body.user,
    })
    userExists && res.status(400).json('User already exists')

    try {
        const savedUser = await newUser.save()
        return res.status(201).json(savedUser)
    } catch (err) {
        return res.status(500).json(err)
    }
}

//GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
}

//DELETE USER
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json(`User ${user.user} has been deleted`)
    } catch (err) {
        res.status(500).json(err)
    }
}

// LOGIN
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            user: req.body.user,
        })

        if (!user) return res.status(401).json('Wrong User Name')

        const hashedPassword = CryptoJS.AES.decrypt(
            user.pwd,
            process.env.PWD_KEY
        )

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        const inputPassword = req.body.pwd

        if (originalPassword !== inputPassword)
            return res.status(401).json('Wrong password')

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.ACS_TOKEN,
            {
                expiresIn: '3d',
            }
        )

        const { pwd, ...others } = user._doc
        res.status(200).json({ ...others, accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { registerUser, loginUser, getAllUsers, deleteUser }
