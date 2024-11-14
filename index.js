import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const PORT = process.env.PORT || 3001

const app = express()

app.use(cors(), express.json())

app.get('/', (_, res) => {
	res.status(200).json({
		message: 'Api del Microservicio del cliente.',
	})
})

app.get('/devices', (_, res) => {
	const JSON_WEB_TOKEN = process.env.JSON_WEB_TOKEN
	const headers = {
		Authorization: `Bearer ${JSON_WEB_TOKEN}`,
	}

	axios
		.get(
			'https://hosted.mender.io/api/management/v1/useradm/users/me',
			{headers}
		)
		.then((response) => response.data)
		.then(data => res.status(200).json(data))
		.catch((error) =>{
			console.log(error)
			res.status(400).json({
				error,
			})}
		)
})

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`)
})
