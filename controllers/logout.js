const usersDB = {
    users: require('../model/users.json'),
    setUser: function(data){
        this.users = data
    }
}
const fsPromises = require('fs').promises
const path = require('path')



const handlelogout = async(req, res)=>{
    //on client also delete the accessToken

    const cookies = req.cookies
    if(!cookies?.jwt) res.sendStatus(204) //No content
    const refreshToken = cookies.jwt
    //is refresh token in db
    const found = usersDB.users.find(person => person.refreshToken === refreshToken)
    
    if(!found){
        console.log('not found')
        res.clearCookie('jwt', {httpOnly: true})
        res.sendStatus(204) //No Content
    } 
    
    //Delete 
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== found.refreshToken)
    const currentUser = {...found, refreshToken: ''}
    usersDB.setUser([...otherUsers, currentUser])
    await fsPromises.writeFile(path.join(__dirname, '..', 'model','users.js'), JSON.stringify(usersDB.users))
    res.clearCookie('jwt', {httpOnly: true})
    res.sendStatus(204)
}
module.exports = handlelogout 