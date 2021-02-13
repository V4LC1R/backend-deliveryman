const Banned = require("../models/Banned")
const Candidate = require("../models/Candidate")
const Job = require('../models/Job')
const Role = require("../models/Role");
const {Policys}= require('../services')

const AcessControl = require('accesscontrol');

const difines = require('../secure/index');


const concierge = new AcessControl(difines);


module.exports={
    // como orignalmente apenas o deliveryman faz a candidates
    //ent apenas ele vai ter acesso ao controller principal 
    async index(req,res){
        const candidates = await Candidate.findAll({where:{deliveryman_id:req.userId}})

        const permission = concierge.can('deliveryman').readOwn('job')

        let only =[]

        candidates.map(candidate=>{
            let a = permission.filter(candidate.dataValues)
          only.push(a)
        })

        return res.json(only)

    },
    async show(req,res){
        // como orignalmente apenas o deliveryman faz a candidates
        //ent apenas ele vai ter acesso ao controller principal 
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



        return res.json(permission.filter(candidate.dataValues))
    },
    async store(req,res){
        const {number,observation,amount}=req.body

        console.log(req.body)

      const verify = await Policys.Candidate.forCreate(number,req.userId,res)

      //return console.log(verify)
      if(verify.status == false)
        return res.status(401).json({err:verify.err})

       const job = await Job.findOne({where:{number}})

       job.remaining = job.remaining-1

       job.save()

      // await Job.update({remainig:newVaga},{where:{id:job.id}})

        const candidate = await Candidate.create({
            job_id:job.id,
            deliveryman_id:req.userId,
            candidate_type:1,
            status:true,
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