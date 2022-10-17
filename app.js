const path = require('path')
const {logger, errlogger} = require('./middleware/logEvents')
const express = require('express')
const jwtverify = require('./middleware/verifyJwt')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsoptions')
const credentials = require('./middleware/credentials')
const app = express()
const PORT = process.env.PORT || 300

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
app.use('/user', require('./routes/api/user'))
app.use('/auth', require('./routes/api/auth'))
app.use('/refresh', require('./routes/api/refresh'))
app.use('/logout', require('./routes/api/logout'))

app.use(jwtverify)
app.use('/api', require('./routes/api/staff'))

//404- unauthorized doesn't matter 😅
// app.all('*', (req,res)=>{
//     if(req.accepts('html')){
//         res.status(404).sendFile(path.join(__dirname, '..','views','404.html'))
//         }else if(req.accepts('json')){
//             res.json({'message': '404: ish wrong route fam!'})
//         }else{
//             res.type('txt').send('404 not found')
//         }
// })

//error logger
app.use(errlogger)


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})