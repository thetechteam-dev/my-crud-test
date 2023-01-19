import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js'
import process from 'dotenv';

// Constants

const configs =  process.config().parsed

const PORT = configs['PORT']

const app = express();

// Middleware
app.use(bodyParser.json())

// Start Server
app.listen(PORT, () => console.log(`Server running on port : http://localhost:${PORT}`))

// Routes

app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    res.send("Welcome to HomePage")
})



