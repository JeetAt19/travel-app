let hotels = {}
const { v4: uuidv4 } = require('uuid');

const listAllHotels = (req, res) => {
    try {
        req.logger.debug('Fetching all hotel Information')
        const lstAllHotels = Object.values(hotels)
        res
        .status(200)
        .json({
            data: lstAllHotels
        })
    } catch (err) {
        req.logger.error("Error fetching Hotels info",err)
        throw err;
    }
}

const getHotelDetailInformation = (req, res) => {
    try {

        const hotelId = req.params.hotelId;
        req.logger.debug("Fetching Detail information about Hotel for id",hotelId)
        const hotelInfo = hotels[hotelId];
        res
        .status(200)
        .json({
            data: hotelInfo
        })
    } catch (err) {
        req.logger.error("Error fetching detais",error);
        throw err;
    }
}

const createHotelInformation = (req, res) => {
   try{
    const hotelId = uuidv4();
    const hotelObj = {
        id: hotelId,
        name: req.body.name,
        description: req.body.description,
        amenities: req.body.amenities,
        is_published: false,
        guest_capacity: req.body.guest_capacity
    }
    req.logger.debug('creating hotel info', hotelObj)
    hotels[hotelId] = hotelObj;
    req.logger.debug('hotel created successfully')
    res
    .status(200)
    .json({
        data: hotelObj
    })
   } 
   catch (err) {
    req.logger.error('Error creating hotel info',err);
    throw err;
   }
}

const updateHotelInformation = (req, res) => {
    try {
        const hotelId = req.params.hotelId
        const hotelInfo = hotels[hotelId]
        const hotelObj = {
            name: req.body.name,
            description: req.body.description,
            amenities: req.body.amenities,
            guest_capacity: req.body.guest_capacity
        }
        req.logger.debug("Updating hotel with info",hotelObj)
        hotels[hotelId] = {
            ...hotelInfo,
            ...hotelObj
        }
        //update common properties with new values
        // and merge the remaining non-common properties
        //then assign all these to the hotels[] obj 
        req.logger.debug("Hotel Information Update success")
        res
        .status(200)
        .json({
            data: {...hotelInfo,...hotelObj}
        })

    } 
    catch (err) {
        req.logger.error(`Error Updating Hotel information with id ${hotelId}`,err);
        throw err;
    }
}

const publishHotelInformation = (req, res) => {
    try {
        const hotelId = req.params.hotelId
        const hotelInfo = hotels[hotelId]
        
        req.logger.debug("Publishing hotel info for id",hotelId)
        hotels[hotelId] = {
            ...hotelInfo,
            is_published: true
        }

        req.logger.debug("Publish Sucess")
        res.status(200).send()

    } catch (err) {
        req.logger.debug("Error publishing hotel Info with id :", hotelId)
        throw err;
    }
}

const removeHotelInformation = (req, res) => {
    try {
        const hotelId = req.params.hotelId
        req.logger.debug("Deleting Informatin of Hotel with id",hotelId)
        delete hotels[hotelId]
        req.logger.debug("Delete Successful")
        res.status(200).send();
    } catch (err) {
        req.logger.debug(`Erroor deleting hotel info with id ${hotelId}`)
        throw err
    }
}

const internalHelperFunc = (req, res) => {
    res.json({
        message: 'Sensitive info'
    })
}

module.exports = {
    listAllHotels,
    getHotelDetailInformation,
    createHotelInformation,
    updateHotelInformation,
    publishHotelInformation,
    removeHotelInformation
};
