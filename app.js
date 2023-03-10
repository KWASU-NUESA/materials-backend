const path = require('path')
const {logger, errlogger} = require('./middleware/logEvents')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsoptions')
const credentials = require('./middleware/credentials')
const app = express()
const mongoose = require('mongoose')
const connectDb  =require('./config/dbCon')
const routeprotect = require('./middleware/normsprotect')
const PORT = process.env.PORT || 300


//connect to mongoDB
connectDb();
//middleware
//my middlewares
app.use(logger)
app.use(credentials)
app.use(cors(corsOptions)) 


//handle form data
app.use(express.urlencoded({extended: false}))
//json
app.use(express.json())
//cookies
app.use(cookieParser()) 


//allow all static files in public
app.use(express.static('public'))
app.use('/public',express.static(path.join(__dirname, 'public')))




// routes
//API dir
app.use(routeprotect)

app.use('/pdf', require('./routes/api/pdf'))


//error logger
app.use(errlogger)

mongoose.connection.once('open', ()=>{
    console.log('connected to MongoDB')
    app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))
})