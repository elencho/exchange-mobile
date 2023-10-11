// src/redux/errorsSlice.ts
import {
	ActionReducerMapBuilder,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import {
	resetOtpThunk,
	startLoginThunk,
	usernameAndPaswordThunk,
} from './thunks'

interface AuthState {
	timerVisible: boolean
	authLoading: boolean
	pkceInfo?: PkceInfo
	callbackUrl: string
	otpType: OTP

	// TODO: add other state values
}

const initialState: AuthState = {
	timerVisible: false,
	authLoading: false,
	callbackUrl: '',
	otpType: 'EMAIL',
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

const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		savePkceInfo: (state, action: PayloadAction<PkceInfo>) => {
			state.pkceInfo = action.payload
		},
		resetAuthState: (state) => {
			state = initialState
		},
	},
	extraReducers: (builder) => {
		startLogin(builder)
		usernameAndPassword(builder)
		resetOtp(builder)
	},
})

const startLogin = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder
		.addCase(startLoginThunk.pending, (state) => {
			state.authLoading = true
		})
		.addCase(startLoginThunk.fulfilled, (state, action) => {
			state.authLoading = false
			state.callbackUrl = action.payload.callbackUrl
		})
		.addCase(startLoginThunk.rejected, (state) => {
			state.authLoading = false
		})
}

const usernameAndPassword = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder
		.addCase(usernameAndPaswordThunk.pending, (state) => {
			state.authLoading = true
		})
		.addCase(usernameAndPaswordThunk.fulfilled, (state, action) => {
			state.authLoading = false
			state.callbackUrl = action.payload.callbackUrl
			state.otpType = action.payload.attributes.otpType
		})
		.addCase(usernameAndPaswordThunk.rejected, (state) => {
			state.authLoading = false
		})
}

const resetOtp = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder
		.addCase(resetOtpThunk.pending, (state) => {
			state.authLoading = true
		})
		.addCase(resetOtpThunk.fulfilled, (state, action) => {
			state.authLoading = false
			state.callbackUrl = action.payload.callbackUrl
		})
		.addCase(resetOtpThunk.rejected, (state) => {
			state.authLoading = false
		})
}

export const { savePkceInfo, resetAuthState } = auth.actions
export default auth.reducer
