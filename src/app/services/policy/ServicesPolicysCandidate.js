const Banned = require("../../models/Banned")
const Candidate = require("../../models/Candidate")
const Job = require("../../models/Job")
const Role = require("../../models/Role")
const User = require("../../models/User")

module.exports ={
    async forCreate(number,user){

        const job = await Job.findOne({where:{number}})

        //valida a existencia do job, que ainda está ativo e não deletado
        if(!job)
            return {err:"This Job not exist",status:false}

        //validar se o job está apresentável

        // valida se a empresa não está banida
        if(await Banned.findOne({where:{user_id:job.company_id,status:true}}))
            return {err:"This company was banned",status:false}

        //vericar se o usuario já tem candidatura nesse job
        if(await Candidate.findOne({where:{job_id:job.id,deliveryman_id:user}}))
            return {err:"You cannot apply for this job, because your was candidate for this job",status:false}
        
        // verifcar a data de contração
            const today = new Date()
            const contract_day = new Date(job.start_day);

        if(contract_day<today)
            return {err:"You cannot apply for this job, because",status:false}

        // verifica se o job está ativo
        if(job.status == true)
            return {err:"You cannot apply for this job, because this job was inativate",status:false}

        //valido se o Job está deletado
        if(job.delete_status== true)
            return {err:"You cannot apply for this job, because this job was delete",status:false}

        //Verifica se tem vagas
        if(job.remaining <= 0)
            return {err:"You cannot apply for this job, don´t has remaning",status:false}

        return {status:true}

    },
    async forUpdate(number,user){
        const candidate = await Candidate.findOne({where:{number,deliveryman_id:user}})

        // valida a existencia da candidatura
        if(!candidate)
            return {err:"this candidate does not exist",status:false}
           
        // verifica se tem um estatus null
        if(candidate.status == true || candidate.status == false )
            return {err:"this candidate was accept/reject",status:false}

        return {status:true}
    },
    async forDelete(number,user){
        const candidate = await Candidate.findOne({where:{number,deliveryman_id:user}})

        if(!candidate)
            return {err:"this candidate does not exist",status:false}
           
        if(candidate.status == true || candidate.status == false)
            return {err:"this candidate was accept/reject",status:false}

        return {status:true}
    },
    async forCancel(number,user){
        const candidate = await Candidate.findOne({where:{number,deliveryman_id:user}})

        if(!candidate)
            return {err:"this candidate does not exist",status:false}
           
        if(candidate.status == true || candidate.status == false)
            return {err:"this candidate was accept/reject",status:false}

        return {status:true}
    }
}