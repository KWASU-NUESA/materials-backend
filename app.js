const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const logEvents = require('./logEvents')
const EventEmmitter = require('events')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 300


app.use(express.static(__dirname + '/public'))
app.get('/docs', (req,res)=>{
    res.sendFile(path.join(__dirname,'views', 'documentation.html'))
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})

class MyEmmitter extends EventEmmitter{}

const myEmmitter = new MyEmmitter()

myEmmitter.on('log', (msg) => logEvents(msg))

process.on('uncaughtException', err =>{
    myEmmitter.emit('log', err)
})
//     
// },2000)