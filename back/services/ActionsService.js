const ActionRepo = require('../repositories/ActionsRepo')
const today  = new Date()

const CheckIfActionsAreAllowed = async (id) =>{
    const {actions} = await ActionRepo.ReadData()
     
    if(actions[0].date !== today.toLocaleDateString()){
        ResetData(actions)
    } 

    const userIndex = actions.findIndex((x)=> x.id == id )
    if(+actions[userIndex].actionAllowed > 0 ){
        actions[userIndex].actionAllowed = +actions[userIndex].actionAllowed - 1
        await ActionRepo.WriteData({actions})  
        return true
    }
    else return false
}

const ResetData = async (data) =>{
    data.forEach(x => {
        x.date = today.toLocaleDateString()
        x.actionAllowed = x.maxActions
    })
    return data
}

module.exports = {CheckIfActionsAreAllowed}