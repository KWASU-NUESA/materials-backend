const Pdf = require('../model/pdf')
const Formidable = require('formidable')
const path = require('path')
const fsPromises = require('fs').promises
const checkFile = require('../middleware/checkFileType')

const createNewPDF = async (req, res) =>{
    const {courseCode, courseName, level, semester, department} = req.body
    if(!courseCode || !courseName || !level || !department || !semester) res.status(400).json({"message":"all fields required"})
    const result = await Pdf.create({
        courseCode,
        courseName,
        level,
        semester,
        department
    })
    res.json(result)
}




const updatePDF = async (req, res) => {
    const form =new Formidable.IncomingForm({multiples: true})
    const uploadFolder = path.join(__dirname, '..','public','pdfs')
    form.maxFileSize = 100 * 1024 * 1024 // 100 MB
    form.uploadDir = uploadFolder
    form.parse(req, async (err,fields,files)=>{
        if(err) return res.send({'message':'could not parse file'})
        
        const id = fields.id
        const category = fields.category
        const pdf = await Pdf.findOne({_id: id}).exec()
   
        //only one file at a time
        if(!files.files.length){
            const file = files.files
            const types = ['application/pdf']
            const valid = checkFile(file, types)
            if(!valid) return res.status(400).json({msg:"Invalid file type"})
            const filename = encodeURIComponent(file.originalFilename.replace(/&. *;/g, '-'))
                try{
                    fsPromises.rename(file.filepath, path.join(uploadFolder,filename))

                    if(category === 'questions') pdf.questions.push(filename)
                    else if(category === 'textbooks') pdf.textbooks.push(filename)
                    else return res.status(400).json({message:'category is required'})


                }catch(err){
                    return res.status(400).json({message:"for some reason this action failed"})
                }
        }else{
            //muliple
            for(i=0; i<files.files.length; i++){
                const file = files.files[i]
        const types = ['application/pdf']
        const valid = checkFile(file, types)
        if(!valid) return res.status(400).json({msg:`Invalid file type inlcuded`})
        const filename = encodeURIComponent(file.originalFilename.replace(/&. *;/g, '-'))
            try{
                fsPromises.rename(file.filepath, path.join(uploadFolder,filename))

                if(category === 'questions') pdf.questions.push(filename)
                    else if(category === 'textbooks') pdf.textbooks.push(filename)
                    else return res.status(400).json({message:'category is required'})


            }catch(err){
                res.status(400).json({message:"for some reason this action failed"})
            }
            }
        }
        const result = await pdf.save()
        return res.status(200).json(result)
    })
}


const deleteOneFile = async(req, res) =>{
    const index = req.params.index
    const id = req.params.id
    const category = req.params.category

    if(!index || !id || !category) return res.status(400).json({msg: "file index not found"})
    const pdf = await Pdf.findOne({_id: id}).exec()
    if(category === 'textbooks'){ 
        const pdfpath = pdf.textbooks[index]
        fsPromises.unlink(pdfpath)
        pdf.textbooks.splice(index, 1)
    }
    else if(category === 'questions') {
        const pdfpath = pdf.questions[index]
        fsPromises.unlink(pdfpath)
        pdf.questions.splice(index, 1)
    }else{
        return res.status(400).json({message:"recheck category please"})
    }
    
    const result = await pdf.save()
    try{
        res.status(201).json(result)
    }catch(err){
        console.log(err)
    }
}




const deletePDF = async (req,res) =>{
    if(!req.body.id){
        return res.send(400).json({"message":" sorry id is required"})
    }
    const pdf = await Pdf.findOne({_id: req.body.id}).exec()
    if(!pdf){
        return res.status(204).json({"message": `No pdf matches ${req.body.id}`})
    }
   const result = await Pdf.deleteOne({_id: req.body.id})
    return res.json(result)
}

const getAllPdf = async(req,res)=>{
    const pdf = await Pdf.find()
    if(!pdf) return res.status(204).json({'message':'No pdff found'})
    return res.json(pdf)
}



module.exports = {createNewPDF, updatePDF, deletePDF, getAllPdf, deleteOneFile}
