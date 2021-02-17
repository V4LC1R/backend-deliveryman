const {DataTypes,Model, Op} =require('sequelize')
const Crypto = require('crypto')
const Candidate = require('./Candidate')
const { findAll } = require('./Model_job')

class Job extends Model {
    static init(sequelize){
        super.init(
            {
                price:DataTypes.DECIMAL(10,2),
                status:DataTypes.BOOLEAN,
                temporary:DataTypes.BOOLEAN,
                start_day:DataTypes.DATE,
                number:DataTypes.STRING,
                amount:DataTypes.INTEGER,
                remaining:DataTypes.INTEGER,
                end_day:DataTypes.DATE,
                start_office_hour:DataTypes.TIME,
                end_office_hour:DataTypes.TIME,
                latitude:DataTypes.DECIMAL(9,6),
                longitude:DataTypes.DECIMAL(9,6)
                
            },
            {
                sequelize
            }
        )
        this.beforeCreate(async job=>{
            console.log('aqui')
            if(job.end_day == '' || job.end_day == null)
                job.temporary = false
            else job.temporary = true

            job.status= true;

            job.number = Crypto.randomBytes(6).toString('hex')
            job.remaining = job.amount;

        })
        this.afterCreate(async job=>{
            if(job.typing_id == 1) console.log("Todo mundo ve")

            if(job.typing_id==2)  console.log("ngm ve só a empresa")
        })

        this.afterUpdate(async job=>{
            if(job.remaining > 0)
                return

           await Candidate.update({status:false},{where:{job_id:job.id,status:{[Op.ne]:true}}})
                
        })

        this.beforeUpdate(async job=>{
            const old = this.findOne({where:{number:job.number}})

            if(old.status !== job.status) 
                console.log('Mandar pros fracassados a mudança')

            
        })
    }
    static associate(model){
        this.belongsTo(model.Job_type,{foreignKey:'typing_id',as:'Type'})

        this.belongsTo(model.Model_job,{foreignKey:'model_job_id',as:'Model'})
        
        his.belongsTo(model.User,{foreignKey:'company_id',as:'Company'})

        this.hasMany(model.Candidate,{foreignKey:'job_id',as:'Candidate'})
    }

}

module.exports=Job