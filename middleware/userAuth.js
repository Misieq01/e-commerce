const User = require('../models/users')
const jwt = require('jsonwebtoken')

const auth = async (req,res,next) =>{
    try {
        const token = req.headers("UserAuthorization").replace("Bearer ", "")
        const decode = jwt.verify(token,'venividivici');
        const user = await User.findOne({_id: decode._id,"tokens.token":token})

        if(!user){
            throw { message: "User doesn't exist"}
        }

        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({message: "Please authenticate"})
        
    }
}

module.exports = auth