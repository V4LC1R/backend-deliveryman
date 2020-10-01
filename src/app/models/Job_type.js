const {DataTypes,Model} = require('sequelize')

class Tender_type extends Model{
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

module.exports = Tender_type