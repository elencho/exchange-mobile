export const formatGeneralError = (error?: GeneralErrorData) => {
	const paramKeys = error?.transParams && Object.keys(error?.transParams)
	return !error?.transParams
		? error?.errorMessage
		: `${error?.errorMessage} params{${paramKeys?.join()}}`
}
