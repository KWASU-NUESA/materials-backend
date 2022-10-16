const path = require('path')

const showDocs = (req,res)=>{
    res.sendFile(path.join(__dirname,'..', 'views', 'documentation.html'))
}


module.exports = showDocs