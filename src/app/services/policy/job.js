const Job = require('../../models/Job')

module.exports={
    async forUpdate(body,user,res){

        const {number} = body

        const job = await Job.findOne({where:{number,company_id:user}})

        if(!job) return res.status(401).json({err:'This job is not exist'})

       const 


        return
    },
    async forDelete(number,user,res){

    }
}

// ele querer colocar mais pessoas em uma job
    //verificar se não tem 2 cadastrados na mesma job