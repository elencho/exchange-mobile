// src/redux/errorsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUserInfoThunk } from './profileThunks'

export interface ProfileState {
	// TODO: change any types
	Personal_Security: string
	userInfo: any
	language: string
	googleAuth: boolean
	emailAuth: boolean
	smsAuth: boolean
	currentSecurityAction: any
	otpChangeToken: any
	totpSecretObj: any
	countries: any
	countriesConstant: any
	userProfileLoading: boolean
	verificationInfo: any
}

const initialState: ProfileState = {
	Personal_Security: 'Personal',
	userInfo: {},
	language: 'English',
	googleAuth: false,
	emailAuth: false,
	smsAuth: false,
	currentSecurityAction: null,
	otpChangeToken: null,
	totpSecretObj: {},
	userProfileLoading: false,
	countries: [],
	countriesConstant: [],
	verificationInfo: {},
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setPersonalSecurity(state, action: PayloadAction<string>) {
			state.Personal_Security = action.payload
		},
		setUserInfo(state, action: PayloadAction<any>) {
			state.userInfo = action.payload
		},
		setLanguage(state, action: PayloadAction<string>) {
			state.language = action.payload
		},
		setGoogleAuth(state, action: PayloadAction<boolean>) {
			state.googleAuth = action.payload
		},
		setEmailAuth(state, action: PayloadAction<boolean>) {
			state.emailAuth = action.payload
		},
		setSmsAuth(state, action: PayloadAction<boolean>) {
			state.smsAuth = action.payload
		},
		setCurrentSecurityAction(state, action: PayloadAction<any>) {
			state.currentSecurityAction = action.payload
		},
		setOtpChangeToken(state, action: PayloadAction<any>) {
			state.otpChangeToken = action.payload
		},
		setTotpSecretObj(state, action: PayloadAction<any>) {
			state.totpSecretObj = action.payload
		},
		setCountries(state, action: PayloadAction<any>) {
			state.countries = action.payload
		},
		setCountriesConstant(state, action: PayloadAction<any>) {
			state.countriesConstant = action.payload
		},
		setVerificationInfo(state, action: PayloadAction<any>) {
			state.verificationInfo = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserInfoThunk.pending, (state) => {
				state.userProfileLoading = true
			})
			.addCase(fetchUserInfoThunk.fulfilled, (state, action) => {
				state.userProfileLoading = false
				state.userInfo = action.payload
			})
			.addCase(fetchUserInfoThunk.rejected, (state) => {
				state.userProfileLoading = false
			})
	},
})

export const {
	setPersonalSecurity,
	setUserInfo,
	setLanguage,
	setGoogleAuth,
	setEmailAuth,
	setSmsAuth,
	setCurrentSecurityAction,
	setOtpChangeToken,
	setTotpSecretObj,
	setCountries,
	setCountriesConstant,
	setVerificationInfo,
} = profileSlice.actions
export default profileSlice.reducer
