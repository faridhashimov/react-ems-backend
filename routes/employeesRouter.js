const express = require('express')
const router = express.Router()
const {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
} = require('../controllers/employeesController')

router.route('/').get(getAllEmployees).post(addEmployee)
router.route('/:id').get(getEmployee).put(updateEmployee).delete(deleteEmployee)

module.exports = router
