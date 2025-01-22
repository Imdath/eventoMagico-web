import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../utils/functions'
import customAxios from '../utils/customAxios'

const Body = () => {
	const { status, message, loading, user } = useSelector((store) => store.user)
	const [showToast, setShowToast] = useState(false)
	const cookie = getCookie('token')
	const dispatch = useDispatch()

	console.log(user)

	const fetchUser = async () => {
		try {
			const result = await customAxios('/profile/view', 'GET', null, true, {
				showLoader: false,
				showToast: false
			})

			dispatch(addUser(result))
		} catch (error) {
			// Handle error if needed (will be shown as toast already)
		}
	}

	useEffect(() => {
		if (cookie) {
			fetchUser()
		}
	}, [])

	useEffect(() => {
		if (status === 'error' || status === 'success') {
			setShowToast(true)
			setTimeout(() => setShowToast(false), 5000) // Hide toast after 5 seconds
		}
	}, [status, message])

	return (
		<div className='flex flex-col min-h-screen'>
			<NavBar />
			<div className='flex-1 pt-10 m-5 flex flex-col gap-2 mt-10 items-center'>
				<Outlet />
			</div>
			<Footer />
			{showToast && (
				<div className='toast toast-end z-50 mb-12'>
					{status === 'error' && (
						<div className='alert alert-error bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] text-white'>
							<span>{message}</span>
						</div>
					)}
					{status === 'success' && (
						<div className='alert alert-success bg-gradient-to-r from-[#00ffab] to-[#00d4ff] text-black'>
							<span>{message}</span>
						</div>
					)}
				</div>
			)}
			{loading && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
					<div className='flex space-x-2'>
						<div className='bg-gradient-to-r from-[#00ffab] to-[#00d4ff] h-4 w-4 rounded-full animate-bounce'></div>
						<div className='bg-gradient-to-r from-[#ff0077] to-[#d1006b] h-4 w-4 rounded-full animate-bounce'></div>
						<div className='bg-gradient-to-r from-[#ff5f5f] to-[#ff0077] h-4 w-4 rounded-full animate-bounce'></div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Body
