import React, { useEffect, useState } from 'react'
import customAxios from '../utils/customAxios'

const Registrations = () => {
	const [registrations, setRegistrations] = useState(null)

	const fetchRegistrations = async () => {
		try {
			const result = await customAxios('/registrations', 'GET', null, true, {
				showLoader: true,
				showToast: false
			})
			setRegistrations(result.data)
		} catch (error) {
			// error
		}
	}

	useEffect(() => {
		fetchRegistrations()
	}, [])

	return (
		registrations && (
			<div className='container mx-auto p-4'>
				{/* <h1 className='text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#7DF9FF] via-[#FF007F] to-[#39FF14]'>
				Registered Events
			</h1> */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{registrations.map((registration) => (
						<div
							key={registration._id}
							className='bg-base-300 p-4 rounded-lg shadow-lg neon-glow'
						>
							<img
								src={registration.eventId.photoUrl}
								alt={registration.eventId.name}
								className='w-full h-48 object-cover rounded-t-lg'
							/>
							<div className='p-4'>
								<h2 className='text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#7DF9FF] via-[#FF007F] to-[#39FF14] mb-2'>
									{registration.eventId.name}
								</h2>
								<p className='text-center text-sm text-[#00CED1] mb-4'>
									{registration.eventId.date} | {registration.eventId.location}
								</p>
								<p className='text-center text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#7DF9FF] to-[#FF007F]'>
									Category: {registration.eventId.category}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	)
}

export default Registrations
