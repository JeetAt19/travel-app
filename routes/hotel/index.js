const express = require('express')
const router = express.Router()
const authentication = require('../../middlewares')
const hotel = require('../../controllers/hotel')

///pubic endpoints
router.get('/', hotel.listAllHotels)
router.get('/:hotelId', hotel.getHotelDetailInformation);

///private endpoints that require authentication checks
router.use(authentication)

router.post('/', hotel.createHotelInformation);
router.put('/:hotelId', hotel.updateHotelInformation);
router.patch('/:hotelId', hotel.publishHotelInformation);
router.delete('/:hotelId', hotel.removeHotelInformation);

module.exports = router