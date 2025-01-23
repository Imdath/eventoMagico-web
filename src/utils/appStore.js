import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import eventsReducer from './eventsSlice'

const appStore = configureStore({
	reducer: {
		user: userReducer,
		events: eventsReducer
	}
})

export default appStore
