const express = require('express')
const router = express.Router()

//user
const user = require('./user')
router.use('/', user)

//hotel
const hotel = require('./hotel')
router.use('/hotel', hotel)

//room
const room = require('./room')
router.use('/hotel/:hotelId/room', room)


module.exports = router