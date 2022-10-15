const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const {logger, errlogger} = require('./middleware/logEvents')
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsoptions')
const app = express()
const PORT = process.env.PORT || 300

//middleware
//my middlewares
app.use(logger)
app.use(cors(corsOptions)) 

//allow all static files in public
app.use(express.static(path.join(__dirname,'/public')))
//handle form data
app.use(express.urlencoded({extended: false}))
//json
app.use(express.json())





// routes
//API dir
app.use('/api', require('./routes/api/staff'))
app.use('/user', require('./routes/api/user'))
app.use('/auth', require('./routes/api/auth'))

// main dir - put last cos of 404
app.use('/', require('./routes/main'))


//error logger
app.use(errlogger)


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})