import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		status: null,
		message: '',
		loading: false // Separate loading state
	},
	reducers: {
		addUser: (state, action) => {
			state.user = action.payload
		},
		removeUser: (state) => {
			state.user = null
		},
		setStatus: (state, action) => {
			const { status, message } = action.payload
			state.status = status
			state.message = message
		},
		setLoading: (state, action) => {
			state.loading = action.payload // Directly set loading to true/false
		}
	}
})

export const { addUser, removeUser, setStatus, setLoading } = userSlice.actions

export default userSlice.reducer
