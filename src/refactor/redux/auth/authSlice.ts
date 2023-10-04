// src/redux/errorsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { startLogin, usernameAndPaswordThunk } from './authThunks'

interface AuthState {
	timerVisible: boolean
	authLoading: boolean
	pkceInfo: {} | PkceInfo
	loginStartInfo: LoginStart
	userAndPassInfo: {}
	credentials: Credentials

	// TODO: add other state values
}

const initialState: AuthState = {
	timerVisible: false,
	authLoading: false,
	pkceInfo: {},
	loginStartInfo: {
		attributes: undefined,
		callbackUrl: '',
		errors: [],
		execution: '',
	},
	credentials: {
		login: '',
		password: '',
	},
	userAndPassInfo: {},
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
	name: 'auth',
	initialState,
	reducers: {
		savePkceInfo: (state, action: PayloadAction<PkceInfo | {}>) => {
			state.pkceInfo = action.payload
		},
		setCredentials: (state, action: PayloadAction<Credentials>) => {
			state.credentials = action.payload
		},
	},
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

			.addCase(usernameAndPaswordThunk.pending, (state) => {
				state.authLoading = true
			})
			.addCase(usernameAndPaswordThunk.fulfilled, (state, action) => {
				state.authLoading = false
				state.userAndPassInfo = action.payload
			})
			.addCase(usernameAndPaswordThunk.rejected, (state) => {
				state.authLoading = false
			})
	},
})

export const { savePkceInfo, setCredentials } = authSlice.actions
export default authSlice.reducer
