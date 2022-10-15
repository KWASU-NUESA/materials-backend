const path = require('path')

const showDocs = (req,res)=>{
    res.sendFile(path.join(__dirname,'..', 'views', 'documentation.html'))
}

const show404 = (req,res)=>{
    if(req.accepts('html')){
        res.status(404).sendFile(path.join(__dirname, '..','views','404.html'))
        }else if(req.accepts('json')){
            res.json({'message': '404: ish wrong route fam!'})
        }else{
            res.type('txt').send('404 not found')
        }
}

module.exports = {show404,showDocs}