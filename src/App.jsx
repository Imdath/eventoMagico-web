import appStore from './utils/appStore'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Events from './components/Events'
import Registrations from './components/Registrations'
import Controls from './components/Controls'
import SignUp from './components/SignUp'
import { Provider } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
	return (
		<Provider store={appStore}>
			<BrowserRouter basename='/'>
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedRoute>
								<Body />
							</ProtectedRoute>
						}
					>
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/' element={<Events />} />
						<Route path='/registrations' element={<Registrations />} />
						<Route path='/controls' element={<Controls />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	)
}

export default App
