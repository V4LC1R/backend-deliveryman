const Banned = require("../../models/Banned")
const Candidate = require("../../models/Candidate")
const Job = require("../../models/Job")
const Role = require("../../models/Role")
const User = require("../../models/User")

module.exports ={
    async forCreate(number,user){

        console.log(number)

        const job = await Job.findOne({where:{number}})

        //valida a existencia do job
        if(!job)
            return {err:"This Job not exist",status:false}

        // valida se a empresa não está banida
        if(await Banned.findOne({where:{user_id:job.company_id,status:true}}))
            return {err:"This company was banned",status:false}

        //vericar se o usuario já tem candidatura nesse job
        if(await Candidate.findOne({where:{job_id:job.id,deliveryman_id:user}}))
            return {err:"You cannot apply for this job, because your was candidate for this job",status:false}
        
        // verifcar a data de contração


        // verifica se o job está ativo
        if(job.active == true)
            return {err:"You cannot apply for this job, because this job was inativate",status:false}

        //verificar se o job e aberto
        if(job.job_type ==2)
            return {err:"You cannot apply for this job, because this job is close",status:false}


        //Verifica se tem vagas
        if(job.remaining == 0)
            return {err:"You cannot apply for this job, don´t has remaning",status:false}

        return {status:true}

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
    },
    async forCancel(){}
}