const users = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const handlelogin = async(req, res)=>{
    const {user, password} = req.body
    if(!user || !password) res.status(400).json({'message':'username and password required'})
    //this was where I checked whether it was email or username
    const emailregex = /^\w+[@]\w{5}[.]\w{3}$/ig
    const testtype = emailregex.test(user)
    let found;
    if(testtype) {
        found = await users.findOne({email: user}).exec()
    }else{
        found = await users.findOne({username: user}).exec()
    }
    if(!found) return res.sendStatus(401) 
    //evaluate password
    match = await bcrypt.compare(password, found.password)
    if(match){
        const roles = Object.values(found.roles)
        //create jwt
        const accessToken = jwt.sign(
            {"UserInfo":{"username": found.username}, "roles":roles},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        )
        const refreshToken = jwt.sign(
            {"username": found.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
       
        //saving refreshToken with currrent user
        found.refreshToken = refreshToken
        await found.save()

        res.cookie('jwt', refreshToken, {httpOnly:true,sameSite:'None', secure: true, maxAge: 24*60*60*1000})
        res.json({accessToken, roles})
    }else{
        res.sendStatus(401)
    }
}

module.exports = handlelogin 