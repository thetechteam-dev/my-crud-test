import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js'

// Constants
const PORT = 5000

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



