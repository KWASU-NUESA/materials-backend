const Staff = require('../model/Staff')
const getAllStaff = async(req,res)=>{
    const staff = await Staff.find()
    if(!staff) return res.status(204).json({'message':'No staff found'})
    res.json(staff)
}


//create new staff
const createNewStaff = async(req,res)=>{
    if(!req?.body?.firstname || !req?.body?.lastname || !req?.body?.position || !req?.body?.department || !req?.body?.description || !req?.body?.picture){
        return res.status(400).json({})
    }
    try{
        const result = await Staff.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            department: req.body.department,
            description: req.body.description,
            position: req.body.position,
            picture: req.body.picture
        })
        res.status(201).json(result)
    }catch(err){
            console.log(err)
        }
   
}



//update staff
const updateStaff = async (req, res)=>{
    if(!req?.body?.id){
        return res.status(400).json({'message': "ID required"})
    }
    const staff = await Staff.findOne({_id: req.body.id}).exec()
    if(!staff){
    return res.status(204).json({"message": `No staff matches ${req.body.id}`})
   }
   if(req.body?.firstname) staff.firstname = req.body.firstname
   if(req.body?.lastname) staff.lastname = req.body.lastname
   if(req.body?.position) staff.position = req.body.position
   if(req.body?.department) staff.department = req.body.department
   if(req.body?.description) staff.description = req.body.description
   if(req.body?.picture) staff.picture = req.body.picture

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