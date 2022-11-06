const Faq = require('../model/faq')

const NewFaq = async (req, res) => {
    const question = req.body.question
    const answer = req.body.answer
    if(!question || !answer) return res.json({error:"question and reply required"})
    const result = await Faq.create({
        question,
        answer
    })
    res.json(result)
}

const deleteFaq = async (req, res) =>{
    const id = req.params.id
    if(!id) return res.json({error: "Id is required"})
    const faq = await Faq.findOne({_id: id})
    if(!faq) return res.json({error: "faq doesn't exist"})
    const result = await Faq.deleteOne({_id: id})
    return res.json(result)
}

const getAllFaq = async (req, res) => {
    const faq = await Faq.find()
    if(!faq) return res.json({error: "no Faq data yet"})
    return res.json(faq)
}

module.exports = {getAllFaq, deleteFaq, NewFaq}