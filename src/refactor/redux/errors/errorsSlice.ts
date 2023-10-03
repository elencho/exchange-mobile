import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ErrorsState {
	generalError: string | null
	requestName: string | null
}

const initialState: ErrorsState = {
	generalError: null,
	requestName: null,
}

const errorsSlice = createSlice({
	name: 'errors',
	initialState,
	reducers: {
		saveGeneralError: (state, action: PayloadAction<string | null>) => {
			state.generalError = action.payload
		},
		setRequestName: (state, action: PayloadAction<string | null>) => {
			state.requestName = action.payload
		},
	},
})

export const { saveGeneralError, setRequestName } = errorsSlice.actions
export default errorsSlice.reducer
