export const sendDataToNginx = async (data) => {
	const response = await axios.post('http://0trust.com/api', data)

	return response.data
}
