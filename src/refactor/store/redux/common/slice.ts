import { Language } from '@app/refactor/common/constants'
import { i18n } from '@app/refactor/setup/i18n'
import {
	ActionReducerMapBuilder,
	PayloadAction,
	createSlice,
} from '@reduxjs/toolkit'
import { fetchCountriesThunk } from './thunks'
import KV from '@store/kv/regular'

interface CommonState {
	language: Language
	currencyList: Currency[]
	countries: Country[]
	webViewVisible: boolean

	// error
	lastRequestUiError?: UiErrorType
	generalErrorData?: UiErrorData
	appToastData?: UiErrorData

	isInternetScreenOpened: boolean

	// biometric
	isBiometricScreenOpened: boolean
	isBiometricEnabled: boolean
	notificationData: any

	// convert
	convertPair?: string
}

const initialState: CommonState = {
	language: KV.get('language') || 'en',
	convertPair: KV.get('defaultConvertPair'),
	currencyList: [],
	countries: [],
	isBiometricScreenOpened: false,
	isBiometricEnabled: false,
	notificationData: null,
	isInternetScreenOpened: false,
	webViewVisible: false,
	biometricSuccess: null,
}

const common = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setLanguage(state, action: PayloadAction<Language>) {
			state.language = action.payload
			KV.set('language', action.payload)
			i18n.switchLanguage(action.payload)
		},
		setCurrencyList(state, action: PayloadAction<Currency[]>) {
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
		setInternetScreenOpened(state, action: PayloadAction<boolean>) {
			state.isInternetScreenOpened = action.payload
		},
		setBiometricToggleEnabled(state, action: PayloadAction<boolean>) {
			state.isBiometricEnabled = action.payload
		},
		setNotificationData(state, action: PayloadAction<any>) {
			state.notificationData = action.payload
		},
		setWebViewVisible(state, action: PayloadAction<boolean>) {
			state.webViewVisible = action.payload
			KV.set('webViewVisible', action.payload)
		},
		setBiometricSuccess(state, action: PayloadAction<boolean>) {
			state.biometricSuccess = action.payload
		},
		setConvertPair(state, action: PayloadAction<string>) {
			KV.set('defaultConvertPair', action.payload)
			state.convertPair = action.payload
		},
		delConvertPair(state) {
			KV.del('defaultConvertPair')
			state.convertPair = undefined
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
	setBiometricToggleEnabled,
	setNotificationData,
	setInternetScreenOpened,
	setWebViewVisible,
	setBiometricSuccess,
	setConvertPair,
	delConvertPair,
} = common.actions

export default common.reducer
