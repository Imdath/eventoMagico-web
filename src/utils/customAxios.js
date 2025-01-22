import store from './appStore'
import axios from 'axios'
import { setStatus, setLoading } from './userSlice'
import { BASE_URL } from './constants'

const customAxios = async (
	url,
	method = 'GET',
	body = null,
	withCredentials = true,
	{ showLoader = true, showToast = true } = {} // Optional config object
) => {
	try {
		// Conditionally show loader
		if (showLoader) {
			store.dispatch(setLoading(true))
		}

		const config = {
			method,
			url: `${BASE_URL}${url}`,
			data: body,
			withCredentials
		}

		const response = await axios(config)

		// Conditionally show success toast
		if (showToast) {
			store.dispatch(
				setStatus({
					status: 'success',
					message: response.data.message || 'Operation successful'
				})
			)
		}

		return response.data
	} catch (error) {
		// Conditionally show error toast
		if (showToast) {
			store.dispatch(
				setStatus({
					status: 'error',
					message: error.response?.data?.message || 'An error occurred'
				})
			)
		}
		throw error
	} finally {
		// Conditionally hide loader
		if (showLoader) {
			store.dispatch(setLoading(false))
		}

		// Conditionally reset status after toast display duration
		if (showToast) {
			setTimeout(() => {
				store.dispatch(
					setStatus({
						status: null,
						message: ''
					})
				)
			}, 5000) // Match toast duration
		}
	}
}

export default customAxios
