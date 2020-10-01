const Chalenge = require('./roles/adminChalenge')
const Master = require('./roles/adminMaster')
const Suport =require('./roles/adminSuport')
const Company = require('./roles/comapany')
const Deliveryman =require('./roles/deliveryman')

module.exports={
    adminChalenge:Chalenge,
    adminMaster:Master,
    adminSuport:Suport,
    company:Company,
    deliveryman:Deliveryman
}