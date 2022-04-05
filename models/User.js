const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        user: { type: String, required: true, unique: true },
        pwd: { type: String, required: true },
        isAdmin: { type: String, default: false },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)