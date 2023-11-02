import { Language } from '@app/refactor/common/constants'
import { i18n } from '@app/refactor/setup/i18n'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import KVStore from '@store/kv'

interface CommonState {
	language: Language
	currencyList: string[]

	// error
	lastRequestUiError?: UiErrorType
	generalErrorData?: UiErrorData
	appToastData?: UiErrorData
}

const initialState: CommonState = {
	language: KVStore.get('language') || 'en',
	currencyList: [],
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
		setCurrencyList(state, action: PayloadAction<string[]>) {
			state.currencyList = action.payload
		},
		setGeneralError(state, action: PayloadAction<UiErrorData | undefined>) {
			state.generalErrorData = action.payload
		},
		setAppToast(state, action: PayloadAction<UiErrorData | undefined>) {
			console.log('settin')
			state.appToastData = action.payload
		},
		setLastRequestUiErrorType(state, action: PayloadAction<UiErrorType>) {
			state.lastRequestUiError = action.payload
		},
	},
})

export const {
	setLanguage,
	setGeneralError,
	setAppToast,
	setLastRequestUiErrorType,
	setCurrencyList,
} = common.actions
export default common.reducer
