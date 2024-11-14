import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors(), express.json())

app.get('/', (_, res) => {
	res.status(200).json({
		message: 'Api del Microservicio del cliente.',
	})
})

app.get('/devices', (_, res) => {
	const PERSONAL_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN
	const headers = {
		Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
	}

	axios
		.post(
			'https://hosted.mender.io/api/management/v1/useradm/auth/login',
			{},
			{ headers }
		)
		.then((response) => res.status(200).json({ response }))
		.catch((error) =>
			res.status(400).json({
				error,
			})
		)
})

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`)
})
