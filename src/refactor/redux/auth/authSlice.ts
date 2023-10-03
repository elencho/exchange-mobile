// src/redux/errorsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { startLogin } from './authThunks'

interface AuthState {
	timerVisible: boolean
	authLoading: boolean
	pkceInfo: {} | PkceInfo
	loginStartInfo: LoginStart | {}

	// TODO: add other state values
}

const initialState: AuthState = {
	timerVisible: false,
	authLoading: false,
	pkceInfo: {},
	loginStartInfo: {},
	// credentials: {},
	// userAndPassInfo: {},
	// forgotPassInfo: {
	// 	username: '',
	// 	code: '',
	// },
	// forgotPassMode: false,
	// Personal_Company: 'Personal',
	// registrationStartInfo: {},
	// registrationInputs: {
	// 	// firstName: 'dd',
	// 	// lastName: 'dd',
	// 	// email: 'aa1761@mailinator.com',
	// 	// passwordNew: '11111!Aa',
	// 	// passwordConfirm: '11111!Aa',
	// 	// phoneCountry: 'GEO',
	// 	// phoneNumber: '995567761',
	// 	// promoCode: '',
	// 	// referralCode: '',
	// 	// acceptTerms: 'on',
	// },
	// verificationInfo: {},
}

const authSlice = createSlice({
	name: 'errors',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(startLogin.pending, (state) => {
				state.authLoading = true
			})
			.addCase(startLogin.fulfilled, (state, action) => {
				state.authLoading = false
				state.loginStartInfo = action.payload
			})
			.addCase(startLogin.rejected, (state) => {
				state.authLoading = false
			})
	},
})

// export const { saveGeneralError, setRequestName } = authSlice.actions
export default authSlice.reducer
