require('dotenv').config()

const checkaccess = (req, res, next) => {
    const token = req.headers.token
    if(token !== process.env.NORMAL_TOKEN_SECRET) return res.sendStatus(401)
    next()
}

module.exports = checkaccess