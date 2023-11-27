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
	setNewPasswordOtpThunk,
	verifyRegistrationThunk,
} from '@store/redux/auth/thunks'
import SecureKV from '@store/kv/secure'

interface AuthState {
	timerVisible: boolean
	authLoading: boolean
	forgotResendLoading: boolean //TODO: Remove
	callbackUrl: string
	accessToken?: string
	otpType: OTP
	phoneCountryCode?: string
	pkceInfo?: PkceInfo
}

const initialState: AuthState = {
	timerVisible: false,
	forgotResendLoading: false,
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
		setAuthLoading: (state, action: PayloadAction<boolean>) => {
			state.authLoading = action.payload
		},
		setTokens(
			state,
			action: PayloadAction<{ refreshToken: string; accessToken: string }>
		) {
			SecureKV.set('refreshToken', action.payload.refreshToken)
			state.accessToken = action.payload.accessToken
			state.otpType = jwt_decode<TokenParams>(action.payload.accessToken)
				?.otpType
		},
		resetAuth: (state) => {
			state = initialState
			SecureKV.del('refreshToken')
		},
	},
	extraReducers: (builder) => {
		login(builder)
		register(builder)
		forgotPass(builder)
		setPass(builder)
		login2fa(builder)
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

	builder.addCase(resendPasswordCodeThunk.pending, (state) => {
		state.forgotResendLoading = true
	})
	builder.addCase(resendPasswordCodeThunk.fulfilled, (state, action) => {
		state.forgotResendLoading = false
		state.callbackUrl = action.payload.callbackUrl
		state.timerVisible = action.payload.timerVisible
	})
	builder.addCase(resendPasswordCodeThunk.rejected, (state) => {
		state.forgotResendLoading = false
	})

	builder.addCase(resetPasswordConfirmCodeThunk.pending, (state) => {
		state.authLoading = true
	})
	builder.addCase(resetPasswordConfirmCodeThunk.fulfilled, (state, action) => {
		state.authLoading = false
		state.callbackUrl = action.payload.callbackUrl
		state.otpType = action.payload.attributes.otpType
	})
	builder.addCase(resetPasswordConfirmCodeThunk.rejected, (state) => {
		state.authLoading = false
	})
}

const setPass = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder.addCase(setNewPasswordOtpThunk.pending, (state) => {
		state.authLoading = true
	})
	builder.addCase(setNewPasswordOtpThunk.fulfilled, (state) => {
		state.authLoading = false
	})
	builder.addCase(setNewPasswordOtpThunk.rejected, (state) => {
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
		state.timerVisible = false
	})

	builder.addCase(otpForLoginThunk.pending, (state) => {
		state.authLoading = true
	})
	builder.addCase(otpForLoginThunk.fulfilled, (state, action) => {
		if (action.payload?.callbackUrl) {
			state.callbackUrl = action.payload.callbackUrl
		}
		state.authLoading = false
	})
	builder.addCase(otpForLoginThunk.rejected, (state) => {
		state.authLoading = false
	})

	builder.addCase(resetOtpThunk.fulfilled, (state, action) => {
		state.callbackUrl = action.payload.callbackUrl
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

	builder
		.addCase(verifyRegistrationThunk.pending, (state) => {
			state.authLoading = true
		})
		.addCase(verifyRegistrationThunk.rejected, (state) => {
			state.authLoading = false
		})
}

export const { savePkceInfo, setTimer, setTokens, setAuthLoading, resetAuth } =
	auth.actions
export default auth.reducer
