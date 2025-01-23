import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import customAxios from '../utils/customAxios'

const SignUp = () => {
	const [signUpForm, setSignUpForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		age: '',
		gender: 'male'
	})
	const navigate = useNavigate()

	const handleSignUpForm = (name, value) => {
		setSignUpForm((prev) => ({ ...prev, [name]: value }))
	}

	const handleOnSignUp = async () => {
		// Add signup logic here
		try {
			await customAxios('/signup', 'POST', {
				...signUpForm
			})
			setSignUpForm({
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				age: '',
				gender: 'male'
			})
			navigate('/login')
		} catch (error) {
			// error
		}
	}

	return (
		<div className='flex justify-center m-4'>
			<div className='card bg-base-300 w-80 shadow-xl'>
				<div className='card-body'>
					<h2 className='card-title justify-center text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
						Sign Up
					</h2>
					<div>
						<label className='form-control w-full max-w-xs'>
							<div className='label'>
								<span className='label-text text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									First Name
								</span>
							</div>
							<input
								type='text'
								placeholder='Enter First Name'
								className='input input-bordered w-full max-w-xs'
								value={signUpForm.firstName}
								onChange={(e) => handleSignUpForm('firstName', e.target.value)}
							/>
						</label>
						<label className='form-control w-full max-w-xs mt-2'>
							<div className='label'>
								<span className='label-text text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Last Name
								</span>
							</div>
							<input
								type='text'
								placeholder='Enter Last Name'
								className='input input-bordered w-full max-w-xs'
								value={signUpForm.lastName}
								onChange={(e) => handleSignUpForm('lastName', e.target.value)}
							/>
						</label>
						<label className='form-control w-full max-w-xs mt-2'>
							<div className='label'>
								<span className='label-text text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Email
								</span>
							</div>
							<input
								type='email'
								placeholder='Enter Email'
								className='input input-bordered w-full max-w-xs'
								value={signUpForm.email}
								onChange={(e) => handleSignUpForm('email', e.target.value)}
							/>
						</label>
						<label className='form-control w-full max-w-xs mt-2'>
							<div className='label'>
								<span className='label-text text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Password
								</span>
							</div>
							<input
								type='password'
								placeholder='Enter Password'
								className='input input-bordered w-full max-w-xs'
								value={signUpForm.password}
								onChange={(e) => handleSignUpForm('password', e.target.value)}
							/>
						</label>
						<label className='form-control w-full max-w-xs mt-2'>
							<div className='label'>
								<span className='label-text text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Age
								</span>
							</div>
							<input
								type='text'
								placeholder='Enter Age'
								className='input input-bordered w-full max-w-xs'
								value={signUpForm.age}
								onChange={(e) => handleSignUpForm('age', e.target.value)}
							/>
						</label>
						<label className='form-control w-full max-w-xs mt-2'>
							<div className='label'>
								<span className='label-text text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Gender
								</span>
							</div>
							<select
								className='select select-bordered w-full max-w-xs'
								value={signUpForm.gender}
								onChange={(e) => handleSignUpForm('gender', e.target.value)}
							>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
								<option value='other'>Other</option>
							</select>
						</label>
					</div>
					<div className='card-actions justify-center mt-3'>
						<button
							className='btn bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] hover:scale-105 transition-transform duration-300 text-white font-bold outline-none border-none'
							onClick={handleOnSignUp}
						>
							Sign Up
						</button>
					</div>
					<div className='text-center mt-4'>
						<p className='text-base-content'>
							Already have an account?{' '}
							<Link
								to='/login'
								className='font-medium text-[#ff0077] hover:text-[#ff5f5f]'
							>
								Log in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUp
