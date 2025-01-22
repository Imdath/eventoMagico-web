import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getCookie } from '../utils/functions'

const ProtectedRoute = ({ children }) => {
	const cookie = getCookie('token')
	const location = useLocation()

	if (!cookie) {
		if (location.pathname === '/login' || location.pathname === '/signup') {
			return children
		} else {
			return <Navigate to='/login' />
		}
	}

	if (
		cookie &&
		(location.pathname === '/login' || location.pathname === '/signup')
	) {
		return <Navigate to={'/'} />
	}

	return children
}

export default ProtectedRoute
