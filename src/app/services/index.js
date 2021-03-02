const Proposal = require('./policy/ServicesPolicysProposal')
const Candidate = require('./policy/ServicesPolicysCandidate')
const Job = require('./policy/ServicesPolicysJob')

const inContract = require('./detector/ServiceRangeContract')
const Haversine = require('./geolocalization/SevicesHaversine')
const Compare = require('./compare/index')

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
    Haversine,
    Compare
}