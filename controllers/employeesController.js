const Employee = require('../models/Employee')

// @desc   Get all employees
// @route   GET api/employees
// @access   Private
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
        res.status(200).json(employees)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

// @desc   Update employee
// @route   PUT api/employees/:id
// @access   Private
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        )
        res.status(200).json(employee)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

// @desc   Delete employee
// @route   DELETE api/employees/:id
// @access   Private
const deleteEmployee = async (req, res) => {
    try {
       await Employee.findByIdAndDelete(req.params.id)
       res.status(200).json('Employee deleted')
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

// @desc   Add employees
// @route   POST api/employees
// @access   Private

const addEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body)
    try {
        const savedEmployee = await newEmployee.save()
        res.status(200).json(savedEmployee)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports = { getAllEmployees, addEmployee, updateEmployee, deleteEmployee }
