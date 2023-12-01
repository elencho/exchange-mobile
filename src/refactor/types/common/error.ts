interface UiErrorData {
	// Keycloak
	errorKey: string
	errorMessage: string
	errorType: string
	transParams: TransParams | null

	// Regular
	error: string
	error_description: string
}

type TransParams = Record<string, string>

type UiErrorType = 'GeneralError' | 'AppToast'
