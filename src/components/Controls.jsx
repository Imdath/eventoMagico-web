import React, { useState } from 'react'
import customAxios from '../utils/customAxios'

const Controls = () => {
	const [newEvent, setNewEvent] = useState({
		name: '',
		description: '',
		date: '',
		location: '',
		price: '',
		photoUrl: '',
		category: '',
		maxParticipants: '',
		regParticipants: ''
	})

	const [newAdmin, setNewAdmin] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		age: '',
		gender: ''
	})

	const [users] = useState([
		{ id: 1, name: 'John Doe', email: 'john.doe@example.com' },
		{ id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
	])

	const [dialogOpen, setDialogOpen] = useState(null)

	const handleInputChange = (e, setFunction) => {
		const { name, value } = e.target
		setFunction((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleCreateEvent = async () => {
		try {
			await customAxios('/event/create', 'POST', {
				...newEvent
			})
			setNewEvent({
				name: '',
				description: '',
				date: '',
				location: '',
				price: '',
				photoUrl: '',
				category: '',
				maxParticipants: '',
				regParticipants: ''
			})
			setDialogOpen(null)
		} catch (error) {
			// error
		}
	}

	const handleCreateAdmin = async () => {
		try {
			await customAxios('/admin/create', 'POST', {
				...newAdmin
			})
			setNewAdmin({
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				age: '',
				gender: ''
			})
			setDialogOpen(null)
		} catch (error) {
			// error
		}
	}

	return (
		<div className='container mx-auto p-4'>
			{/* <h2 className='text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
				Admin Controls
			</h2> */}

			<div className='flex flex-col items-center space-y-4'>
				<button
					onClick={() => setDialogOpen('createEvent')}
					className='btn bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white font-bold hover:scale-110 transition-transform duration-300'
				>
					Create an Event
				</button>
				<button
					onClick={() => setDialogOpen('createAdmin')}
					className='btn bg-gradient-to-r from-[#ff0077] via-[#ff5f5f] to-[#d1006b] text-white font-bold hover:scale-110 transition-transform duration-300'
				>
					Create an Admin
				</button>
				<button
					onClick={() => setDialogOpen('viewUsers')}
					className='btn bg-gradient-to-r from-[#00ffab] to-[#00d4ff] text-white font-bold hover:scale-110 transition-transform duration-300'
				>
					Registered Users
				</button>
			</div>

			{/* Create Event Dialog */}
			{dialogOpen === 'createEvent' && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
					<div className='bg-base-300 p-6 rounded-lg shadow-lg w-80 neon-glow max-h-[90vh]'>
						<h2 className='text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
							Create Event
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
									value={newEvent.name}
									onChange={(e) => handleInputChange(e, setNewEvent)}
									placeholder='Event Name'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Description
								</label>
								<textarea
									name='description'
									value={newEvent.description}
									onChange={(e) => handleInputChange(e, setNewEvent)}
									placeholder='Description'
									className='textarea textarea-bordered w-full'
								></textarea>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Date
								</label>
								<input
									type='date'
									name='date'
									value={newEvent.date}
									onChange={(e) => handleInputChange(e, setNewEvent)}
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Location
								</label>
								<input
									type='text'
									name='location'
									value={newEvent.location}
									onChange={(e) => handleInputChange(e, setNewEvent)}
									placeholder='Location'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Price
								</label>
								<input
									type='text'
									name='price'
									value={newEvent.price}
									onChange={(e) => handleInputChange(e, setNewEvent)}
									placeholder='Price'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Photo URL
								</label>
								<input
									type='text'
									name='photoUrl'
									value={newEvent.photoUrl}
									onChange={(e) => handleInputChange(e, setNewEvent)}
									placeholder='Photo URL'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Category
								</label>
								<input
									type='text'
									name='category'
									value={newEvent.category}
									onChange={(e) => handleInputChange(e, setNewEvent)}
									placeholder='Category'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Max Participants
								</label>
								<input
									type='text'
									name='maxParticipants'
									value={newEvent.maxParticipants}
									onChange={(e) => handleInputChange(e, setNewEvent)}
									placeholder='Max Participants'
									className='input input-bordered w-full'
								/>
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Registered Participants
								</label>
								<input
									type='text'
									name='regParticipants'
									value={newEvent.regParticipants}
									onChange={(e) => handleInputChange(e, setNewEvent)}
									placeholder='Registered Participants'
									className='input input-bordered w-full'
								/>
							</form>
						</div>
						<div className='flex justify-center mt-4 gap-2'>
							<button
								type='button'
								onClick={() => {
									setDialogOpen(null)
									setNewEvent({
										name: '',
										description: '',
										date: '',
										location: '',
										price: '',
										photoUrl: '',
										category: '',
										maxParticipants: '',
										regParticipants: ''
									})
								}}
								className='btn bg-gradient-to-r from-[#00ffab] to-[#00d4ff] text-white font-bold hover:scale-110 transition-transform duration-300'
							>
								Cancel
							</button>
							<button
								type='submit'
								className='btn bg-gradient-to-r from-[#ff0077] via-[#ff5f5f] to-[#d1006b] text-white font-bold hover:scale-110 transition-transform duration-300'
								onClick={handleCreateEvent}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Create Admin Dialog */}
			{dialogOpen === 'createAdmin' && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
					<div className='bg-base-300 p-6 rounded-lg shadow-lg w-80 neon-glow max-h-[90vh]'>
						<h2 className='text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
							Create Admin
						</h2>
						<div
							className='overflow-y-auto h-[60vh] space-y-4'
							style={{ scrollbarWidth: 'none' }}
						>
							<form className='space-y-2'>
								{/* First Name */}
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									First Name
								</label>
								<input
									type='text'
									name='firstName'
									value={newAdmin.firstName}
									onChange={(e) => handleInputChange(e, setNewAdmin)}
									placeholder='First Name'
									className='input input-bordered w-full'
								/>

								{/* Last Name */}
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Last Name
								</label>
								<input
									type='text'
									name='lastName'
									value={newAdmin.lastName}
									onChange={(e) => handleInputChange(e, setNewAdmin)}
									placeholder='Last Name'
									className='input input-bordered w-full'
								/>

								{/* Email */}
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Email
								</label>
								<input
									type='email'
									name='email'
									value={newAdmin.email}
									onChange={(e) => handleInputChange(e, setNewAdmin)}
									placeholder='Email'
									className='input input-bordered w-full'
								/>

								{/* Password */}
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Password
								</label>
								<input
									type='password'
									name='password'
									value={newAdmin.password}
									onChange={(e) => handleInputChange(e, setNewAdmin)}
									placeholder='Password'
									className='input input-bordered w-full'
								/>

								{/* Age */}
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Age
								</label>
								<input
									type='text'
									name='age'
									value={newAdmin.age}
									onChange={(e) => handleInputChange(e, setNewAdmin)}
									placeholder='Age'
									className='input input-bordered w-full'
								/>

								{/* Gender */}
								<label className='block text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Gender
								</label>
								<select
									name='gender'
									value={newAdmin.gender}
									onChange={(e) => handleInputChange(e, setNewAdmin)}
									className='select select-bordered w-full'
								>
									<option value='' disabled>
										Select Gender
									</option>
									<option value='male'>Male</option>
									<option value='female'>Female</option>
									<option value='other'>Other</option>
								</select>
							</form>
						</div>
						<div className='flex justify-center mt-4 gap-2'>
							<button
								type='button'
								onClick={() => {
									setDialogOpen(null)
									setNewAdmin({
										firstName: '',
										lastName: '',
										email: '',
										password: '',
										age: '',
										gender: ''
									})
								}}
								className='btn bg-gradient-to-r from-[#00ffab] to-[#00d4ff] text-white font-bold hover:scale-110 transition-transform duration-300'
							>
								Cancel
							</button>
							<button
								type='submit'
								className='btn bg-gradient-to-r from-[#ff0077] via-[#ff5f5f] to-[#d1006b] text-white font-bold hover:scale-110 transition-transform duration-300'
								onClick={handleCreateAdmin}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}

			{/* View Users Dialog */}
			{dialogOpen === 'viewUsers' && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
					<div className='bg-base-300 p-6 rounded-lg shadow-lg w-80 neon-glow max-h-[90vh]'>
						<h2 className='text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
							Registered Users
						</h2>
						<div
							className='overflow-y-auto h-[60vh] space-y-4'
							style={{ scrollbarWidth: 'none' }}
						>
							<ul className='flex flex-col gap-2'>
								{users.map((user) => (
									<li
										key={user.id}
										className='p-4 bg-base-200 rounded-lg shadow-md'
									>
										<p className='text-lg font-bold'>{user.name}</p>
										<p className='text-sm text-gray-500'>{user.email}</p>
									</li>
								))}
							</ul>
						</div>
						<div className='flex justify-center mt-4 gap-2'>
							<button
								type='button'
								onClick={() => setDialogOpen(null)}
								className='btn bg-gradient-to-r from-[#00ffab] to-[#00d4ff] text-white font-bold hover:scale-110 transition-transform duration-300'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Controls
