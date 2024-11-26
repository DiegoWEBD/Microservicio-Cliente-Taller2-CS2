import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { authenticateToWso2 } from './wso2_auth'
import { getMenderData } from './get_mender_data'
import { sendDataToNginx } from './send_data_to_nginx'

dotenv.config()
const PORT = process.env.PORT || 3001

const app = express()

app.use(cors(), express.json())

app.get('/', (_, res) => {
	//loginMender().then(console.log).then(console.error)

	res.status(200).json({
		message: 'Api del Microservicio del cliente.',
	})
})

app.get('/personal_info', (_, res) => {
	const JSON_WEB_TOKEN = process.env.JSON_WEB_TOKEN
	const menderHeaders = {
		Authorization: `Bearer ${JSON_WEB_TOKEN}`,
	}

	axios
		.get('https://hosted.mender.io/api/management/v1/useradm/users/me', {
			menderHeaders,
		})
		.then((response) => response.data)
		.then((data) => res.status(200).json(data))
		.catch((error) => {
			console.log(error)
			res.status(400).json({
				error,
			})
		})
})

app.get('/devices', (_, res) => {
	const menderHeaders = {
		Authorization: `Bearer ${process.env.JSON_WEB_TOKEN}`,
	}

	axios
		.get('https://hosted.mender.io/api/management/v1/inventory/devices', {
			headers: menderHeaders,
		})
		.then((response) => response.data)
		.then((data) => {
			axios.post('http://192.168.1.6:3001/auth', data)
		})
		.then(console.log)
		.catch((error) => {
			console.log(error)
			res.status(400).json({
				error,
			})
		})
})

app.post('/auth', async (req, res) => {
	const responseData = {
		mender_data: undefined,
		wso2_data: undefined,
	}

	authenticateToWso2(req.body.username, req.body.password)
		.then((data) => {
			responseData.wso2_data = data
			getMenderData()
		})
		.then((data) => {
			responseData.mender_data = data
			sendDataToNginx(responseData)
		})
		.catch((error) =>
			res.status(error.code || 400).json({
				message: 'Error al recuperar el recurso',
				error,
			})
		)
})

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`)
})
