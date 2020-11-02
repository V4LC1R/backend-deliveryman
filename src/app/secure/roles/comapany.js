module.exports={
    users:{
        'read:any':['*','!id']
    },
    roles:{
        'read:own':['*','!id','!user_id']
    },
    banneds:{
        'read:own':['*','!id','!user_id']
    },
    types:{
        'read:own':['*','!id'],
    },
    job:{
        'create:any':['*','!typing_id','!id'],
        'read:any':['*','!id','!company_id'],
        'update:own':['*','!id'],
        'delete:any':['*','!price','!status']
    },
    proposal:{
        'create:own':['*','!deliveryman_id'],
        'read:any':['*','!deliveryman_id','!tender_id'],
        'update:own':['*','!deliveryman_id'],
        'delete:own':['*','!id','!deliveryman_id']
    },
    candidate:{
        'read:own':['*','!deliveryman_id','!job_id',]
    }
}