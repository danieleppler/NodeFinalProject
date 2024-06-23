const express = require('express')

const router = express.Router()
const utilFunc = require('../utils/GenericFuncs')
const ActionSvc = require('../services/ActionsService')
const departmentSvc= require('../services/DepartmentService')

router.get('/',async (req,res)=>{
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
    if(ActionSvc.CheckIfActionsAreAllowed(userid)){
        data = await departmentSvc.getAllData()
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
    let data ={}
    const userid =req.headers.userid 
    if(clear.CheckIfActionsAreAllowed(userid)){
        data = await departmentSvc.updateDepartment(req.body)
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
        data =  await departmentSvc.deleteDep(req.body._id)
    }
    else{
        data  = {ErrMsg:"No more actions allowed for today"} 
    }

    
    return res.json(data)
})


module.exports = router