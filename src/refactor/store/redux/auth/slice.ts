import { TokenParams } from '@app/refactor/types/auth/splash'
import jwt_decode from 'jwt-decode'

import {
	ActionReducerMapBuilder,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import {
	startLoginThunk,
	usernameAndPaswordThunk,
	resetOtpThunk,
	resetPasswordStartThunk,
	resetPasswordOtpThunk,
	resendOtpThunk,
	otpForLoginThunk,
	forgotPasswordStartThunk,
	startRegistrationThunk,
	fetchCountriesThunk,
	registrationFormThunk,
} from '@store/redux/auth/thunks'
import KVStore from '@store/kv'

interface AuthState {
	timerVisible: boolean
	authLoading: boolean
	callbackUrl: string
	accessToken?: string
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
		setTimer: (state, action: PayloadAction<boolean>) => {
			state.timerVisible = action.payload
		},
		setOtpType: (state, action: PayloadAction<OTP>) => {
			state.otpType = action.payload
		},
		setTokens(
			state,
			action: PayloadAction<{ refreshToken: string; accessToken: string }>
		) {
			KVStore.set('refreshToken', action.payload.refreshToken)
			state.accessToken = action.payload.accessToken
			state.otpType = jwt_decode<TokenParams>(action.payload.accessToken)
				?.otpType
		},
	},
	extraReducers: (builder) => {
		login(builder)
		forgotPass(builder)
		login2fa(builder)
		resetOtp(builder)

		registerStart(builder)
		registerForm(builder)
		countries(builder)

		builder.addCase(otpForLoginThunk.pending, (state) => {
			state.authLoading = true
		})
		builder.addCase(otpForLoginThunk.fulfilled, (state, action) => {
			state.authLoading = false
			state.callbackUrl = action.payload.callbackUrl
		})
	},
})

const login = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder.addCase(startLoginThunk.fulfilled, (state, action) => {
		state.callbackUrl = action.payload.callbackUrl
	})

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

const forgotPass = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder.addCase(forgotPasswordStartThunk.fulfilled, (state, action) => {
		state.callbackUrl = action.payload.callbackUrl
	})

	builder.addCase(resetPasswordStartThunk.pending, (state) => {
		state.authLoading = true
	})
	builder.addCase(resetPasswordStartThunk.fulfilled, (state, action) => {
		state.authLoading = false
		state.callbackUrl = action.payload.callbackUrl
		state.timerVisible = action.payload.timerVisible
	})
	builder.addCase(resetPasswordStartThunk.rejected, (state) => {
		state.authLoading = false
	})

	builder.addCase(resetPasswordOtpThunk.pending, (state) => {
		state.authLoading = true
	})
	builder.addCase(resetPasswordOtpThunk.fulfilled, (state, action) => {
		state.authLoading = false
		state.callbackUrl = action.payload.callbackUrl
	})
	builder.addCase(resetPasswordOtpThunk.rejected, (state) => {
		state.authLoading = false
	})
}

const login2fa = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder.addCase(resendOtpThunk.pending, (state) => {
		state.authLoading = true
	})
	builder.addCase(resendOtpThunk.fulfilled, (state, action) => {
		state.authLoading = false
		state.callbackUrl = action.payload.callbackUrl
		state.timerVisible = true
	})
	builder.addCase(resendOtpThunk.rejected, (state) => {
		state.authLoading = false
		state.timerVisible = true
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

export const { savePkceInfo, setOtpType, setTimer, setTokens } = auth.actions
export default auth.reducer
