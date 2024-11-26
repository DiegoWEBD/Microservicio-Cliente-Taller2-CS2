import axios from 'axios'

export const authenticateToWso2 = async (username, password) => {
	const response = await axios.post('http://192.168.1.83:3002/auth', {
		username,
		password,
	})

	return response.data
}
