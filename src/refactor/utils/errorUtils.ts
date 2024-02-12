import { Dispatch, SetStateAction } from 'react'

export const handleGeneralError = async (
	apiFunction: () => any,
	setGeneralErrorData: Dispatch<SetStateAction<UiErrorData | null>>
) => {
	try {
		const res = await apiFunction()
		const uiError = extractApiError(res)
		uiError && setGeneralErrorData(uiError)
	} catch (e) {
		console.log(e)
	}
}

export const extractApiError = (apiResult: any) => {
	const keyCloakError = apiResult?.payload?.errors?.[0]
	const regularError =
		apiResult?.payload?.response?.data || apiResult?.response?.data

	return keyCloakError
		? (keyCloakError as UiErrorData)
		: regularError
		? (regularError as UiErrorData)
		: null
}

export const handleAxiosErrors = async (
	apiResult: any,
	handleSuccess: (response: any) => void,
	handleError: (err: UiErrorData) => void
) => {
	if (apiResult?.status >= 200 && apiResult?.status <= 300) {
		await handleSuccess(apiResult)
	} else {
		handleError(apiResult.response.data)
	}
}

export const parseError = (
	apiResult: any,
	setErrorData: (err: UiErrorData) => void
) => {
	setErrorData(apiResult.response.data)
}
