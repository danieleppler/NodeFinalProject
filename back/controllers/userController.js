const express = require('express')
const router = express.Router()
const LoginService = require('../services/LoginService')

router.post('/login',async (req,res)=>{
    const data =await LoginService.getUserData(req.body)
    return res.json(data)
})



module.exports = router