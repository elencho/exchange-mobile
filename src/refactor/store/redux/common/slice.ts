import { Language } from '@app/refactor/common/constants'
import { i18n } from '@app/refactor/setup/i18n'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import KVStore from '@store/kv'

interface CommonState {
	language: Language
	accessToken?: string
	generalError?: GeneralErrorData
	lastRequestErrorToast: boolean
}

const initialState: CommonState = {
	language: KVStore.get('language') || 'en',
	lastRequestErrorToast: false,
}

const common = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setLanguage(state, action: PayloadAction<Language>) {
			state.language = action.payload
			KVStore.set('language', action.payload)
			i18n.switchLanguage(action.payload)
		},
		setAccessToken(state, action: PayloadAction<string | undefined>) {
			state.accessToken = action.payload
		},
		setGeneralError(
			state,
			action: PayloadAction<GeneralErrorData | undefined>
		) {
			state.generalError = action.payload
		},
		setIsToast(state, action: PayloadAction<boolean>) {
			state.lastRequestErrorToast = action.payload
		},
	},
})

export const { setLanguage, setGeneralError, setIsToast, setAccessToken } =
	common.actions
export default common.reducer
