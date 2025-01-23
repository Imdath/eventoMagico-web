import React, { useEffect, useState } from 'react'
import customAxios from '../utils/customAxios'
import { useDispatch, useSelector } from 'react-redux'
import { addEvents } from '../utils/eventsSlice'
import EventCard from './EventCard'
import { extractFields } from '../utils/functions'

const Events = () => {
	const dispatch = useDispatch()
	const { events } = useSelector((store) => store.events)
	const { user } = useSelector((store) => store.user)
	const [editDialogOpen, setEditDialogOpen] = useState(null)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(null)

	console.log(editDialogOpen, 'ksanjkjnkjansjkancdjnk')

	const fetchEvents = async () => {
		try {
			const result = await customAxios('/events', 'GET', null, true, {
				showLoader: true,
				showToast: false
			})
			dispatch(addEvents(result.data))
		} catch (error) {
			// error
		}
	}

	const handleDeleteEvent = async () => {
		try {
			await customAxios(`/event/${deleteDialogOpen?._id}`, 'DELETE')
			setDeleteDialogOpen(null)
			fetchEvents()
		} catch (error) {
			// error
		}
	}

	const handleEditEvent = async () => {
		try {
			const fieldsToExtract = [
				'name',
				'description',
				'date',
				'location',
				'regParticipants',
				'maxParticipants',
				'category',
				'price',
				'photoUrl'
			]
			const extractedDetails = extractFields(editDialogOpen, fieldsToExtract)
			await customAxios(`/event/${editDialogOpen?._id}`, 'PATCH', {
				...extractedDetails
			})
			setEditDialogOpen(null)
			fetchEvents()
		} catch (error) {
			// error
		}
	}

	useEffect(() => {
		if (editDialogOpen || deleteDialogOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [editDialogOpen, deleteDialogOpen])

	useEffect(() => {
		fetchEvents()
	}, [])

	return (
		<div className='container mx-auto p-4'>
			{user && events && (
				<div className='flex flex-wrap justify-center'>
					{events.map((event) => (
						<EventCard
							key={event._id}
							event={event}
							user={user}
							setEditDialogOpen={setEditDialogOpen}
							setDeleteDialogOpen={setDeleteDialogOpen}
						/>
					))}
				</div>
			)}

			{/* Edit Dialog */}
			{editDialogOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
					<div className='bg-base-300 p-6 rounded-lg shadow-lg w-80 neon-glow max-h-[90vh]'>
						<h2 className='text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
							Edit Event
						</h2>
						<div
							className='overflow-y-auto h-[60vh] space-y-4'
							style={{ scrollbarWidth: 'none' }}
						>
							<form className='space-y-2'>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Event Name
								</label>
								<input
									type='text'
									name='name'
									value={editDialogOpen.name}
									onChange={(e) =>
										setEditDialogOpen({
											...editDialogOpen,
											name: e.target.value
										})
									}
									placeholder='Event Name'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Description
								</label>
								<textarea
									name='description'
									value={editDialogOpen.description}
									onChange={(e) =>
										setEditDialogOpen({
											...editDialogOpen,
											description: e.target.value
										})
									}
									placeholder='Description'
									className='textarea textarea-bordered w-full'
								></textarea>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Date
								</label>
								<input
									type='date'
									name='date'
									value={editDialogOpen.date}
									onChange={(e) =>
										setEditDialogOpen({
											...editDialogOpen,
											date: e.target.value
										})
									}
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Location
								</label>
								<input
									type='text'
									name='location'
									value={editDialogOpen.location}
									onChange={(e) =>
										setEditDialogOpen({
											...editDialogOpen,
											location: e.target.value
										})
									}
									placeholder='Location'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Price
								</label>
								<input
									type='text'
									name='price'
									value={editDialogOpen.price}
									onChange={(e) =>
										setEditDialogOpen({
											...editDialogOpen,
											price: e.target.value
										})
									}
									placeholder='Price'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Photo URL
								</label>
								<input
									type='text'
									name='photoUrl'
									value={editDialogOpen.photoUrl}
									onChange={(e) =>
										setEditDialogOpen({
											...editDialogOpen,
											photoUrl: e.target.value
										})
									}
									placeholder='Photo URL'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Category
								</label>
								<input
									type='text'
									name='category'
									value={editDialogOpen.category}
									onChange={(e) =>
										setEditDialogOpen({
											...editDialogOpen,
											category: e.target.value
										})
									}
									placeholder='Category'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Max Participants
								</label>
								<input
									type='text'
									name='maxParticipants'
									value={editDialogOpen.maxParticipants}
									onChange={(e) =>
										setEditDialogOpen({
											...editDialogOpen,
											maxParticipants: e.target.value
										})
									}
									placeholder='Max Participants'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Registered Participants
								</label>
								<input
									type='text'
									name='regParticipants'
									value={editDialogOpen.regParticipants}
									onChange={(e) =>
										setEditDialogOpen({
											...editDialogOpen,
											regParticipants: e.target.value
										})
									}
									placeholder='Registered Participants'
									className='input input-bordered w-full'
								/>
							</form>
						</div>
						<div className='flex justify-center mt-4 gap-2'>
							<button
								onClick={() => setEditDialogOpen(null)}
								className='btn bg-gradient-to-r from-[#00ffab] to-[#00d4ff] text-white font-bold hover:scale-110 transition-transform duration-300'
							>
								Cancel
							</button>
							<button
								onClick={handleEditEvent}
								className='btn bg-gradient-to-r from-[#ff0077] via-[#ff5f5f] to-[#d1006b] text-white font-bold hover:scale-110 transition-transform duration-300'
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Delete Confirmation Dialog */}
			{deleteDialogOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
					<div className='bg-base-300 p-6 rounded-lg shadow-lg w-80 neon-glow'>
						<h2 className='text-xl font-bold mb-4 text-center'>Delete Event</h2>
						<p className='text-center'>
							Are you sure you want to delete this event?
						</p>
						<div className='flex justify-center mt-4 gap-2'>
							<button
								onClick={() => setDeleteDialogOpen(false)}
								className='btn bg-gradient-to-r from-[#00ffab] to-[#00d4ff] text-white font-bold hover:scale-110 transition-transform duration-300'
							>
								{' '}
								Cancel{' '}
							</button>{' '}
							<button
								onClick={handleDeleteEvent}
								className='btn bg-gradient-to-r from-[#ff0077] via-[#ff5f5f] to-[#d1006b] text-white font-bold hover:scale-110 transition-transform duration-300'
							>
								{' '}
								Delete{' '}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Events
