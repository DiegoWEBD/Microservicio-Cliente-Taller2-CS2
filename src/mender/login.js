import axios from 'axios'

export const loginMender = async () => {
	const response = await axios.post(
		'https://hosted.mender.io/api/management/v1/useradm/auth/login',
		{ username: 'diegomz.webdev@gmail.com', password: 'cX970htvSk' },
		{ headers: { Authorization: '' } }
	)

	return response
}
