const Proposal = require('./policy/ServicesPolicysProposal')
const Candidate = require('./policy/ServicesPolicysCandidate')
const Job = require('./policy/ServicesPolicysJob')

const inContract = require('./detector/inContract')
const Haversine = require('./geolocalization/haversine')

module.exports ={
    Policys:{
        Proposal,
       // Contract,
        Candidate,
        Job
    },
    Detector:{
        inContract
    },
    Haversine
}