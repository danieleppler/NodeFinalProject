
const secret = 'SECRET'
const jwt = require('jsonwebtoken')

const validateToken = (token) =>{
    if(!token)
        return 0
    try{
        jwt.verify(token,secret)
        return 1
    }
    catch(e)
        {
            return 2
        }
}

module.exports = {validateToken}