import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import profileRouter from './routes/savecvinfo.ts'

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())

app.use('/', profileRouter)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
