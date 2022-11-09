const users = require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const handlerefreshtoken = async (req, res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
   const found = await users.findOne({refreshToken}).exec()
    
    if(!found) {
        console.log('no token')
        return res.sendStatus(403)} //forbidden
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || found.username !== decoded.username) return res.sendStatus(403)
            const roles = Object.values(found.roles)
            const accessToken = jwt.sign(
                {"UserInfo": {"username": decoded.username, roles}},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            res.json({accessToken, roles})
        }
    )  
}
module.exports = handlerefreshtoken 