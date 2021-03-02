const Candidate = require('../../models/Candidate')
const Job = require('../../models/Job')

module.exports={
    async forCreate(body,user){

        // validar data

        //validar price

        //validar payment



    },  
    async forUpdate(att,number,user){

        const job= await Job.findOne({where:{number:number}})
        const muchCandidatesAcepts = await Candidate.count({where:{job_id:job.id,status:true}})

        if(muchCandidatesAcepts > 0)
            return {err:"This work cannot be edited, because it already has an accepted application",status:false}

        if(job.delete_status==true)
            return {err:"You cannot apply for this job, because this job was delete",status:false}

        const jobStartDay = new Date(job.start_day)
        const attStarDay = new Date(att.start_day)
        const today = new Date();
       
        
        /* validar estagio
            -- não pode ter nehuma candidatura aceita
            -- nehum contrato aceito
            -- não pode estar delete_mode_status: true
        */

       /* validar data
            -- a data de inicio não pode ser mudada
            -- data final não pode ser menor que hoje e nem menor que data inicial
       */

       /* validar valores
            -- o valor não pode ser menor do que o acordo regional
            -- o valor do posicionamento do job não pode mudar        
       */




    },
    async forDelete(number,user){
        /* validar estagio
            -- não pode ter nehuma candidatura aceita
            -- nehum contrato aceito
            
        */

    },
    async forCancel(number,user){}
}

// ele querer colocar mais pessoas em uma job
    //verificar se não tem 2 cadastrados na mesma job