import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<NavBar />
			<div className='flex-1 pt-10 m-5 flex flex-col gap-2 mt-10 items-center'>
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}

export default Body
