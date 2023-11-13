// src/redux/errorsSlice.ts
import {
	ActionReducerMapBuilder,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import {
	fetchUserInfoThunk,
	toggleSubscriptionThunk,
	updatePasswordThunk,
	updateUserThunk,
} from './profileThunks'

export interface ProfileState {
	userInfo: UserInfoType | null | undefined
	otpChangeToken: string | null
	totpSecretObj: string | {}
	userProfileLoading: boolean
	verificationInfo: {}
}

const initialState: ProfileState = {
	userInfo: null,
	otpChangeToken: null,
	totpSecretObj: {},
	userProfileLoading: false,
	verificationInfo: {},
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setUserInfo(state, action: PayloadAction<UserInfoType>) {
			state.userInfo = action.payload
		},
		setOtpChangeToken(state, action: PayloadAction<string>) {
			state.otpChangeToken = action.payload
		},
		setTotpSecretObj(state, action: PayloadAction<string>) {
			state.totpSecretObj = action.payload
		},
		setVerificationInfo(state, action: PayloadAction<any>) {
			state.verificationInfo = action.payload
		},
	},
	extraReducers: (builder) => {
		fetchUser(builder)
		updatePassword(builder)
		updateUser(builder)
		emailUpdates(builder)
	},
})

const fetchUser = (builder: ActionReducerMapBuilder<ProfileState>) => {
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
}

const updateUser = (builder: ActionReducerMapBuilder<ProfileState>) => {
	builder
		.addCase(updateUserThunk.pending, (state) => {
			state.userProfileLoading = true
		})
		.addCase(updateUserThunk.fulfilled, (state, action) => {
			state.userProfileLoading = false
			state.userInfo = action.payload
		})
		.addCase(updateUserThunk.rejected, (state) => {
			state.userProfileLoading = false
		})
}

const updatePassword = (builder: ActionReducerMapBuilder<ProfileState>) => {
	builder
		.addCase(updatePasswordThunk.pending, (state) => {
			state.userProfileLoading = true
		})
		.addCase(updatePasswordThunk.fulfilled, (state, action) => {
			state.userProfileLoading = false
		})
		.addCase(updatePasswordThunk.rejected, (state) => {
			state.userProfileLoading = false
		})
}

const emailUpdates = (builder: ActionReducerMapBuilder<ProfileState>) => {
	builder
		.addCase(toggleSubscriptionThunk.pending, (state) => {
			state.userProfileLoading = true
		})
		.addCase(toggleSubscriptionThunk.fulfilled, (state, action) => {
			state.userProfileLoading = false
			state.userInfo = action.payload
		})
		.addCase(toggleSubscriptionThunk.rejected, (state) => {
			state.userProfileLoading = false
		})
}

export const {
	setUserInfo,
	setOtpChangeToken,
	setTotpSecretObj,
	setVerificationInfo,
} = profileSlice.actions
export default profileSlice.reducer
