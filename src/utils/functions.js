export function getCookie(name) {
	const value = document.cookie
		.split('; ')
		.find((row) => row.startsWith(name + '='))
		?.split('=')[1]
	return value || null // Returns null if cookie doesn't exist
}

export const extractFields = (obj, fields) => {
	return fields.reduce((acc, field) => {
		if (obj[field]) {
			acc[field] = obj[field]
		}
		return acc
	}, {})
}
