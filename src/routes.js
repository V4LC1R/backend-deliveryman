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
const JobControllerToDeliveryMan = require('./app/controllers/JobControllerToDeliveryMan');

const routes = express.Router()

routes.post('/company',CompanyController.store)
routes.post('/deliveryman',DeliverymanController.store)

routes.post('/login',SessionController.session)

routes.post('/bait', async (req,res)=>{

  const {ajsdghf} = req.body
  console.log (req)

  return res.json(req.body)
})

//Global Middleware
routes.use(verifyToken)
routes.use(verifyBanned)

//<--------- Candidate ---------->


routes.use('/candidate',CandidateMiddleware.PermissionCreate)
routes.post('/candidate',CandidateController.store)

routes.use('/candidate/:number',CandidateMiddleware.PermissionRead)
routes.get('/candidate/:number',CandidateController.show)

routes.use('/candidates',CandidateMiddleware.PermissionRead)
routes.post('/candidates',CandidateController.index)

routes.get('/jobs/:latitude/:longitude/:distance',JobControllerToDeliveryMan.index)

//<---------- JOB ------------>

routes.use('/job',JobMiddleware.PermissionCreate)
routes.post('/job',JobController.store)

routes.use('/job/:number',JobMiddleware.PermissionRead)
routes.get('/job/:number',JobController.show)

routes.use('/jobs',JobMiddleware.PermissionRead)
routes.get('/jobs',JobController.index)



//<-------- Proposal  -------->

module.exports = routes