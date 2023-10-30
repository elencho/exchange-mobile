interface GeneralErrorData {
	errorKey: string
	errorMessage: string
	errorType: string
	transParams?: TransParams
}

type TransParams = Record<string, string>
