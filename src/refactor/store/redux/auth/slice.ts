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
} from '@store/redux/auth/thunks'

interface AuthState {
	timerVisible: boolean
	authLoading: boolean
	callbackUrl: string
	//passwordResetUrl: string
	otpType: OTP
	pkceInfo?: PkceInfo
}

const initialState: AuthState = {
	timerVisible: false,
	authLoading: false,
	callbackUrl: '',
	//passwordResetUrl: '',
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
			// TODO: should we really?
			state = initialState
		},
	},
	extraReducers: (builder) => {
		startLogin(builder)
		usernameAndPassword(builder)
		resetOtp(builder)

		builder.addCase(forgotPasswordStartThunk.fulfilled, (state, action) => {
			state.callbackUrl = action.payload.callbackUrl // TODO: password?
		})
		builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
			state.timerVisible = true
			state.callbackUrl = action.payload.callbackUrl // TODO: password?
		})

		builder.addCase(otpForLoginThunk.pending, (state, action) => {
			state.authLoading = true
		})
		builder.addCase(otpForLoginThunk.fulfilled, (state, action) => {
			state.authLoading = false
			state.callbackUrl = action.payload.callbackUrl
		})

		builder.addCase(resendOtpThunk.pending, (state, action) => {
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
	builder
		.addCase(startLoginThunk.pending, (state) => {
			state.authLoading = true
		})
		.addCase(startLoginThunk.fulfilled, (state, action) => {
			state.authLoading = false
			state.callbackUrl = action.payload.callbackUrl
			// state.passwordResetUrl = action.payload.passwordResetUrl
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
			// state.passwordResetUrl = action.payload.passwordResetUrl
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
