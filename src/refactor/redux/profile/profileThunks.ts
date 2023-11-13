import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	fetchUserInfoUtil,
	updatePasswordUtil,
	subscribeMail,
	unsubscribeMail,
	updateUserData,
} from './profileApi'

export const fetchUserInfoThunk = createAsyncThunk(
	'profile/fetchUserInfo',
	async () => {
		try {
			const userInfo = await fetchUserInfoUtil()

			return userInfo
		} catch (error) {
			console.log(error)
		}
	}
)

export const updateUserThunk = createAsyncThunk(
	'profile/updateUser',
	async (data: UserInfoType) => {
		try {
			await updateUserData(data)
			const userInfo = await fetchUserInfoUtil()

			return userInfo
		} catch (error) {
			console.log(error)
		}
	}
)

export const updatePasswordThunk = createAsyncThunk(
	'profile/updatePassword',
	async ({
		currentPassword,
		newPassword,
		repeatPassword,
		hide,
	}: UpdatePasswordData) => {
		try {
			const response = await updatePasswordUtil(
				currentPassword,
				newPassword,
				repeatPassword
			)
			if (response?.status >= 200 && response?.status < 300) {
				hide()
			}
			return response
		} catch (error) {
			console.log(error)
		}
	}
)

export const toggleSubscriptionThunk = createAsyncThunk(
	'profile/toggleSubscription',
	async ({ value }: ToggleSubscriptionData) => {
		try {
			if (value) {
				unsubscribeMail()
			} else {
				subscribeMail()
			}

			const userInfo = await fetchUserInfoUtil()

			return userInfo
		} catch (error) {
			throw error
		}
	}
)
