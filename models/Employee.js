const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: [true, 'Please add a full name'] },
        img: { type: String, required: true },
        position: { type: String, required: [true, 'Please add a position'] },
        birthdate: {
            type: Date,
            default: Date.now,
            required: [true, 'Please add a date of birth'],
        },
        gender: { type: String, required: [true, 'Please add a gender'] },
        department: {
            type: String,
            required: [true, 'Please add a department'],
        },
        salary: { type: Number, required: [true, 'Please add a salary'] },
        phone: {
            type: Number,
            required: [true, 'Please add a phone number'],
            unique: true,
        },
        adress: { type: String, required: [true, 'Please add an adress'] },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        skills: { type: Array },
        experience: [
            {
                title: { type: String },
                desc: { type: String },
            },
        ],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Employee', EmployeeSchema)
