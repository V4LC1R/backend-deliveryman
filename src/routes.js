const express = require('express');

const CompanyController = require('./app/controllers/CompanyController');
const DeliverymanController = require('./app/controllers/DeliverymanController');
const SessionController = require('./app/controllers/SessionController');

const {verifyToken} =require('./app/middleware/auth');


const routes = express.Router()

routes.post('/new/company',CompanyController.store)
routes.post('/new/deliveryman',DeliverymanController.store)
routes.post('/login',SessionController.session)

routes.use(verifyToken)

routes.post('/teste',(req,res)=>{
    return res.json({message:'okay legal'})
})

module.exports = routes