const Sequelize = require('sequelize')
const dbConfig=require('../config/database')
const User = require('../app/models/User')
const Role = require('../app/models/Role')
const Banned = require('../app/models/Banned')
const Job_types=require('../app/models/Job_type')
const Job = require('../app/models/Job')

const Candidate = require('../app/models/Candidate')
const Candidate_type = require('../app/models/Candidate_type')
const Model_job = require('../app/models/Model_job')


const connection = new Sequelize(dbConfig)

User.init(connection)
Role.init(connection)
Banned.init(connection)
Job_types.init(connection)
Job.init(connection)
Candidate_type.init(connection)
Candidate.init(connection)
Model_job.init(connection)

User.associate(connection.models)
Role.associate(connection.models)
Banned.associate(connection.models)
Job_types.associate(connection.models)
Job.associate(connection.models)
Candidate_type.associate(connection.models)
Candidate.associate(connection.models)
Model_job.associate(connection.models)

module.exports= connection 