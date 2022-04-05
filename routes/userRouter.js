const router = require('express').Router()

const { registerUser, loginUser, getAllUsers, deleteUser } = require('../controllers/userController')
const { verifyToken } = require('../middlewares/verifyToken')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/users', getAllUsers)
router.delete('/user/delete/:id', verifyToken, deleteUser)

module.exports = router
