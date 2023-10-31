import { Language } from '@app/refactor/common/constants'
import { i18n } from '@app/refactor/setup/i18n'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import KVStore from '@store/kv'

interface CommonState {
	language: Language
	generalError?: GeneralErrorData
	lastRequestErrorToast: boolean
	currencyList: string[]
}

const initialState: CommonState = {
	language: KVStore.get('language') || 'en',
	lastRequestErrorToast: false,
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
		setGeneralError(
			state,
			action: PayloadAction<GeneralErrorData | undefined>
		) {
			state.generalError = action.payload
		},
		setIsToast(state, action: PayloadAction<boolean>) {
			state.lastRequestErrorToast = action.payload
		},
		setCurrencyList(state, action: PayloadAction<string[]>) {
			state.currencyList = action.payload
		},
	},
})

export const { setLanguage, setGeneralError, setIsToast, setCurrencyList } =
	common.actions
export default common.reducer
