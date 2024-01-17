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
	codeToTokenThunk,
} from '@store/redux/auth/thunks'
import SecureKV from '@store/kv/secure'
import KV from '@store/kv/regular'

interface AuthState {
	timerVisible: boolean
	otpTimerVisible: boolean

	loginLoading: boolean
	otpLoading: boolean
	otpResendLoading: boolean
	registerLoading: boolean
	forgotLoading: boolean
	forgotResendLoading: boolean
	setPasswordLoading: boolean
	fullScreenLoading: boolean

	callbackUrl: string
	accessToken?: string
	otpType: OTP
	phoneCountryCode?: string
	pkceInfo?: PkceInfo
}

const initialState: AuthState = {
	timerVisible: false,
	otpTimerVisible: false,

	loginLoading: false,
	otpLoading: false,
	otpResendLoading: false,
	registerLoading: false,
	forgotLoading: false,
	forgotResendLoading: false,
	setPasswordLoading: false,
	fullScreenLoading: false,

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
		setOtpTimer: (state, action: PayloadAction<boolean>) => {
			state.otpTimerVisible = action.payload
		},
		setOtpLoading: (state, action: PayloadAction<boolean>) => {
			state.otpLoading = action.payload
		},
		setLoginLoading: (state, action: PayloadAction<boolean>) => {
			state.loginLoading = action.payload
		},
		setSetPasswordLoading: (state, action: PayloadAction<boolean>) => {
			state.setPasswordLoading = action.payload
		},
		setRegisterLoading: (state, action: PayloadAction<boolean>) => {
			state.registerLoading = action.payload
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
			KV.del('lastOpenDateMillis')
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
	builder
		.addCase(startLoginThunk.fulfilled, (state, action) => {
			state.fullScreenLoading = false
			state.callbackUrl = action.payload.callbackUrl
		})
		.addCase(startLoginThunk.pending, (state, action) => {
			state.fullScreenLoading = true
		})
		.addCase(startLoginThunk.rejected, (state, action) => {
			state.fullScreenLoading = false
		})

	builder
		.addCase(usernameAndPaswordThunk.pending, (state) => {
			state.loginLoading = true
		})
		.addCase(usernameAndPaswordThunk.fulfilled, (state, action) => {
			state.loginLoading = false
			state.callbackUrl = action.payload.callbackUrl
			state.otpType = action.payload.attributes.otpType
		})
		.addCase(usernameAndPaswordThunk.rejected, (state) => {
			state.loginLoading = false
		})
}

const forgotPass = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder
		.addCase(forgotPasswordStartThunk.fulfilled, (state, action) => {
			state.callbackUrl = action.payload.callbackUrl
			state.fullScreenLoading = false
		})
		.addCase(forgotPasswordStartThunk.rejected, (state) => {
			state.fullScreenLoading = false
		})
		.addCase(forgotPasswordStartThunk.pending, (state) => {
			state.fullScreenLoading = true
		})

	builder.addCase(resendPasswordCodeThunk.pending, (state) => {
		state.forgotResendLoading = true
	})
	builder.addCase(resendPasswordCodeThunk.fulfilled, (state, action) => {
		state.forgotResendLoading = false
		if (action.payload.callbackUrl) {
			state.callbackUrl = action.payload.callbackUrl
		}
		state.timerVisible = action.payload.timerVisible
	})
	builder.addCase(resendPasswordCodeThunk.rejected, (state) => {
		state.forgotResendLoading = false
	})

	builder.addCase(resetPasswordConfirmCodeThunk.pending, (state) => {
		state.forgotLoading = true
	})
	builder.addCase(resetPasswordConfirmCodeThunk.fulfilled, (state, action) => {
		state.forgotLoading = false
		state.callbackUrl = action.payload.callbackUrl
		state.otpType = action.payload.attributes.otpType
	})
	builder.addCase(resetPasswordConfirmCodeThunk.rejected, (state) => {
		state.forgotLoading = false
	})
}

const setPass = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder.addCase(setNewPasswordOtpThunk.pending, (state) => {
		state.setPasswordLoading = true
	})
	builder.addCase(setNewPasswordOtpThunk.fulfilled, (state) => {
		state.setPasswordLoading = false
	})
	builder.addCase(setNewPasswordOtpThunk.rejected, (state) => {
		state.setPasswordLoading = false
	})
}

const login2fa = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder.addCase(resendOtpThunk.pending, (state) => {
		state.otpResendLoading = true
	})
	builder.addCase(resendOtpThunk.fulfilled, (state, action) => {
		state.otpResendLoading = false
		if (action.payload?.callbackUrl) {
			state.callbackUrl = action.payload.callbackUrl
		}
		state.otpTimerVisible = true
	})
	builder.addCase(resendOtpThunk.rejected, (state) => {
		state.otpResendLoading = false
		state.otpTimerVisible = false
	})

	builder.addCase(otpForLoginThunk.pending, (state) => {
		state.otpLoading = true
	})
	builder.addCase(otpForLoginThunk.fulfilled, (state, action) => {
		if (action.payload?.callbackUrl) {
			state.callbackUrl = action.payload.callbackUrl
		}
	})
	builder.addCase(otpForLoginThunk.rejected, (state) => {
		state.otpLoading = false
	})

	builder.addCase(codeToTokenThunk.rejected, (state) => {
		state.otpLoading = false
	})

	builder.addCase(resetOtpThunk.fulfilled, (state, action) => {
		state.callbackUrl = action.payload.callbackUrl
	})

	builder
		.addCase(verifyRegistrationThunk.pending, (state) => {
			state.otpLoading = true
		})
		.addCase(verifyRegistrationThunk.fulfilled, (state, action) => {
			if (action.payload.callbackUrl) {
				state.callbackUrl = action.payload.callbackUrl
			}
		})
		.addCase(verifyRegistrationThunk.rejected, (state) => {
			state.otpLoading = false
		})
}

const register = (builder: ActionReducerMapBuilder<AuthState>) => {
	builder
		.addCase(startRegistrationThunk.fulfilled, (state, action) => {
			state.callbackUrl = action.payload.callbackUrl
			state.phoneCountryCode = action.payload.attributes.phoneCountry
			state.fullScreenLoading = false
		})
		.addCase(startRegistrationThunk.pending, (state, action) => {
			state.fullScreenLoading = true
		})
		.addCase(startRegistrationThunk.rejected, (state, action) => {
			state.fullScreenLoading = false
		})

	builder
		.addCase(registrationFormThunk.pending, (state) => {
			state.registerLoading = true
		})
		.addCase(registrationFormThunk.fulfilled, (state, action) => {
			state.registerLoading = false
			state.callbackUrl = action.payload.callbackUrl
		})
		.addCase(registrationFormThunk.rejected, (state) => {
			state.registerLoading = false
		})
}

export const {
	savePkceInfo,
	setTimer,
	setOtpTimer,
	setTokens,
	resetAuth,
	setLoginLoading,
	setOtpLoading,
	setSetPasswordLoading,
	setRegisterLoading,
} = auth.actions
export default auth.reducer
