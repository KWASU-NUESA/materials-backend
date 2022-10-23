const checkFileType = (file, types) =>{
    const type = file.mimetype
    const validTypes = types
    if(validTypes.indexOf(type) !== -1){
        return true
    }
}

module.exports = checkFileType