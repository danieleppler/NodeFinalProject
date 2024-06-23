const InitalState = {
    CurrentlyLoggedUser : {},
    CurrentlyEdittedEmployee:{},
    CurrentAllShifts:{},
    CurrentlyEdittedDepartment:{}
}


 const Reducer = (state=InitalState,action) =>{
    switch(action.type){
        case "Update_CurrentlyLoggedUser":
            return {...state,CurrentlyLoggedUser:action.payload}
        
        case "Update_CurrentlyEdittedEmployee":
            return {...state,CurrentlyEdittedEmployee:action.payload}

        case "Update_CurrentlyEdittedDepartment":
            return {...state,CurrentlyEdittedDepartment:action.payload}

        case "Reset_Store":
            return InitalState

        case "Update_CurrentAllShifts":
            return {...state,CurrentAllShifts:action.payload}

        default: 
            return state 
    }
}

export default Reducer