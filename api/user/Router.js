const express = require('express')
const router = express.Router()
const { login, signUP } = require('./Controller')

router.post('/signup', signUP)

router.post('/login', login)

module.exports = router