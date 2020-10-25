const {Model,DataTypes} = require('sequelize');
const Crypto = require('crypto');

class Candidate extends Model{
    static init(sequelize){
        super.init(
            {
                observation:DataTypes.TEXT,
                status:DataTypes.BOOLEAN,
                number:DataTypes.STRING
            },
            {
                sequelize
            }
        )
        this.beforeCreate(async candidate=>{
            candidate.number = Crypto.randomBytes(8).toString('hex')
        })
        this.afterCreate(async candidate=>{
            if(candidate.candidate_type ==2 )
                console.log('disparar função de notifacão de propostas entregadores')
            
            if(candidate.candidate_type == 1)
                console.log('disparar função de notifacão de candidatura para empresa')
        })
    }

    static associate(model){
        this.belongsTo(model.User,{foreignKey:'deliveryman_id',as:'Deliveryman'})

        this.belongsTo(model.Job,{foreignKey:'job_id',as:'Job'})

       this.belongsTo(model.Candidate_type,{foreignKey:'candidate_type',as: 'Type'})
        
    }
}

module.exports = Candidate