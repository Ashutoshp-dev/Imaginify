import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import dalleRoutes from './routes/dalleRoutes.js'
import postRoutes from './routes/postRoutes.js'
import removeBg from './routes/removeBg.js'

dotenv.config()

const app = express()
app.use(cors({
    origin: "*",
}))
app.use(express.json({ limit: "50mb" }))

app.use('/api/dalle', dalleRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/remove-bg', removeBg);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB successfully')
})
.catch((error) => {
    console.error('MongoDB connection error:', error)
    console.error('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    })
})

const port = process.env.PORT || 8080
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`)
})
