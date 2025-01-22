import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Events from './components/Events'
import Registrations from './components/Registrations'
import Controls from './components/Controls'
import SignUp from './components/SignUp'

const App = () => {
	return (
		<BrowserRouter basename='/'>
			<Routes>
				<Route path='/' element={<Body />}>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/' element={<Events />} />
					<Route path='/registrations' element={<Registrations />} />
					<Route path='/controls' element={<Controls />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
