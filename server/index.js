import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import dalleRoutes from './routes/dalleRoutes.js'
import postRoutes from './routes/postRoutes.js'
import removeBg from './routes/removeBg.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }))

app.use('/api/dalle', dalleRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/remove-bg', removeBg);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((error) => {
    console.error('MongoDB connection error:', error)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = process.env.PORT || 8080
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`)
})
