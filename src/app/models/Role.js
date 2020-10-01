const {Model,DataTypes} = require('sequelize');

class Role extends Model{
    static init(sequelize){
        super.init(
            {
                role:DataTypes.STRING
            },
            {
                sequelize
            }
        )
    }

    static associate(model){
        this.belongsTo(model.User,{foreignKey:'user_id',as:'User'})
        
    }
}

module.exports = Role