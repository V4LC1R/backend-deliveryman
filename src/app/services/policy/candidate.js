const Banned = require("../../models/Banned")
const Candidate = require("../../models/Candidate")
const Job = require("../../models/Job")
const Role = require("../../models/Role")
const User = require("../../models/User")

module.exports ={
    async forCreate(number,user,res){

        const job = await Job.findOne({where:{number}})

        //valida a existencia do job
        if(!job)
            return res.status(401).json({err:"this job does not exist"})

        // valida se a empresa não está banida
        if(await Banned.findOne({where:{user_id:job.company_id,status:true}}))
            return res.status(401).json({err:"The company, the owner this job, was banned"})

        //vericar se o usuario já tem candidatura nesse job
        if(await Candidate.findOne({where:{job_id:job.id,deliveryman_id:user}}))
            return res.status(401).json({err:"You cannot apply for this job"})
        
        // verifica se o job está ativo
        if(job.status == true)
            return res.status(401).json({err:"You cannot apply for this job"})

        //verificar se o job e aberto
        if(job.job_type ==2)
            return res.status(401).json({err:"This job is not open"})

        //conta a quantia de candidaturas aceitas
        const much = await Candidate.count({where:{job_id:job.id,status:true}})

        //Compara se a quantia aceita e maior do que o numeros de vagas
        if(much > job.amount)
            return res.status(401).json({err:"You cannot apply for this job"})

        return

    },
    async forUpdate(number,user,res){
        const candidate = await Candidate.findOne({where:{number,deliveryman_id:user}})

        // valida a existencia da candidatura
        if(!candidate)
            return res.status(401).json({err:"this candidate does not exist"})
           
        // verifica se tem um estatus null
        if(candidate.status == true || candidate.status == false )
            return res.status(401).json({err:"this candidate was accept/reject"})

        return 
    },
    async forDelete(number,user,res){
        const candidate = await Candidate.findOne({where:{number,deliveryman_id:user}})

        if(!candidate)
            return res.status(401).json({err:"this candidate does not exist"})
           
        if(candidate.status == true || candidate.status == false)
            return res.status(401).json({err:"this candidate was accept/reject"})

        return 
    }
}