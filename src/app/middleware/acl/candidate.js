const Role = require('../../models/Role')

const AcessControl = require('accesscontrol')

const difines = require('../../secure/index');

const concierge = new AcessControl(difines);

module.exports={
   async PermissionCreate(req,res,next){
        const user = await Role.findOne({where:{user_id:req.userId}})

        const permission = concierge.can(user.role).createAny('candidates')

        if(permission.granted){
            next()
        }else{
            return res.status(401).json({err:"You don't have permission"})
        }
    },
   async PermissionRead(req,res,next){
        const user = await Role.findOne({where:{user_id:req.userId}})

        const permission = concierge.can(user.role).readAny('candidates')

        if(permission.granted){
            next()
        }else{
            return res.status(401).json({err:"You don't have permission"})
        }
    },
    PermissionUpdate(req,res,next){

    },
    PermissionDestroy(req,res,next){

    }
}
