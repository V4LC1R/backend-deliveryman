const Banned = require("../models/Banned")

module.exports={
    async verifyBanned(req,res,next){
        const banned = await Banned.findOne({where:{user_id:req.userId}})

        if(banned)
            return res.status(401).json({err:"You are banned",why:banned.why})

        next()
    }
}