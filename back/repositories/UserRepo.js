const userModel = require('../models/userModel')

const getData = async (name) =>{
    return await userModel.find({full_name:name})
}

module.exports = {getData}