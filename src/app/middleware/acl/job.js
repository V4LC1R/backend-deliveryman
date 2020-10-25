const AcessControl = require('accesscontrol');
const Role = require('../../models/Role');
const User = require('../../models/User');

const difines = require('../../secure/index');

const concierge = new AcessControl(difines);

module.exports={
    async PermissionCreate(req,res,next){
        const user = await Role.findOne({where:{user_id:req.userId}})

        const permission = concierge.can(user.role).createAny('job')

        if(permission.granted){
            next()
        }else{
            return res.status(401).json({err:"You don't have permission"})
        }
    },
    async PermissionUpdate(req,res,next){
        const user = await Role.findOne({where:{user_id:req.userId}})

        const permission = concierge.can(user.role)
        if(permission.granted){
            next()
        }else{
            return res.status(401).json({err:"You don't have permission"})
        }
    },
    async PermissionDestroy(req,res,next){
        const user = await Role.findOne({where:{user_id:req.userId}})

        const permission = concierge.can(user.role)
        if(permission.granted){

        }else{
            return res.status(401).json({err:"You don't have permission"})
        }
    }
}
