const Job = require('../models/Job')
const {Haversine} = require('../services/index')

module.exports={
    async index(req,res){
        const {latitude,longitude,distance}=req.body

        const job = Haversine.nearBy(latitude,longitude,distance)
    },
    async show(req,res){
        
    }
}