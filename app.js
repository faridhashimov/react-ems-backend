const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = require('./config/db')
const employeesRoute = require('./routes/employeesRouter')
const port = process.env.PORT || 5000

connectDB()

app.use(cors())
// app.use(express.static('../frontend'))
app.use(express.json())

app.use('/api/employees', employeesRoute)

app.listen(port, () => {
    console.log(`app listen on port ${port}`)
})
