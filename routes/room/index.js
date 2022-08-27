const express = require('express')
const router = express.Router({mergeParams: true})
const authentication = require('../../middlewares')
const room = require('../../controllers/room')

// public routes
router.get('/', room.getAllRooms)
router.get('/:roomId', room.getRoomDetailInformation)

//private routes
router.use(authentication)

router.post('/', room.createRoom)
router.put('/:roomId', room.updateRoomInformation)
router.delete('/:roomId', room.deleteRoom)

module.exports = router