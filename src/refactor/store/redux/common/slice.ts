import { Language } from '@app/refactor/common/constants'
import { i18n } from '@app/refactor/setup/i18n'
import {
	ActionReducerMapBuilder,
	PayloadAction,
	createSlice,
} from '@reduxjs/toolkit'
import KVStore from '@store/kv'
import { fetchCountriesThunk } from './thunks'

interface CommonState {
	language: Language
	currencyList: string[]
	countries: Country[]

	// error
	lastRequestUiError?: UiErrorType
	generalErrorData?: UiErrorData
	appToastData?: UiErrorData

	// biometric
	isBiometricScreenOpened: boolean
}

const initialState: CommonState = {
	language: KVStore.get('language') || 'en',
	currencyList: [],
	countries: [],
	isBiometricScreenOpened: false,
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
			state.appToastData = action.payload
		},
		setLastRequestUiErrorType(state, action: PayloadAction<UiErrorType>) {
			state.lastRequestUiError = action.payload
		},
		setBiometricScreenOpened(state, action: PayloadAction<boolean>) {
			state.isBiometricScreenOpened = action.payload
		},
	},
	extraReducers: (builder) => {
		countries(builder)
	},
})

const countries = (builder: ActionReducerMapBuilder<CommonState>) => {
	builder.addCase(fetchCountriesThunk.fulfilled, (state, action) => {
		state.countries = action.payload
	})
}

export const {
	setLanguage,
	setGeneralError,
	setAppToast,
	setLastRequestUiErrorType,
	setCurrencyList,
	setBiometricScreenOpened,
} = common.actions

export default common.reducer
