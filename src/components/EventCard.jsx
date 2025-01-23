import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ event, user, setEditDialogOpen, setDeleteDialogOpen }) => {
	const handleEditClick = () => {
		setEditDialogOpen(event)
	}

	const handleDeleteClick = () => {
		setDeleteDialogOpen(event)
	}

	return (
		<div className='max-w-xs w-64 bg-base-300 m-4 p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 flex flex-col justify-between'>
			<div>
				<img
					src={event.photoUrl}
					alt={event.name}
					className='w-full h-32 object-cover rounded-t-lg'
				/>
				<h2 className='text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 my-2 h-12'>
					{event.name}
				</h2>
				<p className='text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#008b8b] to-[#b8860b]'>
					Price: ${event.price}
				</p>
			</div>
			<div className='mt-4 flex flex-col items-center'>
				<Link
					to={`/event/${event._id}`}
					className='btn bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] text-white font-bold hover:scale-110 transition-transform duration-300 mb-2'
				>
					More Details
				</Link>
				{user.role === 'admin' && (
					<div className='flex justify-between gap-2 w-full'>
						<button
							onClick={handleEditClick}
							className='btn flex-1 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-bold hover:scale-110 transition-transform duration-300'
						>
							Edit
						</button>
						<button
							onClick={handleDeleteClick}
							className='btn flex-1 bg-gradient-to-r from-[#00ffab] to-[#00d4ff] text-white font-bold hover:scale-110 transition-transform duration-300'
						>
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default EventCard
