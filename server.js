const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./Database/connect')

dotenv.config()

app.use(express.static('./public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.redirect('/Home.html')
})

const port = process.env.PORT

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connected to the Database');

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}...`);

        })
    } catch (error) {
        console.log(error);

    }
}

start()