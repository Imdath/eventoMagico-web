import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import customAxios from '../utils/customAxios'

const EventDetails = () => {
	const [event, setEvent] = useState(null)
	const [registerDialogOpen, setRegisterDialogOpen] = useState(false)

	const { id } = useParams()

	const fetchEventDetails = async () => {
		try {
			const result = await customAxios(`/event/${id}`, 'GET', null, true, {
				showLoader: true,
				showToast: false
			})
			setEvent(result.data)
		} catch (error) {
			// error
		}
	}

	const handleRegister = async () => {
		try {
			await customAxios(`/event/register/${event?._id}`, 'POST', null)
			setRegisterDialogOpen(false)
		} catch (error) {
			// error
		} finally {
			setRegisterDialogOpen(false)
		}
	}

	useEffect(() => {
		fetchEventDetails()
	}, [])

	useEffect(() => {
		if (registerDialogOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [registerDialogOpen])

	return (
		<>
			{event && (
				<div className='max-w-md mx-auto bg-base-300 p-6 rounded-lg shadow-lg neon-glow mt-6'>
					<img
						src={event.photoUrl}
						alt={event.name}
						className='w-full h-64 object-cover rounded-t-lg'
					/>
					<h2 className='text-2xl font-bold mt-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
						{event.name}
					</h2>
					<p className='text-center text-sm text-gray-500 mt-2 mb-6'>
						{event.date} | {event.location}
					</p>
					<p className='text-base text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] via-blue-500 to-purple-600 mb-4'>
						{event.description}
					</p>
					<div className='flex flex-col space-y-2'>
						<p className='text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-[#DAA520]'>
							Price: ${event.price}
						</p>
						<p className='text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500'>
							Category: {event.category}
						</p>
						<p className='text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-500 to-blue-600'>
							Registered Participants: {event.regParticipants}
						</p>
						<p className='text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-red-600'>
							Max Participants: {event.maxParticipants}
						</p>
					</div>
					<div className='flex justify-center mt-6'>
						<button
							onClick={() => setRegisterDialogOpen(true)}
							className='btn bg-gradient-to-r from-[#00ffab] to-[#00d4ff] text-white font-bold hover:scale-110 transition-transform duration-300'
						>
							Register Now
						</button>
					</div>
				</div>
			)}

			{registerDialogOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
					<div className='bg-base-300 p-6 rounded-lg shadow-lg w-80 neon-glow'>
						<h2 className='text-xl font-bold mb-4 text-center'>
							Register for Event
						</h2>
						<p className='text-center'>
							Are you sure you want to register for this event?
						</p>
						<div className='flex justify-center mt-4 gap-2'>
							<button
								onClick={() => setRegisterDialogOpen(false)}
								className='btn bg-gradient-to-r from-[#00ffab] to-[#00d4ff] text-white font-bold hover:scale-110 transition-transform duration-300'
							>
								Cancel
							</button>
							<button
								onClick={handleRegister}
								className='btn bg-gradient-to-r from-[#ff0077] via-[#ff5f5f] to-[#d1006b] text-white font-bold hover:scale-110 transition-transform duration-300'
							>
								Register
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default EventDetails
