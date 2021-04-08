import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import route from './routes'

dotenv.config()

mongoose.connect(String(process.env.DATABASE_KEY), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

const api = express()

const { PORT } = process.env

api.use(express.json())
api.use(cors())
api.use(route)

api.listen(PORT, () => {
  console.log(`Entrou na API on Port: ${PORT}`)
})

export default api
