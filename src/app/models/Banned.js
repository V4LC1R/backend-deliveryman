const {Model,DataTypes} = require('sequelize');

class Banned extends Model{
    static init(sequelize){
        super.init(
            {
                why:DataTypes.TEXT,
                status:DataTypes.BOOLEAN
            },
            {
                sequelize
            }
        )
        this.afterCreate(async user=>{
            console.log('user were banned')
        })
    }

    static associate(model){
        this.belongsTo(model.User,{foreignKey:'user_id',as:'User'})
        
    }
}

module.exports = Banned