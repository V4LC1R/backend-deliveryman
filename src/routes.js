const express = require('express');

const CompanyController = require('./app/controllers/CompanyController');
const DeliverymanController = require('./app/controllers/DeliverymanController');
const JobController = require('./app/controllers/JobController');
const SessionController = require('./app/controllers/SessionController');

const {verifyToken} =require('./app/middleware/auth');


const routes = express.Router()

routes.post('/company',CompanyController.store)
routes.post('/deliveryman',DeliverymanController.store)

routes.post('/login',SessionController.session)

routes.use(verifyToken)

routes.post('/job',JobController.store)

routes.post('/teste',(req,res)=>{
    return res.json({message:'okay legal'})
})

module.exports = routes