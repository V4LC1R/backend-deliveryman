const Job = require('../models/Job')
const {Haversine} = require('../services/index')

module.exports={
    async index(req,res){
        const {latitude,longitude,distance}=req.params

        const job = await Haversine.nearBy(latitude,longitude,distance)

        console.log(job)
        return res.json(job)
    },
    async show(req,res){
        
    }
}