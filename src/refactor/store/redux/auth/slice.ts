import {
	ActionReducerMapBuilder,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import {
	startLoginThunk,
	usernameAndPaswordThunk,
	resetOtpThunk,
	resetPasswordThunk,
	resetPasswordOtpThunk,
	resendOtpThunk,
	otpForLoginThunk,
	forgotPasswordStartThunk,
	startRegistrationThunk,
	fetchCountriesThunk,
	registrationFormThunk,
} from '@store/redux/auth/thunks'

interface AuthState {
	timerVisible: boolean
	authLoading: boolean
	callbackUrl: string
	otpType: OTP
	countries: Country[]
	phoneCountryCode?: string
	pkceInfo?: PkceInfo
}

const initialState: AuthState = {
	timerVisible: false,
	authLoading: false,
	countries: [],
	callbackUrl: '',
	otpType: 'EMAIL',
}

const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		savePkceInfo: (state, action: PayloadAction<PkceInfo>) => {
			state.pkceInfo = action.payload
		},
		resetAuthState: (state) => {
			state = {
				...state,
				timerVisible: false,
				authLoading: false,
			}
		},
		setOtpType: (state, action: PayloadAction<OTP>) => {
			state.otpType = action.payload
		},
	},
	extraReducers: (builder) => {
		startLogin(builder)
		usernameAndPassword(builder)
		resetOtp(builder)
		registerStart(builder)
		registerForm(builder)
		countries(builder)

		builder.addCase(forgotPasswordStartThunk.fulfilled, (state, action) => {
			state.callbackUrl = action.payload.callbackUrl
		})
		builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
			state.timerVisible = true
			state.callbackUrl = action.payload.callbackUrl
		})

		builder.addCase(otpForLoginThunk.pending, (state) => {
			state.authLoading = true
		})
		builder.addCase(otpForLoginThunk.fulfilled, (state, action) => {
			state.authLoading = false
			state.callbackUrl = action.payload.callbackUrl
		})

		builder.addCase(resendOtpThunk.pending, (state) => {
			state.authLoading = true
		})
		builder.addCase(resendOtpThunk.fulfilled, (state, action) => {
			state.callbackUrl = action.payload.callbackUrl
			state.authLoading = false
		})

		builder.addCase(resetPasswordOtpThunk.fulfilled, (state, action) => {
			state.callbackUrl = action.payload.callbackUrl
		})
	},
})

const startLogin = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder.addCase(startLoginThunk.fulfilled, (state, action) => {
		state.callbackUrl = action.payload.callbackUrl
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

const registerStart = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder
		.addCase(startRegistrationThunk.pending, (state) => {
			state.authLoading = true
		})
		.addCase(startRegistrationThunk.fulfilled, (state, action) => {
			state.authLoading = false
			state.callbackUrl = action.payload.callbackUrl
			state.phoneCountryCode = action.payload.attributes.phoneCountry
		})
		.addCase(startRegistrationThunk.rejected, (state) => {
			state.authLoading = false
		})
}

const registerForm = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder
		.addCase(registrationFormThunk.pending, (state) => {
			state.authLoading = true
		})
		.addCase(registrationFormThunk.fulfilled, (state, action) => {
			state.authLoading = false
			state.callbackUrl = action.payload.callbackUrl
		})
		.addCase(registrationFormThunk.rejected, (state) => {
			state.authLoading = false
		})
}

const countries = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder.addCase(fetchCountriesThunk.fulfilled, (state, action) => {
		state.countries = action.payload
	})
}

export const { savePkceInfo, resetAuthState, setOtpType } = auth.actions
export default auth.reducer
