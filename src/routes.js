const express = require('express');

const CompanyController = require('./app/controllers/CompanyController');
const DeliverymanController = require('./app/controllers/DeliverymanController');
const JobController = require('./app/controllers/JobController');
const SessionController = require('./app/controllers/SessionController');
const CandidateController = require('./app/controllers/CandidateController');

const JobMiddleware = require('./app/middleware/acl/job');
const CandidateMiddleware = require('./app/middleware/acl/candidate')
const {verifyToken} =require('./app/middleware/auth');
const {verifyBanned}=require('./app/middleware/banned')

const User = require('./app/models/User');
const Job = require('./app/models/Job');
const Candidate = require('./app/models/Candidate');

const routes = express.Router()

routes.post('/company',CompanyController.store)
routes.post('/deliveryman',DeliverymanController.store)

routes.post('/login',SessionController.session)

routes.post('/bait', async (req,res)=>{

  const {ajsdghf} = req.body
  console.log (req)

  return res.json(req.body)
})


routes.use(verifyToken)
routes.use(verifyBanned)

routes.use('/candidate',CandidateMiddleware.PermissionCreate)
routes.post('/candidate',CandidateController.store)

routes.use('/job',JobMiddleware.PermissionCreate)
routes.post('/job',JobController.store)


module.exports = routes