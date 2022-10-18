const Staff = require('../model/Staff')
const express = require('express')
const app = express()
const Formidable = require('formidable')
const path = require('path')
const fsPromises = require('fs').promises
const getAllStaff = async(req,res)=>{
    const staff = await Staff.find()
    if(!staff) return res.status(204).json({'message':'No staff found'})
    res.json(staff)
}


const checkFileType = (file) =>{
    const type = file.mimetype
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
    console.log(validTypes.indexOf(type), type)
    if(validTypes.indexOf(type) !== -1){
        return true
    }
}
//create new staff
const createNewStaff = async(req,res)=>{
    // if(!req.body.firstname || !req.body.lastname || !req.body.position || !req.body.department || !req.body.description){
    //     console.log(req.fields)
    //     return res.status(400).json({msg:"ko lo"})

    // }
    const form =new Formidable.IncomingForm()
    const uploadsFolder = path.join(__dirname, '..', 'uploads')
    form.maxFileSize = 5 * 1024 * 1024
    form.uploadDir = uploadsFolder
    form.parse(req, async(err, fields, files)=>{
        if(err) return res.json({ok:false, msg:"Error parsing the files"})
        const file = files.files
        const typeisvalid = checkFileType(file)
        if(!typeisvalid){
            console.log("file type is invalid")
        }
        const filename = encodeURIComponent(file.originalFilename.replace(/&. *;/g, '-'))
        try{
            fsPromises.rename(file.filepath, path.join(uploadsFolder, filename))
            const filepath = path.join(__dirname, '..', 'uploads', filename)
            const result = await Staff.create({
                firstname: fields.firstname,
                lastname: fields.lastname,
                department: fields.department,
                description: fields.description,
                position: fields.position,
                picture: filepath
            })
            res.status(201).json(result)
        }catch(err){
                console.log(err)
            }
    }) 
}



//update staff
const updateStaff = async (req, res)=>{
    if(!req.body.id){
        return res.status(400).json({'message': "ID required"})
    }
    const staff = await Staff.findOne({_id: req.body.id}).exec()
    if(!staff){
    return res.status(204).json({"message": `No staff matches ${req.body.id}`})
   }
   if(req.body.firstname) staff.firstname = req.body.firstname
   if(req.body.lastname) staff.lastname = req.body.lastname
   if(req.bod.position) staff.position = req.body.position
   if(req.body.department) staff.department = req.body.department
   if(req.body.description) staff.description = req.body.description
   if(req.body.picture) staff.picture = req.body.picture

   const result = await staff.save()
   res.json(result)
}


//delete staff
const deleteStaff =  async(req, res)=>{
    if(!req?.body?.id){
        return res.status(400).json({'message': "staff ID required"})
    }
    const staff = await Staff.findOne({_id: req.body.id}).exec()
    if(!staff){
        return res.status(204).json({"message": `No staff matches ${req.body.id}`})
    }
   const result = await staff.deleteOne({_id: req.body.id})
    res.json(result)
}


//get single staff
const getSingleStaff = async (req, res)=>{
    if(!req?.params?.id) return res.status(400).json({'message':'staff id required'})
    const staff =await Staff.findOne({_id: req.params.id})
    if(!staff){
        res.status(204).json({'message':`Not found: staff with ${req.params.id} doesn't exist`})
    }
    res.json(staff)
}

module.exports = {deleteStaff, updateStaff, createNewStaff, getAllStaff, getSingleStaff}