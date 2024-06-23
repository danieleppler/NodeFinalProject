const express = require('express')
const router = express.Router()


const utilFunc = require('../utils/GenericFuncs')
const employeeSvc = require('../services/EmployeeService')
const ActionSvc = require('../services/ActionsService')

router.get("/",async (req,res)=>{

    const token = req.headers.token
    const validation = utilFunc.validateToken(token)
    switch(validation){
        case 0:
            return res.json({ErrMsg:"Invalid Token not provided"})
        case 2:
            return res.json({ErrMsg:"Invalid token"})
    }
    const userid =req.headers.userid

    let data= {}
    if(await ActionSvc.CheckIfActionsAreAllowed(userid)){
        data = await employeeSvc.getEmployeesList()
    }
    else{
        data  = {ErrMsg:"No more actions allowed for today"} 
    }

    return res.json(data)
})

router.put('/',async (req,res)=>{
    const token = req.headers.token
    const validation = utilFunc.validateToken(token)
    switch(validation){
        case 0:
            return res.json({ErrMsg:"Invalid Token not provided"})
        case 2:
            return res.json({ErrMsg:"Invalid token"})
    }

    const userid =req.headers.userid 
    let data = {}
    if(ActionSvc.CheckIfActionsAreAllowed(userid)){
        data = await employeeSvc.updateEmployee(req.body)
    }
    else{
        data  = {ErrMsg:"No more actions allowed for today"} 
    }    
    return res.json(data)
})

router.delete('/',async (req,res)=>{
    
    const token = req.headers.token
    const validation = utilFunc.validateToken(token)
    switch(validation){
        case 0:
            return res.json({ErrMsg:"Invalid Token not provided"})
        case 2:
            return res.json({ErrMsg:"Invalid token"})
    }

    const userid =req.headers.userid 
    let data ={}
    if(ActionSvc.CheckIfActionsAreAllowed(userid)){
        data = await employeeSvc.deleteEmployee(req.body._id)
    }
    else{
        data  = {ErrMsg:"No more actions allowed for today"} 
    }
    return res.json(data)
})

router.post('/',async (req,res)=>{
    const token = req.headers.token
    const validation = utilFunc.validateToken(token)
    switch(validation){
        case 0:
            return res.json({ErrMsg:"Invalid Token not provided"})
        case 2:
            return res.json({ErrMsg:"Invalid token"})
    }

    let userid =req.headers.userid
    let data = {} 
    if(ActionSvc.CheckIfActionsAreAllowed(userid)){
        data = await employeeSvc.addnewEmployee(req.body)
    }
    else{
        data  = {ErrMsg:"No more actions allowed for today"} 
    }
    
    return res.json(גשאש)
})

module.exports = router