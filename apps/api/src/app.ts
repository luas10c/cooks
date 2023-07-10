import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { routes } from './routes/index.js'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
)

export const server = createServer(app)
export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['OPTIONS'],
    credentials: true
  }
})

routes(app)