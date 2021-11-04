const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect.js')
const notFound = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/errorHandler.js')
require('dotenv').config()

const PORT = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

// server + DB
const start = async () => {
    try {
        await connectDB(process.env.MONGO_U)
        app.listen(PORT,() => console.log(`Server running at http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
