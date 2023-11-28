import {
	ActionReducerMapBuilder,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import {
	credentialsForChangeOTPThunk,
	fetchUserInfoThunk,
	toggleSubscriptionThunk,
	updatePasswordThunk,
	updateUserThunk,
	updatePhoneNumberThunk,
} from './profileThunks'

export interface ProfileState {
	userInfo: UserInfoType | null | undefined
	userProfileLoading: boolean
	userProfileButtonsLoading: boolean
	verificationInfo: {}
	currentSecurityAction: OTP | null
	tOTPChangeParams: tOTPChangeParams | null
}

const initialState: ProfileState = {
	userInfo: null,
	userProfileLoading: false,
	verificationInfo: {},
	currentSecurityAction: null,
	tOTPChangeParams: null,
	userProfileButtonsLoading: false,
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setUserInfo(state, action: PayloadAction<UserInfoType | null>) {
			state.userInfo = action.payload
		},
		setVerificationInfo(state, action: PayloadAction<any>) {
			state.verificationInfo = action.payload
		},
		setCurrentSecurityAction(state, action: PayloadAction<OTP>) {
			state.currentSecurityAction = action.payload
		},
		setUserProfileLoading(state, action: PayloadAction<boolean>) {
			state.userProfileLoading = action.payload
		},
	},
	extraReducers: (builder) => {
		fetchUser(builder)
		updatePassword(builder)
		updateUser(builder)
		emailUpdates(builder)
		otpChange(builder)
		updatePhoneNumber(builder)
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
			state.userProfileButtonsLoading = true
		})
		.addCase(updateUserThunk.fulfilled, (state, action) => {
			state.userProfileButtonsLoading = false
			state.userInfo = action.payload
		})
		.addCase(updateUserThunk.rejected, (state) => {
			state.userProfileButtonsLoading = false
		})
}

const updatePassword = (builder: ActionReducerMapBuilder<ProfileState>) => {
	builder
		.addCase(updatePasswordThunk.pending, (state) => {
			state.userProfileButtonsLoading = true
		})
		.addCase(updatePasswordThunk.fulfilled, (state, action) => {
			state.userProfileButtonsLoading = false
		})
		.addCase(updatePasswordThunk.rejected, (state) => {
			state.userProfileButtonsLoading = false
		})
}

const emailUpdates = (builder: ActionReducerMapBuilder<ProfileState>) => {
	builder
		.addCase(toggleSubscriptionThunk.pending, (state) => {
			state.userProfileLoading = false
		})
		.addCase(toggleSubscriptionThunk.fulfilled, (state, action) => {
			state.userInfo = action.payload
		})
		.addCase(toggleSubscriptionThunk.rejected, (state) => {
			state.userProfileLoading = false
		})
}

const otpChange = (builder: ActionReducerMapBuilder<ProfileState>) => {
	builder
		.addCase(credentialsForChangeOTPThunk.pending, (state) => {
			state.userProfileLoading = false
		})
		.addCase(credentialsForChangeOTPThunk.fulfilled, (state, action) => {
			state.userProfileLoading = false
			state.tOTPChangeParams = action.payload.data
		})
		.addCase(credentialsForChangeOTPThunk.rejected, (state) => {
			state.userProfileLoading = false
		})
}

const updatePhoneNumber = (builder: ActionReducerMapBuilder<ProfileState>) => {
	builder
		.addCase(updatePhoneNumberThunk.pending, (state) => {
			state.userProfileButtonsLoading = true
		})
		.addCase(updatePhoneNumberThunk.fulfilled, (state, action) => {
			state.userProfileButtonsLoading = false
			state.userInfo = action.payload
		})
		.addCase(updatePhoneNumberThunk.rejected, (state) => {
			state.userProfileButtonsLoading = false
		})
}

export const {
	setUserInfo,
	setVerificationInfo,
	setCurrentSecurityAction,
	setUserProfileLoading,
} = profileSlice.actions
export default profileSlice.reducer
