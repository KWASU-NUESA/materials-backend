const usersDB = {
    users: require('../model/users.json'),
    setUser: function(data){
        this.users = data
    }
}
const jwt = require('jsonwebtoken')
require('dotenv').config()


const handlerefreshtoken = (req, res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
   const found = usersDB.users.find(person => person.refreshToken === refreshToken)
    
    if(!found) return res.sendStatus(403) //forbidden
    //evaluate password
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || found.username !== decoded.username) return res.sendStatus(400)
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
            res.json({accessToken})
        }
    )  
}
module.exports = handlerefreshtoken 