import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [theme, setTheme] = useState('dark')
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const dropdownRef = useRef(null)
	const popoverRef = useRef(null)

	// Load saved theme from localStorage on mount
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') || 'dark'
		setTheme(savedTheme)
		document.documentElement.setAttribute('data-theme', savedTheme)
	}, [])

	// Handle the theme change when checkbox is toggled
	const handleThemeToggle = (event) => {
		const newTheme = event.target.checked ? 'dark' : 'light'
		setTheme(newTheme)
		document.documentElement.setAttribute('data-theme', newTheme)
		localStorage.setItem('theme', newTheme)
	}

	// Handle clicks outside the dropdown and popover to close them
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsMenuOpen(false)
			}
			if (popoverRef.current && !popoverRef.current.contains(event.target)) {
				setIsPopoverOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [dropdownRef, popoverRef])

	return (
		<div className='fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md'>
			<div className='navbar bg-base-300'>
				<div className='navbar-start'>
					<div className='dropdown' ref={dropdownRef}>
						<label
							tabIndex={0}
							className='btn btn-ghost lg:hidden'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className={`h-5 w-5 ${
									isMenuOpen ? 'text-[#00ffab]' : 'text-[#ff5f5f]'
								} 
                                        neon-icon`}
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d={
										isMenuOpen
											? 'M6 18L18 6M6 6l12 12'
											: 'M4 6h16M4 12h16M4 18h16'
									}
								/>
							</svg>
						</label>
						{isMenuOpen && (
							<ul
								tabIndex={0}
								className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52'
							>
								<li>
									<Link
										to='/'
										className='neon-dropdown-item text-transparent font-bold bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] bg-clip-text hover:scale-110 transition-transform duration-300'
									>
										Events
									</Link>
								</li>
								<li>
									<Link
										to='/registrations'
										className='neon-dropdown-item text-transparent font-bold bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] bg-clip-text hover:scale-110 transition-transform duration-300'
									>
										Registrations
									</Link>
								</li>
								<li>
									<Link
										to='/controls'
										className='neon-dropdown-item text-transparent font-bold bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] bg-clip-text hover:scale-110 transition-transform duration-300'
									>
										Controls
									</Link>
								</li>
							</ul>
						)}
					</div>
					<Link
						to='/'
						className='btn btn-ghost normal-case text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-neon'
					>
						🎉EventoMagico
					</Link>
				</div>
				<div className='navbar-center hidden lg:flex'>
					<ul className='menu menu-horizontal px-1 gap-2'>
						<li>
							<Link
								to='/'
								className='text-transparent font-bold bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] bg-clip-text hover:scale-110 transition-transform duration-300'
							>
								Events
							</Link>
						</li>
						<li>
							<Link
								to='/registrations'
								className='text-transparent font-bold bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] bg-clip-text hover:scale-110 transition-transform duration-300'
							>
								Registrations
							</Link>
						</li>
						<li>
							<Link
								to='/controls'
								className='text-transparent font-bold bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] bg-clip-text hover:scale-110 transition-transform duration-300'
							>
								Controls
							</Link>
						</li>
					</ul>
				</div>
				<div className='navbar-end flex items-center gap-2'>
					<label className='grid cursor-pointer place-items-center'>
						<input
							type='checkbox'
							value='synthwave'
							className='toggle theme-controller bg-gradient-to-r from-[#00ffab] to-[#0066ff] col-span-2 col-start-1 row-start-1'
							onChange={handleThemeToggle}
							checked={theme === 'dark'}
						/>
						<svg
							className='stroke-current fill-current col-start-1 row-start-1'
							xmlns='http://www.w3.org/2000/svg'
							width='14'
							height='14'
							viewBox='0 0 24 24'
						>
							<circle cx='12' cy='12' r='5' />
							<path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
						</svg>
						<svg
							className='stroke-current fill-current col-start-2 row-start-1'
							xmlns='http://www.w3.org/2000/svg'
							width='14'
							height='14'
							viewBox='0 0 24 24'
						>
							<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
						</svg>
					</label>
					<div className='relative'>
						<button
							className='btn btn-ghost'
							onClick={() => setIsPopoverOpen(!isPopoverOpen)}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5 text-[#ff5f5f]'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M12 6V18M6 12H18'
								/>
							</svg>
						</button>
						{isPopoverOpen && (
							<div
								ref={popoverRef}
								className='absolute right-0 mt-3 w-32 p-2 bg-base-300 shadow-lg rounded-lg '
							>
								<div className='flex justify-center'>
									<button className='neon-dropdown-item text-transparent font-bold bg-gradient-to-r from-[#ff5f5f] via-[#ff0077] to-[#d1006b] bg-clip-text hover:scale-110 transition-transform duration-300'>
										Logout
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default NavBar
