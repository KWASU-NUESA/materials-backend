const usersDB = {
    users: require('../model/users.json'),
    setUser: function(data){
        this.users = data
    }
}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')


const handlelogin = async(req, res)=>{
    const {user, password} = req.body
    if(!user || !password) res.status(400).json({'message':'username and password required'})
    //this was where I checked whether it was email or username
    const emailregex = /^\w+[@]\w{5}[.]\w{3}$/ig
    const testtype = emailregex.test(user)
    let found;
    if(testtype) {
        found = usersDB.users.find(person => person.email === user)
    }else{
        found = usersDB.users.find(person => person.username === user)
    }
    if(!found) res.sendStatus(401) //
    //evaluate password
    match = await bcrypt.compare(password, found.password)
    if(match){
        //create jwt
        const accessToken = jwt.sign(
            {"username": found.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        )
        const refreshToken = jwt.sign(
            {"username": found.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        const otherUsers = usersDB.users.filter(person => person.username !== found.username)
        const currentUser = {...found, refreshToken}
        usersDB.setUser([...otherUsers, currentUser])
        await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'), JSON.stringify(usersDB.users))
        res.cookie('jwt', refreshToken, {httpOnly:true,sameSite:'None',secure: true, maxAge: 24*60*60*1000})
        res.json({accessToken})
    }else{
        res.sendStatus(401)
    }
}

module.exports = handlelogin 