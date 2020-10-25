const {Model,DataTypes} = require('sequelize');

const Bcrypt = require('bcrypt');

class User extends Model{
    static init(sequelize){
        super.init(
            {
                name:DataTypes.STRING,
                cpf_cnpj:DataTypes.STRING,
                email:DataTypes.STRING,
                password:DataTypes.STRING,
                longitude:DataTypes.INTEGER,
                latitude:DataTypes.INTEGER
            },
            {
                sequelize
            }
        )
        this.beforeCreate(async user=>{
            user.password = Bcrypt.hashSync(user.password,8)
        })
    }

    static associate(model){
        this.hasOne(model.Role,{foreignKey:'user_id',as:'Role'})

        this.hasMany(model.Banned,{foreignKey:'user_id',as:'Bans'})

        this.hasMany(model.Job,{foreignKey:'company_id',as:'Tenders'})

        this.hasMany(model.Candidate,{foreignKey:'deliveryman_id',as :'Applications'})
    }

}

module.exports = User