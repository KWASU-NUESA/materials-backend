const User = require('../model/user')
const bcrypt = require('bcrypt')

const handleNewUser = async(req, res) =>{
    const {user, password, email, matric} = req.body
    if(!user || !password) return res.status(400).json({'message':'Username or password are required'})
    //check for duplicate username in the db
    const duplicate = await User.findOne({username: user}).exec()
    if(duplicate) return res.sendStatus(409) //conflict
    try{
        //encrypt password
        const hashpass = await bcrypt.hash(password, 10)
        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashpass,
            "email": email,
            "matric": matric
        })

        res.status(201).json(result)
    }catch(err){
        res.status(500).json({'message':err.message})
    }
}


module.exports = handleNewUser