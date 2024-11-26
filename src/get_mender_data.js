import axios from 'axios'

export const getMenderData = async () => {
	const headers = {
		Authorization: `Bearer ${process.env.JSON_WEB_TOKEN}`,
	}

	const response = await axios.get(
		'https://hosted.mender.io/api/management/v1/inventory/devices',
		{
			headers,
		}
	)

	return response.data
}
