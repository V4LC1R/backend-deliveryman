const Role = require('../models/Role')
const Job = require('../models/Job')

const {Policys}= require('../services')

const AcessControl = require('accesscontrol');
const difines = require('../secure/index');

const concierge = new AcessControl(difines);

module.exports={
    async index(req,res){
        // como orignalmente apenas a company faz os jobs
        //ent apenas ela vai ter acesso ao controller principal 
        const jobs = await Job.findAll({where:{company_id:req.userId},include:'Candidate'})

        const user = await Role.findOne({where:{user_id:req.userId}})

        const permission = concierge.can(user.role).readOwn('job')

        let only = []

        jobs.map(c=>{
           let b = permission.filter(c.dataValues)

           return only.push(b)
        })

        return res.json(only)
    },
    async show(req,res){

        const {number} = req.params

        const user = await Role.findOne({where:{user_id:req.userId}})

        const permission = concierge.can(user.role).readOwn('job')

        const job = await Job.findOne({where:{number,company_id:req.userId}})
        

        return res.json(permission.filter(job.dataValues))

    },
    async store(req,res){
        const {price,amount,start_day,end_day,start_office_hour,end_office_hour} = req.body

        console.log(req.body)
        // precisa colocar o typing id

      

        const job = await Job.create({
            company_id:req.userId,
            amount,
            typing_id:'',
            price,
            status: false,
            start_day,
            end_day,
            start_office_hour,
            end_office_hour

        })


        return res.json(job)
    },
    async update(req,res){

        const { number } = req.body;

      await Policys.Job.forUpdate(req.body,req.userId,res)

      const reJob = await Job.update(req.body,{where:{number}})

      return reJob

    },
    async destroy(req,res){
        const { number} = req.body

        await Policys.Job.forDelete(number,req.userId,res)

        await Job.destroy({where:number})

    }
    
}