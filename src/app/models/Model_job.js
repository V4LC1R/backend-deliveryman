const {Model,DataTypes} = require('sequelize');

class Model_job extends Model{
    static init(sequelize){
        super.init(
            {
                mode:DataTypes.STRING
            },
            {
                sequelize
            }
        )
    }

    static associate(model){
        this.hasMany(model.Job,{foreignKey:'mode_job_id',as:'Mode'})
        
    }
}

module.exports = Model_job