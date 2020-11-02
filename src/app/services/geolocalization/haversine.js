const {QueryTypes} = require('sequelize')


module.exports = {
    async nearBy(lat,lgt,distantce){
        const haversine = `(6371 * acos(cos(radians(${lat}))
        * cos(radians(latitude))
        * cos(radians(longitude)
        - radians(${lgt}))
        + sin(radians(${lat}))
        * sin(radians(latitude))))`

        const jobs = await sequelize
                    .query(`SELECT *, ${haversine} as dist 
                            FROM jobs 
                            WHERE status = false
                            HAVING dist < ${distantce}`,
                        {type:QueryTypes.SELECT})

        return jobs
    }

    
}