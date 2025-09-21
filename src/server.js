require('dotenv').config()
const authRoutes = require('./routes/auth-routes')
const express = require('express')
const {createUsersTable} = require('./models/Queries')
const uploadGitlinkRoutes = require('./routes/upload-gitlink-routes')
const authMiddleware = require('./middleware/auth-middleware')
const {gitlink_table} = require('./models/gitlinkQuery')

const app = express()

// create user table 
createUsersTable()

// create github link table 
gitlink_table()


const PORT=process.env.PORT||5000

app.use(express.json())

//auth route
app.use('/api/auth', authRoutes)
app.use('/api/upload-gitlink',uploadGitlinkRoutes)


app.listen(PORT, ()=>{
    console.log(`Server is running on Port : ${PORT}`);
})