const express = require('express')
const cors = require('cors')

const app = express()

const port = 8000

app.use(cors())
app.use(express.json())

require("./configs/database")

const userController = require('./controllers/userController')
app.use('/users',userController)

const employeeController = require('./controllers/employeesController')
app.use('/employees',employeeController)

const departmentController = require('./controllers/departmentController')
app.use('/departments',departmentController)

const shiftsController = require('./controllers/shiftsController')
app.use('/shifts',shiftsController)

app.listen(port,()=>{
    console.log(`app is listening on port ${port} ...`)
})