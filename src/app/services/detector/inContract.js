const {Op}=require('sequelize');

const {OverlapQueue} = require('../compare/index')


module.exports={
    async interference(base,deliveryman_id,err){

        if(!Array.isArray(base)) throw new TypeError('typeof base must be a array')

        if(typeof deliveryman_id !=='number') throw new TypeError('typeof deliveryman_id must be a string')

        if(typeof err !== 'function') throw new TypeError('typeof err must be a function')

        const full = await sequelize.query(`
            SELECT * 
            FROM contracts
            WHERE(
                date(end_day) IS null
                OR
                (${base.start_day} BETWEEN  date(start_day) AND date(end_day))
                OR
                (${base.end_day} BETWEEN  date(start_day) AND date(end_day))
            )
            AND
                deliveryman_id=${deliveryman_id}

            AND
                number <>${base.number}
        `,
        {
            model:Contract,
            mapToModel:true
        })

        // ver se o novo contrato afeta outros contratos
        await OverlapQueue([base.start_office_hour,base.end_office_hour],full,e=>{
            return err()
        })

        return console.log('passou'),true
    },
    async diference(old,young){
        
    }
}