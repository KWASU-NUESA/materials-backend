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
app.use(express.static(path.join(__dirname,'/public')))




// routes
// main dir - put last cos of 404
app.use('/', require('./routes/main'))

//API dir
// app.use(routeprotect)
app.use('/register', require('./routes/api/user'))
app.use('/auth', require('./routes/api/auth'))
app.use('/refresh', require('./routes/api/refresh'))
app.use('/logout', require('./routes/api/logout'))

// app.use(jwtverify)
app.use('/staff', require('./routes/api/staff'))


//error logger
app.use(errlogger)

mongoose.connection.once('open', ()=>{
    console.log('connected to MongoDB')
    app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))
})