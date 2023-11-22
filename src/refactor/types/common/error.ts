interface UiErrorData {
	errorKey: string
	errorMessage: string
	errorType: string
	transParams: TransParams | null
}

type TransParams = Record<string, string>

type UiErrorType = 'GeneralError' | 'AppToast'
