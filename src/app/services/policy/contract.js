const {Op} = require('sequelize')

const Job = require('../../models/Job')
const User = require('../../models/User')
const Role = require('../../models/Role')
const Banned = require('../../models/Banned')

const {interference}=require('../detector/inContract')

module.exports ={

    /*
        --> verifica ban                 [x]

        --> verifica role
            para n criar um contrato 
            com o tipo de usuário errado [x]

        --> Verifica a existencia de 
            + d 1 contrato efetivo       [x]

        --> Verifica se acontece uma 
            sobreposição de horários 
            e contrato                   [x]


    */
    async forCreate({number,cpf_cnpj},res){

        //procura a proposta 
        const job = await Job.findAll({where:{number}});

        //valida a existencia
        if(!job)
            return res.status(401).json({err:"This Proposal does not exist"});

        // procura o usuário
        const deliveryman = await User.findOne({where:{cpf_cnpj}})

        //como na hora que cria o usuário registra sua role, não precisa verificar se o usuário existe
        // pois se n existe, n vai encontrar, e se a role n for a certa vai rejeitar
        if(!await Role.findOne({where:{user_id:deliveryman.id,role:'deliveryman'}}))
            return res.status(401).json({err:"This user does not exists or not a deliveryman person"})

        //valida se o entregador que deseja contratar está banido
        if(await Banned.findOne({where:{user_id:deliveryman.id,status:true}}))
            return res.status(401).json({err:"This delivery person cannot be hired as he has been banned"})

        // verifica para que um usário n tenha + d 1 contrato efetivo
        if(tender.end_day ==''|| tender.end_day==null){
            if(await Contract.findAll({where:{deliveryman_id:deliveryman.id,typing_id:1,end_day:{[Op.is]:null}}}))
                return res.status(401).json({err:"This delivery person cannot be hired"})
            return
        }
           
        //detecta se quando for gerar um contrato ele interfere em outros
        await interference(tender,deliveryman.id,e=>{return res.status(401).json({err:'interference detect'})})
    },

    /*
        --> pode partir de qualquer lado  []
           
        --> precisa estar em comum acordo []

        --> Precisa registrar 
            os históricos de mudanças     []

        --> verificar, pois algumas 
            mudanças podem ser feitas     []
                //price
                //expediente
                //data

        --> Verificar as interações das   []
            mudanças(se afeta outros,ou
            fica abaixo do valor necessários)

        --> nenhum dos users podem ser 
            banidos                       []

        --> Verificar se o usuário que
            solicita a mudança está 
            vinculado com o contrato      []

        --> Contrato n pode ter sido 
            fechado                       []

    */
    async forUpdate(newContract,auth,res){
      
        const oldContract = await Contract.findOne({where:{number:newContract.number}})


    }
}