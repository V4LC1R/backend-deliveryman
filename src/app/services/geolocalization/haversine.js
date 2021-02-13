const dbconfig=require("../../../config/database");
const {QueryTypes,Sequelize } = require('sequelize')
//const sequelize = new Sequelize(dbconfig)
const sequelize = require('../../../database/index')
const Job = require('../../models/Job');

module.exports = {
    async nearBy(lat,lgt,distantce){
        const haversine = `(6371 * acos(cos(radians(${lat}))
        * cos(radians(latitude))
        * cos(radians(longitude)
        - radians(${lgt}))
        + sin(radians(${lat}))
        * sin(radians(latitude))))`

        

        const jobs = await sequelize.query(`SELECT *, ${haversine} as dist 
                            FROM jobs 
                            WHERE status = false
                            HAVING dist < ${distantce}`,
                        {model:Job,mapToModel:true})

        console.log(jobs)

        return jobs
        
    }

    
}