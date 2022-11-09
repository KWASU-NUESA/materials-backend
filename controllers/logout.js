const users = require('../model/user')


const handlelogout = async(req, res)=>{
    //on client also delete the accessToken

    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204) //No content
    const refreshToken = cookies.jwt

    //is refresh token in db
    const found = await users.findOne({refreshToken}).exec()
    
    if(!found){
        res.clearCookie('jwt', {httpOnly: true})
        return res.sendStatus(204) //No Content
    } 
    
    //Delete 
    found.refreshToken = ''
    await found.save()
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
    res.sendStatus(204)
}
module.exports = handlelogout 