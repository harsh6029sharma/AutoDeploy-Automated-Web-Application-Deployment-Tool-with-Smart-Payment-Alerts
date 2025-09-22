require('dotenv').config()
const authRoutes = require('./routes/auth-routes')
const express = require('express')
const { createUsersTable } = require('./models/Queries')
const uploadGitlinkRoutes = require('./routes/upload-gitlink-routes')
const authMiddleware = require('./middleware/auth-middleware')
const { gitlink_table, updateTableSchema } = require('./models/gitlinkQuery')
const generateDockerController = require('./routes/deploy-route')
const deployRoute = require('./routes/deploy-route')

const app = express()

// create user table 
createUsersTable()


// create github link table 
gitlink_table();


const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

//auth route
app.use('/api/auth', authRoutes)
app.use('/api/upload-gitlink', uploadGitlinkRoutes)
app.use('/api/deploy-project',deployRoute)


app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
})