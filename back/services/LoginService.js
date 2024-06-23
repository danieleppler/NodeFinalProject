const LoginRepo = require('../repositories/LoginRepo')
const jwt = require('jsonwebtoken')
const userRepo = require('../repositories/UserRepo')

const secret = 'SECRET'

const getUserData = async (user) =>{    
    const {data:userFromRepo} = await LoginRepo.getDataByUserName(user.username)
    if (userFromRepo.length === 0) return {
        status:"Failed",
        Reason:"User Not Found",

    }

    if(userFromRepo[0].email != user.email) return {
        status:"Failed",
        Reason:"Invalid email"
    }

    const token = jwt.sign(user,secret)
    const dataFromDB = await userRepo.getData(userFromRepo[0].name)
    return {
        status:"Success",
        token:token,
        id:dataFromDB[0].id,
        payload:dataFromDB
    }

}


module.exports = {getUserData}