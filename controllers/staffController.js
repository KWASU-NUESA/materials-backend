const Staff = require('../model/Staff')
const checkFileType = require('../middleware/checkFileType')
const Formidable = require('formidable')
const path = require('path')
const fsPromises = require('fs').promises
const getAllStaff = async(req,res)=>{
    const staff = await Staff.find()
    if(!staff) return res.status(204).json({'message':'No staff found'})
    res.json(staff)
}



//create new staff
const createNewStaff = async(req,res)=>{
    const form =new Formidable.IncomingForm()
    const uploadsFolder = path.join(__dirname, '..', 'uploads')
    form.maxFileSize = 5 * 1024 * 1024
    form.uploadDir = uploadsFolder
    form.parse(req, async(err, fields, files)=>{
        if(err) return res.json({ok:false, message:"Error parsing the files"})
        const file = files.files
        const types = ['image/png', 'image/jpeg', 'image/jpg']
        const typeisvalid = checkFileType(file, types)
        if(!typeisvalid){
            return res.status(400).json({error:`Invalid file type, Images only!`})
        }
        const filename =file.originalFilename
        try{
            fsPromises.rename(file.filepath, path.join(uploadsFolder, filename))    
            const result = await Staff.create({
                firstname: fields.firstname,
                lastname: fields.lastname,
                department: fields.department,
                category: fields.category,
                position: fields.position,
                picture: filename
            })
            return res.status(201).json(result)
        }catch(err){
                return res.status(400).json({error:err.message})
            }
    }) 
}



//update staff
const updateStaff = async (req, res)=>{

    const form =new Formidable.IncomingForm()
    const uploadsFolder = path.join(__dirname, '..', 'uploads')
    form.maxFileSize = 5 * 1024 * 1024
    form.uploadDir = uploadsFolder
    form.parse(req, async(err, fields, files)=>{
        if(err) return res.json({ok:false, message:"Error parsing the files"})
        const staff = await Staff.findOne({_id: fields.id}).exec()
        if(files?.files){
        const file = files.files
        const types = ['image/png', 'image/jpeg', 'image/jpg']
        const typeisvalid = checkFileType(file, types)
        if(!typeisvalid){
            return res.status(400).json({error:`Invalid file type, Images only!`})
        }
        const filename = encodeURIComponent(file.originalFilename.replace(/&. *;/g, '-'))
        try{
            fsPromises.rename(file.filepath, path.join(uploadsFolder, filename))
            
            if(!staff){
            return res.status(204).json({"message": `No staff matches ${req.body.id}`})
            }
            await fsPromises.unlink(staff.picture)
            staff.picture = filename
        }catch(err){
                return res.status(400).json({error:err.message})
            }
        }
        if(fields.firstname) staff.firstname = fields.firstname
        if(fields.lastname) staff.lastname = fields.lastname
        if(fields.position) staff.position = fields.position
        if(fields.department) staff.department = fields.department
        if(fields.category) staff.category = fields.category

        await staff.save()
        return res.status(201).json({staff})
    })
}


//delete staff
const deleteStaff =  async(req, res)=>{
    if(!req.body.id){
        return res.status(400).json({'message': "staff ID required"})
    }
    const staff = await Staff.findOne({_id: req.body.id}).exec()
    if(!staff){
        return res.status(204).json({message: `No staff matches ${req.body.id}`})
    }
   await staff.deleteOne({_id: req.body.id})
    res.json({message:"deleted record"})
}


//get single staff
const getSingleStaff = async (req, res)=>{
    if(!req.params.id) return res.status(400).json({'message':'staff id required'})
    const staff =await Staff.findOne({_id: req.params.id})
    if(!staff){
        res.status(204).json({'message':`Not found: staff with ${req.params.id} doesn't exist`})
    }
    res.json({staff})
}

module.exports = {deleteStaff, updateStaff, createNewStaff, getAllStaff, getSingleStaff}