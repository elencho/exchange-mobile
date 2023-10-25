interface ModalsSlice {
	toastObj: Record<string, any>
	appToastObj: any | null
	isToast: boolean
	webViewObj: any | null
	webViewVisible: boolean
	datePickerVisible: { to: boolean; from: boolean }
	chooseCurrencyModalVisible: boolean
	transactionDetailsVisible: boolean
	chooseMethodsModalVisible: boolean
	buySellModalVisible: boolean
	cryptoModalVisible: boolean
	fiatModalVisible: boolean
	infoVisible: boolean
	chooseCardModalVisible: boolean
	chooseBankModalVisible: boolean
	wireBanksModalVisible: boolean
	bankFeesModalVisible: boolean
	personalInfoModalVisible: boolean
	passwordModalVisible: boolean
	phoneNumberModalVisible: boolean
	languageModalVisible: boolean
	countriesModalVisible: boolean
	companyInfoModalVisible: boolean
	companyInfoModalHeader: string
	companyInfoModalDescription: string
	companyInfoModalLink: string
	companyInfoModalButton: string
	identityModalVisible: boolean
	googleAuthModalVisible: boolean
	smsAuthModalVisible: boolean
	emailAuthModalVisible: boolean
	googleOtpModalVisible: boolean
	hasCameraPermission: boolean
	chooseNetworkModalVisible: boolean
	generateRequestModalVisible: boolean
	qrAddressModalVisible: boolean
	qrScannerModalVisible: boolean
	chooseAddressModalVisible: boolean
	withdrawalConfirmModalVisible: boolean
	whitelistActionsModalVisible: boolean
	addWhitelistModalVisible: boolean
	editWhitelistModalVisible: boolean
	transferMethodModalVisible: boolean
	templatesModalVisible: boolean
	addCardModalVisible: boolean
	statusModalInfo: any | null
	deleteModalInfo: Record<string, any>
}

export const initialState: ModalsSlice = {
	toastObj: {},
	appToastObj: null,
	isToast: true,
	webViewObj: null,
	webViewVisible: true,
	// Login

	// Transactions
	datePickerVisible: { to: false, from: false },
	chooseCurrencyModalVisible: false,
	transactionDetailsVisible: false, // Both transactions and trades
	chooseMethodsModalVisible: false,

	// Instant Trade
	buySellModalVisible: false,
	cryptoModalVisible: false,
	fiatModalVisible: false,
	infoVisible: false,
	chooseCardModalVisible: false,
	chooseBankModalVisible: false,
	wireBanksModalVisible: false,
	bankFeesModalVisible: false,

	// User Profile
	personalInfoModalVisible: false,
	passwordModalVisible: false,
	phoneNumberModalVisible: false,
	languageModalVisible: false,
	countriesModalVisible: false,
	companyInfoModalVisible: false,
	companyInfoModalHeader: '',
	companyInfoModalDescription: '',
	companyInfoModalLink: '',
	companyInfoModalButton: '',
	identityModalVisible: false,
	// security
	googleAuthModalVisible: false,
	smsAuthModalVisible: false,
	emailAuthModalVisible: false,
	googleOtpModalVisible: false,
	hasCameraPermission: false,

	// WALLET
	chooseNetworkModalVisible: false,
	generateRequestModalVisible: false,
	qrAddressModalVisible: false,
	qrScannerModalVisible: false,
	chooseAddressModalVisible: false,
	withdrawalConfirmModalVisible: false,
	whitelistActionsModalVisible: false,
	addWhitelistModalVisible: false,
	editWhitelistModalVisible: false,
	transferMethodModalVisible: false,
	templatesModalVisible: false,
	addCardModalVisible: false,
	statusModalInfo: null,
	deleteModalInfo: {},
}
