const Proposal = require('./policy/proposal')
const Contract = require('./policy/contract')
const Candidate = require('./policy/candidate')
const Job = require('./policy/job')

const inContract = require('./detector/inContract')

module.exports ={
    Policys:{
        Proposal,
       // Contract,
        Candidate,
        Job
    },
    Detector:{
        inContract
    }
}