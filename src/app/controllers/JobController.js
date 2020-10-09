
const Job = require('../models/Job')
const {Policys}= require('../services')
module.exports={
    async index(req,res){
        const jobs = await Job.findAll({where:{company_id:req.userId},include : {association: "Candidates"}})

        return jobs

    },
    async show(req,res){

        const {number} = req.params

        const job = await Job.findOne({where:{number,company_id:req.userId}})

        return job

    },
    async store(req,res){
        const {price,start_day,end_day,start_office_hour,end_office_hour} = req.body

        // precisa colocar o typing id

        const job = await Job.create({
            company_id:req.userId,
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