const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async(messages, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem =  `${dateTime}\t${uuid()}\t${messages}\n`
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..', 'logs'), err => console.log(err))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs', logName), logItem)
    }catch(err){
        console.log(err)
    }
}
const logger = (req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    next()
}
const errlogger =
    (err, req, res, next)=>{
        res.status(500).send(err.message)
        logEvents(`${err.name}: ${err.message}`,'errLog.txt')  
}

module.exports = {logger, errlogger}