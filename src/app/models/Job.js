const {DataTypes,Model} =require('sequelize')
const Crypto = require('crypto')

class Job extends Model {
    static init(sequelize){
        super.init(
            {
                tender_cod:DataTypes.STRING,
                price:DataTypes.DECIMAL(10,2),
                status:DataTypes.BOOLEAN,
                start_day:DataTypes.DATE,
                number:DataTypes.STRING,
                end_day:DataTypes.DATES,
                start_office_hour:DataTypes.TIME,
                end_office_hour:DataTypes.TIME,
            },
            {
                sequelize
            }
        )
        this.beforeCreate(async tender=>{
            if(tender.end_day == '' || tender.end_day == null)
                tender.typing_id = 1
            else tender.typing_id = 2

            tender.number = Crypto.randomBytes(5).toString('hex')

        })
        this.afterCreate(async tender=>{
            if(tender.typing_id == 1) return console.log("Todo mundo ve")

            if(tender.typing_id==2) return console.log("ngm ve só a empresa")
        })

        this.beforeUpdate(async tender=>{
            const old = this.findOne({where:{number:tender.number}})

            if(old.status != tender.status) return console.log('Mandar pros fracassados a mudança')

            
        })
    }
    static associate(model){
        this.belongsTo(model.Job_type,{foreignKey:'typing_id',as:'Job Type'})

        this.belongsTo(model.User,{foreignKey:'company_id',as:'Comapany'})

        this.hasMany(model.Candidate,{foreignKey:'job_id',as:'Candidates'})
    }
}

module.exports=Job