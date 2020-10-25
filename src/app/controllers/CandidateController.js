const Banned = require("../models/Banned")
const Candidate = require("../models/Candidate")
const Job = require('../models/Job')
const {Policys}= require('../services')

const AcessControl = require('accesscontrol');

const difines = require('../secure/index');
const Role = require("../models/Role");

const concierge = new AcessControl(difines);


module.exports={
    async index(req,res){
        const candidates = await Candidate.findAll({where:{deliveryman_id:req.userId}})

        const user = await Role.findOne({where:{user_id:req.userId}})

        const permission = concierge.can(user.role).readOwn('job')

        let only =[]

        candidates.map(candidate=>{
          only.push(permission.filter(candidate))
        })

        return res.json(only)

    },
    async show(req,res){
        const {number} = req.params

        const user = await Role.findOne({where:{user_id:req.userId}})

        const permission = concierge.can(user.role).readOwn('job')


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



        return res.json(permission.filter(candidate))
    },
    async store(req,res){
        const {number,observation,must}=req.body

        console.log(req.body)

       await Policys.Candidate.forCreate(number,req.userId,res)

       const job = await Job.findOne({where:{number}})

        const candidate = await Candidate.create({
            job_id:job.id,
            deliveryman_id:req.userId,
            candidate_type:1,
            number:'',
            amount,
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