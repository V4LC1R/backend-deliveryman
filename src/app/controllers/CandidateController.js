const Banned = require("../models/Banned")
const Candidate = require("../models/Candidate")
const Job = require('../models/Job')
const {Policys}= require('../services')
module.exports={
    async index(req,res){
        const candidates = await Candidate.findAll({where:{deliveryman_id:req.userId}})

        return res.json(candidates)

    },
    async show(req,res){
        const {number} = req.params

        const candidate = await Candidate.findOne({
            where:{
                number,
                deliveryman_id:req.userId,
            },
            include: [{
                model:Job,
                include:'Company'
            }]
        })

        return res.json(candidate)
    },
    async store(req,res){
        const {number,observation}=req.body

        await Policys.Candidate.forCreate(number,req.userId,res)

        const candidate = await Candidate.create({
            tender_id:tender.id,
            deliveryman_id:req.userId,
            type_candidate:1,
            number:'',
            observation
        })

        return res.json(candidate)
    },
    async update(req,res){
        
        const { number } = req.body

        await Policys.Candidate.forUpdate(number,req.userId,res)

        await Candidate.update(req.body,{where:{number}})

        return res.status(200).json({message:`The Update of the ${number} Candidate was a sucess`})

    },
    async destroy(req,res){

        const {number} = req.body

        await Policys.Candidate.forDelete(number,req.userId,res)

        await Candidate.destroy({where:{number}})

        return res.status(200).json({message:`The Delete of the ${number} Candidate was a sucess`})
    }
    
}