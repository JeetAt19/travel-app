const express = require('express')
const app = express()

//json() and urlencoded() are objects inside body-parser middleware
// body-parser comes with express package so no need to require and instanciate it
// we can directly access them using express.json() and express.urlencoded()
app.use(express.json())
app.use(express.urlencoded({extended: false})) //false means data will only strings


const logger = require('./utils/logger')
app.use((req,res,next) =>{
    req.logger = Object.freeze(logger); //freeze logger object and store it in req.logger object
    next();
})

const router = require('./routes')
app.use('/', router)

//error middleware
app.use((err,req,res,next)=>{
    res
    .status(500)
    .json({'message':'internal server error'})
})

const port = 3000
app.listen(port,(req,res) =>{
    console.log(`Travel application running on port :${port}`)
})
