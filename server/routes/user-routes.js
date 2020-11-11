const UserController = require('../controller/User_Controller')
const router = require('express').Router()

// console.log('sebelum login routes');

router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

module.exports = router
