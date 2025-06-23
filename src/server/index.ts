import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { createRequire } from 'module'

const require = createRequire(import.meta.url) 

// Import các router CommonJS
const chatRouter = require('./routes/chat.js')
const tipsRouter = require('./routes/tips.js')
const sectionsRouter = require('./routes/sections.js')

// Nếu savecvinfo.ts dùng export default thì vẫn import như cũ
import profileRouter from './routes/savecvinfo.ts'

// Load biến môi trường từ .env
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

// 📌 Gắn các route
app.use('/api/chat', chatRouter)
app.use('/api/tips', tipsRouter)
app.use('/api/sections', sectionsRouter)
app.use('/', profileRouter) // chỉ nên giữ lại nếu bạn thực sự cần

app.listen(PORT, () => {
	console.log(`✅ Server is running at http://localhost:${PORT}`)
})