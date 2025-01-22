export function getCookie(name) {
	const value = document.cookie
		.split('; ')
		.find((row) => row.startsWith(name + '='))
		?.split('=')[1]
	return value || null // Returns null if cookie doesn't exist
}
