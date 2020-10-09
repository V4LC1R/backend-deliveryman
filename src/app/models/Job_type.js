const {DataTypes,Model} = require('sequelize')

class Job_type extends Model{
    static init(sequelize){
        super.init(
            {
                class_tender:DataTypes.STRING
            },
            {
                sequelize
            }
        )
    }
    static associate(model){
        this.hasMany(model.Job,{foreignKey:'typing_id',as:'Type Job'})
    }
}

module.exports = Job_type