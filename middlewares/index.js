
const auth = (req,res,next) =>{
    if(req.headers['authorization'] === 'supersecret')
        return next()
    
    res
    .status(401)
    .json({"message":"Authentication failed"});
};

module.exports = auth