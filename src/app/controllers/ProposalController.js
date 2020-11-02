const Candidate = require("../models/Candidate")
const Job = require('../models/Job')
const User = require("../models/User")
const {Policys}= require('../services')
module.exports={
    async index(req,res){
       //pegar todas as propostas(candidate) de empresa
        //SELECT * FROM candidates cd RIGHT JOIN jobs jb ON cd.job_id=jb.id WHERE cd.candidate_type=2 AND jb.company_id=1
       const tenders= await Candidate.findAll({
           include:[
               {
                    model:Job,
                    right:true,
                    where:{company_id:req.userId}
                },
                {
                    model:User,
                }
            ]
        });

        return res.json(tenders)
    },
    async show(req,res){

        const {number} = req.params
        

        const proposal = await Candidate.findOne({
            where:{number},
            include:[
                {
                   model:User
                },
                {
                    model:Job,
                    where:{company_id:req.userId},
                    right:true
                }
            ]
        })

        return res.json(proposal)

    },
    async store(req,res){
        const {number,observation,cpf_cnpj}=req.body

        await Policys.Proposal.forCreate(number,cpf_cnpj,req.userId,res)

        const deliveryman = await User.findOne({where:{cpf_cnpj}})

        const job = await Job.findOne({where:{number}})

        const candidate = await Candidate.create({
            job_id:job.id,
            deliveryman_id:deliveryman.id,
            type_candidate:2,
            number:'',
            observation
        })

        return res.json(candidate)
    },
    async update(req,res){

        const {number} =req.body

        await Policys.Proposal.forUpdate(number,req.userId,res)

        await Candidate.update(req.body,{where:{number}})

        return res.status(200).json({message:`The Update of the ${number} proposal was a sucess`})

    },
    async destroy(req,res){

        const {number} = req.body

        await Policys.Proposal.forDelete(number,req.userId,res)

        await Candidate.destroy({where:{number}})

        return res.status(200).json({message:`The Delete of the ${number} proposal was a sucess`})
    }
    
}