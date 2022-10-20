const checkFileType = (file, types) =>{
    const type = file.mimetype
    const validTypes = types
    console.log(validTypes.indexOf(type), type)
    if(validTypes.indexOf(type) !== -1){
        return true
    }
}

module.exports = checkFileType