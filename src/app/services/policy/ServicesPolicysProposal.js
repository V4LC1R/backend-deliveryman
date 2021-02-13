const Banned = require("../../models/Banned")
const Candidate = require("../../models/Candidate")
const Role = require("../../models/Role")
const Job = require('../../models/Job')
const User = require("../../models/User")



module.exports ={
    async forCreate(number,cpf_cnpj,user,res){
        if(typeof number !== 'string') throw new TypeError('typeof number must be a string')

        if(typeof cpf_cnpj !== 'string') throw new TypeError('typeof cpf_cnpj must be a string')

        const deliveryman = await User.findOne({where:{cpf_cnpj}});

        //verificar se o usuário que vai tentar cadastrar é um entregador
        if(!await Role.findOne({where:{user_id:deliveryman.id,role:'deliveryman'}}))
            return res.status(401).json({err:"This user does not exists or not a deliveryman person"})

        //verificar se o entregador está banido
        if(await Banned.findOne({where:{user_id:deliveryman.id,status:true}}))
            return res.status(401).json({err:"This deliveryman person has been banned"})

        const job = await Job.findOne({where:{number,company_id:user}})

        //verifica se existe um job
        if(!job)
            return res.status(401).json({err:'This job does not exists'})

        //verifica se o job ainda está recebendo candidatura
        if(job.status == true)
            return res.status(401).json({err:"You cannot apply for this job"})

        //conta a quantia de canidaturas aceitas
        const much = await Candidate.count({where:{job_id:job.id,status:true}})

        //verifica se a quantidade de candidaturas aceitas e menor do que as vagas
        if(much > job.amount)
            return res.status(401).json({err:"You cannot apply for this job"})
        
        return 
    },
    async forUpdate(number,user,res){
        const candidate = await Candidate.findOne({where:{number,candidate_type:2}})

        // tem que existir
        if(!candidate)
            return res.status(401).json({err:"This proposal does not exist"})

        const oring = await Job.findOne({where:{id:candidate.job_id,company_id:user}})

        //verifica se existe uma origem com id e comapany_id igual ao usuario
        if(!oring)
            return res.status(401).json({err:"Origin not found"})

        // não pode ter status difernte de null
        if(candidate.status == true || candidate.status == false)
            return res.status(401).json({err:"This proposal was accept/reject"})

        return 
     },

    async forDelete(number,user,res){
        const candidate = await Candidate.findOne({where:{number,candidate_type:2}})

        // tem que existir
        if(!candidate)
            return res.status(401).json({err:"This proposal does not exist"})

        const oring = await Job.findOne({where:{id:candidate.job_id,company_id:user}})

        //verifica se existe uma origem com id e comapany_id igual ao usuario
        if(!oring)
            return res.status(401).json({err:"Origin not found"})

        // não pode ter status difernte de null
        if(candidate.status == true || candidate.status == false)
            return res.status(401).json({err:"This proposal was accept/reject"})
    },
    async forCancel(){}
}