export const formatUiError = (error?: UiErrorData) => {
	const paramKeys = error?.transParams && Object.keys(error?.transParams)
	return !error?.transParams
		? error?.errorMessage
		: `${error?.errorMessage} params{${paramKeys?.join()}}`
}
