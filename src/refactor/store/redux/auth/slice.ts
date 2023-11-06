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
	resendPasswordCodeThunk,
	resetPasswordConfirmCodeThunk,
	resendOtpThunk,
	otpForLoginThunk,
	forgotPasswordStartThunk,
	startRegistrationThunk,
	registrationFormThunk,
} from '@store/redux/auth/thunks'
import KVStore from '@store/kv'

interface AuthState {
	timerVisible: boolean
	authLoading: boolean
	callbackUrl: string
	accessToken?: string
	otpType: OTP
	phoneCountryCode?: string
	pkceInfo?: PkceInfo
}

const initialState: AuthState = {
	timerVisible: false,
	authLoading: false,
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
		setTokens(
			state,
			action: PayloadAction<{ refreshToken: string; accessToken: string }>
		) {
			KVStore.set('refreshToken', action.payload.refreshToken)
			state.accessToken = action.payload.accessToken
			state.otpType = jwt_decode<TokenParams>(
				action.payload.accessToken
			)?.otpType
		},
		clearTokens: (state) => {
			KVStore.del('refreshToken')
			state.accessToken = undefined
			// TODO?: delete otpType
		},
	},
	extraReducers: (builder) => {
		login(builder)
		register(builder)
		forgotPass(builder)
		login2fa(builder)
		resetOtp(builder)

		builder.addCase(otpForLoginThunk.pending, (state) => {
			state.authLoading = true
		})
		builder.addCase(otpForLoginThunk.fulfilled, (state, action) => {
			state.authLoading = false
			state.callbackUrl = action.payload.callbackUrl
		})
		builder.addCase(otpForLoginThunk.rejected, (state) => {
			state.authLoading = false
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
	builder.addCase(resendPasswordCodeThunk.fulfilled, (state, action) => {
		state.callbackUrl = action.payload.callbackUrl
		state.timerVisible = action.payload.timerVisible
	})

	builder.addCase(resetPasswordConfirmCodeThunk.pending, (state) => {
		state.authLoading = true
	})
	builder.addCase(resetPasswordConfirmCodeThunk.fulfilled, (state, action) => {
		state.authLoading = false
		state.callbackUrl = action.payload.callbackUrl
	})
	builder.addCase(resetPasswordConfirmCodeThunk.rejected, (state) => {
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

const register = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder.addCase(startRegistrationThunk.fulfilled, (state, action) => {
		state.callbackUrl = action.payload.callbackUrl
		state.phoneCountryCode = action.payload.attributes.phoneCountry
	})

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

export const { savePkceInfo, setTimer, setTokens, clearTokens } = auth.actions
export default auth.reducer
