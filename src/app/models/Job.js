const {DataTypes,Model} =require('sequelize')
const Crypto = require('crypto')

class Job extends Model {
    static init(sequelize){
        super.init(
            {
                price:DataTypes.DECIMAL(10,2),
                status:DataTypes.BOOLEAN,
                start_day:DataTypes.DATE,
                number:DataTypes.STRING,
                amount:DataTypes.INTEGER,
                remaining:DataTypes.INTEGER,
                end_day:DataTypes.DATE,
                start_office_hour:DataTypes.TIME,
                end_office_hour:DataTypes.TIME,
                
            },
            {
                sequelize
            }
        )
        this.beforeCreate(async job=>{
            console.log('aqui')
            if(job.end_day == '' || job.end_day == null)
                job.typing_id = 1
            else job.typing_id = 2

            job.number = Crypto.randomBytes(5).toString('hex')
            job.remaining = job.amount;

        })
        this.afterCreate(async job=>{
            if(job.typing_id == 1) return console.log("Todo mundo ve")

            if(job.typing_id==2) return console.log("ngm ve só a empresa")
        })

        this.beforeUpdate(async job=>{
            const old = this.findOne({where:{number:job.number}})

            if(old.status != job.status) 
             console.log('Mandar pros fracassados a mudança')

            
        })
    }
    static associate(model){
        this.belongsTo(model.Job_type,{foreignKey:'typing_id',as:'Type'})

        this.belongsTo(model.User,{foreignKey:'company_id',as:'Company'})

        this.hasMany(model.Candidate,{foreignKey:'job_id',as:'Candidate'})
    }

}

module.exports=Job