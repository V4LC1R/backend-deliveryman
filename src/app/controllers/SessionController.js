const {hashJWT}= require('../../config/hasing')
const User=require('../models/User');
const Bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
const Banned = require('../models/Banned')

module.exports={
    async session(req,res){
        const {cpf_cnpj,password}=req.body
        const user = await User.findOne({where:{cpf_cnpj}})
        if(!user)
            return res.status(401).json({err:'User not found'})
        
        if(!(await Bcrypt.compare(password, user.password)))
            return res.status(401).json({err:'Password does not match'})

        const banned = await Banned.findOne({user_id:user.id,status:true})

        if(banned)
            return res.status(401).json({err:`You are Banned and this Why: ${banned.why}` })

        const role = await Role.findOne({where:{user_id:user.id}});

        const token = jwt.sign({id:user.id},hashJWT,{
            expiresIn:86400
        });

        const session={
            role:`${role.role}`,
            token
        }
        return res.json(session);
    }
    
}