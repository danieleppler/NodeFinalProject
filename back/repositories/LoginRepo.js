const axios = require('axios')

const url = 'https://jsonplaceholder.typicode.com/users'


const getDataByUserName = (username) =>{
    return axios.get(`${url}?username=${username}`)
}

module.exports  = {getDataByUserName} 