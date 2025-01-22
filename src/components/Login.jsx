import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from '../utils/userSlice'
import customAxios from '../utils/customAxios'
import { useDispatch } from 'react-redux'

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [loginForm, setLoginForm] = useState({
		email: 'imdath@mailinator.com',
		password: 'Imdath@123'
	})

	const handleLoginForm = (name, value) => {
		setLoginForm((prev) => ({ ...prev, [name]: value }))
	}

	const handleOnLogin = async () => {
		try {
			const result = await customAxios('/login', 'POST', {
				email: loginForm.email,
				password: loginForm.password
			})

			// Dispatch user data to the Redux store
			dispatch(addUser(result.data))

			// Navigate to home page after successful login
			navigate('/')
		} catch (error) {
			// Error will be handled inside customAxios, but you can also do something here
		}
	}

	return (
		<div className='flex justify-center m-4'>
			<div className='card bg-base-300 w-80 shadow-xl'>
				<div className='card-body'>
					<h2 className='card-title justify-center text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
						Login
					</h2>
					<div>
						<label className='form-control w-full max-w-xs'>
							<div className='label'>
								<span className='label-text text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b]'>
									Email ID
								</span>
							</div>
							<input
								type='text'
								placeholder='Enter Email ID'
								className='input input-bordered w-full max-w-xs'
								value={loginForm.email}
								onChange={(e) => handleLoginForm('email', e.target.value)}
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
								value={loginForm.password}
								onChange={(e) => handleLoginForm('password', e.target.value)}
							/>
						</label>
					</div>
					<div className='card-actions justify-center mt-3'>
						<button
							className='btn bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] hover:scale-105 transition-transform duration-300 text-white font-bold outline-none border-none'
							onClick={handleOnLogin}
						>
							Sign In
						</button>
					</div>
					<div className='text-center mt-4'>
						<p className='text-base-content'>
							New User?{' '}
							<Link
								to='/signup'
								className='font-medium text-[#ff0077] hover:text-[#ff5f5f]'
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
