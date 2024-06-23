const express = require('express')
const router = express.Router()
const ActionSvc = require('../services/ActionsService')

const utilFunc = require('../utils/GenericFuncs')

const shiftsSvc = require('../services/ShiftsService')

router.get('/',async (req,res)=>{
    const token = req.headers.token
    const validation = utilFunc.validateToken(token)
    switch(validation){
        case 0:
            return res.json({ErrMsg:"Invalid Token not provided"})
        case 2:
            return res.json({ErrMsg:"Invalid token"})
    }

    let data={}

    const userid =req.headers.userid 
    if(ActionSvc.CheckIfActionsAreAllowed(userid)){
        data = await shiftsSvc.getAllData()
    }
    else{
        data  = {ErrMsg:"No more actions allowed for today"} 
    }
    
    return res.json(data)
})

module.exports = router