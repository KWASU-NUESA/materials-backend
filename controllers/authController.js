const usersDB = {
    users: require('../model/users.json'),
    setUser: function(data){
        this.users = data
    }
}
const bcrypt = require('bcrypt')

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
    if(!found) return res.sendStatus(401) //
    //evaluate password
    match = await bcrypt.compare(password, found.password)
    if(match){
        //create jwt
        res.json({'success':`user ${user} is logged in`})
    }else{
        res.sendStatus(401)
    }

}

module.exports = handlelogin