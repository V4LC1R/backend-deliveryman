const jwt = require('jsonwebtoken');
const {hashJWT}= require('../../config/hasing')
const Banned = require('../models/Banned')

module.exports= {
   async verifyToken(req,res,next){
        const authHeader = req.headers.authorization;

        if(!authHeader)
            return res.status(401).json({err:'No TOKEN provided'});

        const parts = authHeader.split(' ');

        if(!parts.length === 2)
            return res.status(401).json({err:'TOKEN error'})

        const [barer,token]=parts;

        if(!/^Bearer$/i.test(barer))
            return res.status(401).json({err:'TOKEN malformatted'});

        jwt.verify(token,hashJWT,(err,decoded)=>{
            if(err)
                return res.status(401).json({err:'TOKEN Invalid'})
            return req.userId= decoded.id
        })

        const banned = await Banned.findOne({where:{user_id:req.userId,status:true}})
        
        if(banned)
            return res.status(401).json({err:`You are Banned and this Why: ${banned.why}`})

        next()
    }
}