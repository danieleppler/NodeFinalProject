const jsonfile = require('jsonfile')
const path = require('path')

const Filepath = path.join(__dirname,'../data/Actions.json')

const ReadData = () =>{
    return jsonfile.readFile(Filepath)
}

const WriteData = (data) =>{
    jsonfile.writeFile(Filepath,data)
}

module.exports = {ReadData,WriteData}