const User=require('../models/User')
const Role=require('../models/Role')

module.exports={
    async store(req,res){
        console.log(req.body)

        const {name,email,password,cpf_cnpj,latitude,longitude} = req.body

        const verify = await User.findOne({where:{cpf_cnpj,email}})
        if(verify)
            return res.status(400).json({err:'This user already exist'})

        const user = await User.create({name,email,password,cpf_cnpj,latitude,longitude})
        await Role.create({user_id:user.id,role:'deliveryman'})

        return res.json(user)
            
    }
}
