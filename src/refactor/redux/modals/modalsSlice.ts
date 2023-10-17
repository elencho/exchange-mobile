import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './modalsState'

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		toggleDatePicker(
			state,
			action: PayloadAction<{ to: boolean; from: boolean }>
		) {
			state.datePickerVisible = action.payload
		},

		toggleCurrencyModal(state, action: PayloadAction<boolean>) {
			state.chooseCurrencyModalVisible = action.payload
		},
		toggleMethodsModal(state, action: PayloadAction<boolean>) {
			state.chooseMethodsModalVisible = action.payload
		},
		toggleTransactionDetails(state, action: PayloadAction<boolean>) {
			state.transactionDetailsVisible = action.payload
		},
		toggleBuySellModal(state, action: PayloadAction<boolean>) {
			state.buySellModalVisible = action.payload
		},
		toggleCryptoModal(state, action: PayloadAction<boolean>) {
			state.cryptoModalVisible = action.payload
		},
		toggleFiatModal(state, action: PayloadAction<boolean>) {
			state.fiatModalVisible = action.payload
		},
		toggleInfoModal(state, action: PayloadAction<boolean>) {
			state.infoVisible = action.payload
		},
		toggleWebViewVisible(state, action: PayloadAction<boolean>) {
			state.webViewVisible = action.payload
		},
		toggleChooseCardModal(state, action: PayloadAction<boolean>) {
			state.chooseCardModalVisible = action.payload
		},
		toggleChooseBankModal(state, action: PayloadAction<boolean>) {
			state.chooseBankModalVisible = action.payload
		},
		toggleWireBanksModal(state, action: PayloadAction<boolean>) {
			state.wireBanksModalVisible = action.payload
		},
		toggleBankFeesModal(state, action: PayloadAction<boolean>) {
			state.bankFeesModalVisible = action.payload
		},
		togglePersonalInfoModal(state, action: PayloadAction<boolean>) {
			state.personalInfoModalVisible = action.payload
		},
		togglePasswordModal(state, action: PayloadAction<boolean>) {
			state.passwordModalVisible = action.payload
		},
		togglePhoneNumberModal(state, action: PayloadAction<boolean>) {
			state.phoneNumberModalVisible = action.payload
		},
		toggleLanguageModal(state, action: PayloadAction<boolean>) {
			state.languageModalVisible = action.payload
		},
		toggleGoogleAuthModal(state, action: PayloadAction<boolean>) {
			state.googleAuthModalVisible = action.payload
		},
		toggleCountriesModal(state, action: PayloadAction<boolean>) {
			state.countriesModalVisible = action.payload
		},
		toggleSmsAuthModal(state, action: PayloadAction<boolean>) {
			state.smsAuthModalVisible = action.payload
		},
		toggleEmailAuthModal(state, action: PayloadAction<boolean>) {
			state.emailAuthModalVisible = action.payload
		},
		toggleGoogleOtpModal(state, action: PayloadAction<boolean>) {
			state.googleOtpModalVisible = action.payload
		},
		openCompanyInfoModal(
			state,
			action: PayloadAction<{
				companyInfoModalHeader: string
				companyInfoModalDescription: string
				companyInfoModalLink: string
				companyInfoModalButton: string
			}>
		) {
			const {
				companyInfoModalHeader,
				companyInfoModalDescription,
				companyInfoModalLink,
				companyInfoModalButton,
			} = action.payload
			state.companyInfoModalVisible = true
			state.companyInfoModalHeader = companyInfoModalHeader
			state.companyInfoModalDescription = companyInfoModalDescription
			state.companyInfoModalLink = companyInfoModalLink
			state.companyInfoModalButton = companyInfoModalButton
		},

		toggleChooseNetworkModal(state, action: PayloadAction<boolean>) {
			state.chooseNetworkModalVisible = action.payload
		},
		toggleGenerateRequestModal(state, action: PayloadAction<boolean>) {
			state.generateRequestModalVisible = action.payload
		},
		toggleQrAddressModal(state, action: PayloadAction<boolean>) {
			state.qrAddressModalVisible = action.payload
		},
		toggleQrScannerModal(state, action: PayloadAction<boolean>) {
			state.qrScannerModalVisible = action.payload
		},
		toggleChooseAddressModal(state, action: PayloadAction<boolean>) {
			state.chooseAddressModalVisible = action.payload
		},
		toggleWhitelistActionsModal(state, action: PayloadAction<boolean>) {
			state.whitelistActionsModalVisible = action.payload
		},
		toggleAddWhitelistModal(state, action: PayloadAction<boolean>) {
			state.addWhitelistModalVisible = action.payload
		},
		toggleEditWhitelistModal(state, action: PayloadAction<boolean>) {
			state.editWhitelistModalVisible = action.payload
		},
		toggleTransferMethodModal(state, action: PayloadAction<boolean>) {
			state.transferMethodModalVisible = action.payload
		},
		toggleTemplatesModal(state, action: PayloadAction<boolean>) {
			state.templatesModalVisible = action.payload
		},
		toggleAddCardModal(state, action: PayloadAction<boolean>) {
			state.addCardModalVisible = action.payload
		},
		setStatusModalInfo(state, action: PayloadAction<any>) {
			state.statusModalInfo = action.payload
		},
		setDeleteModalInfo(state, action: PayloadAction<any>) {
			state.deleteModalInfo = action.payload
		},
		setAppToast(state, action: PayloadAction<any>) {
			state.appToastObj = action.payload
		},
		setToastObj(state, action: PayloadAction<any>) {
			state.toastObj = action.payload
		},
		grantCameraPermission(state, action: PayloadAction<boolean>) {
			state.hasCameraPermission = action.payload
		},
	},
})

export const {
	toggleDatePicker,
	toggleCurrencyModal,
	toggleMethodsModal,
	toggleTransactionDetails,
	toggleBuySellModal,
	toggleCryptoModal,
	toggleFiatModal,
	toggleInfoModal,
	toggleWebViewVisible,
	toggleChooseCardModal,
	toggleChooseBankModal,
	toggleWireBanksModal,
	toggleBankFeesModal,
	togglePersonalInfoModal,
	togglePasswordModal,
	togglePhoneNumberModal,
	toggleLanguageModal,
	toggleGoogleAuthModal,
	toggleCountriesModal,
	toggleSmsAuthModal,
	toggleEmailAuthModal,
	toggleGoogleOtpModal,
	openCompanyInfoModal,
	toggleChooseNetworkModal,
	toggleGenerateRequestModal,
	toggleQrAddressModal,
	toggleQrScannerModal,
	toggleChooseAddressModal,
	toggleWhitelistActionsModal,
	toggleAddWhitelistModal,
	toggleEditWhitelistModal,
	toggleTransferMethodModal,
	toggleTemplatesModal,
	toggleAddCardModal,
	setStatusModalInfo,
	setDeleteModalInfo,
	setAppToast,
	setToastObj,
	grantCameraPermission,
} = modalsSlice.actions

export default modalsSlice.reducer
