interface UiErrorData {
	errorKey: string
	errorMessage: string
	errorType: string
	transParams?: TransParams
}

type TransParams = Record<string, string>

type UiErrorType = 'GeneralError' | 'AppToast'
