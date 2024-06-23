const shiftModel = require('../repositories/shiftRepo')

const getAllData = async () =>{
    const data = await shiftModel.getallData()
    return data
}

module.exports = {getAllData}