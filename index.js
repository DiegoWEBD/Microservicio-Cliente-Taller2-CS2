import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors(), express.json())

app.get('/', (_, res) => {
	res.status(200).json({
		message: 'Api del Microservicio del cliente.',
	})
})

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`)
})
