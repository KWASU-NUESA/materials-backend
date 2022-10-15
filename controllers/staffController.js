const data = {
    staff: require('../model/employees.json'),
    setStaff: function (data){this.staff = data}}

const getAllStaff = (req,res)=>{
    res.json(data.staff)
}


//create new staff
const createNewStaff = (req,res)=>{
    const newStaff = {
        id: data.staff[data.staff.length - 1].id+1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        description: req.body.description
    }
    if(!newStaff.firstname || !newStaff.lastname){
        return res.status(400).json({'message':'Awa o rin kan kan oo, First and lastname required'})
    }
    data.setStaff([...data.staff, newStaff])
    res.json(data.staff)
}



//update staff
const updateStaff = (req, res)=>{
   const staff = data.staff.find(sta => sta.id === parseInt(req.body.id))
   if(!staff){
    return res.status(400).json({"message": `Employee ID ${req.body.id} not found`})
   }
   if(req.body.firstname) staff.firstname = req.body.firstname
   if(req.body.lastname) staff.lastname = req.body.lastname
   if(req.body.role) staff.role = req.body.role
   if(req.body.desc) staff.desc = req.body.desc
   const filteredArray = data.staff.filter(sta => sta.id !== parseInt(req.body.id))
   const unsortedArray = [...filteredArray, staff]
   data.setStaff(unsortedArray.sort((a,b)=> a.id>b.id? 1 : a.id < b.id ? -1 : 0))
   res.json(data.staff)
}


//delete staff
const deleteStaff = (req, res)=>{ //delete all ??
    const staff = data.staff.find(sta => sta.id === req.body.id)
    if(!staff){
        return res.status(400).json({'message':`user with id ${req.body.id} not found`})
    }
    const filteredArray = data.staff.filter(sta => sta.id !== parse(req.body.id))
    data.setStaff(...filteredArray)
    res.json(data.staff)
}


//get single staff
const getSingleStaff = (req, res)=>{
    const staff = data.staff.find(sta => sta.id === parseInt(req.params.id))
    if(!staff){
        res.status(400).json({'message':`Employee with ${req.params.id} doesn't exist`})
    }
    res.json(staff)
}

module.exports = {deleteStaff, updateStaff, createNewStaff, getAllStaff, getSingleStaff}