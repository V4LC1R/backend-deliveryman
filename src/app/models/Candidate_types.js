const {DataTypes,Model} = require('sequelize')

class Candidate_type extends Model{
    static init(sequelize){
        super.init(
            {
               class_candidate:DataTypes.STRING
            },
            {
                sequelize
            }
        )
    }
    static associate(model){
        this.hasMany(model.Candidate,{foreignKey:'type_candidate',as:'Type Candidate'})
    }
}

module.exports = Candidate_type