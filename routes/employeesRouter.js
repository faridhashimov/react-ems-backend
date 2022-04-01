const express = require('express')
const router = express.Router()
const {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employeesController')

router.route('/').get(getAllEmployees).post(addEmployee)
router.route('/:id').put(updateEmployee).delete(deleteEmployee)

module.exports = router
