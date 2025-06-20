import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.post('/save-profile', (req, res) => {
	const data = req.body
	console.log('POST /api/save-profile received')

	const dbPath = path.resolve(__dirname, '../../../db/profile.json')
	fs.writeFile(dbPath, JSON.stringify(data, null, 2), (err) => {
		if (err) {
			console.error('Error while writing data:', err)
			return res.status(500).json({ message: 'Error while writing data' })
		}
		console.log('Saved to profile.json')
		res.status(200).json({ message: 'Success!' })
	})
})

export default router
