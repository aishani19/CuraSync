import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

import { createServer } from 'http'
import { Server } from 'socket.io'
import { connectDB } from './config/postgresql.js'
import connectCloudinary from './config/cloudinary.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import chatRouter from './routes/chatRoute.js'
import { messageDb } from './models/db.js'

// app config
const app = express()
const port = process.env.PORT || 4000
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// Connect to database & cloud storage
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.get('/', (req, res) => {
  res.send('CuraSync API - PostgreSQL')
})

// Socket.io Logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join_room', (userId) => {
    socket.join(String(userId))
    console.log(`User ${userId} joined room`)
  })

  socket.on('send_message', async (data) => {
    const senderId = data.senderId || data.sender_id
    const receiverId = data.receiverId || data.receiver_id
    const { content } = data
    console.log(`Socket message from ${senderId} to ${receiverId}: ${content || '[File]'}`)
    
    // Persist to DB
    const savedMsg = await messageDb.create({ 
      senderId, 
      receiverId, 
      content: content || "", 
      fileUrl: data.fileUrl || data.file_url || null, 
      fileName: data.fileName || data.file_name || null, 
      fileType: data.fileType || data.file_type || null
    })



    const rRoom = String(receiverId)
    const sRoom = String(senderId)

    // Emit to receiver
    io.to(rRoom).emit('receive_message', savedMsg)
    // Emit back to sender
    io.to(sRoom).emit('receive_message', savedMsg)
    
    console.log(`Emitted message to rooms: ${rRoom}, ${sRoom}`)
  })


  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

httpServer.listen(port, () => console.log(`Server started on PORT:${port}`))

