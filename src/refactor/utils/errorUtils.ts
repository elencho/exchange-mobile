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

export const handleAxiosErrors = (
	apiResult: any,
	setErrorData: (err: UiErrorData) => void,
	handleSuccess: () => void
) => {
	if (
		!(
			apiResult?.response?.data?.statusCode! >= 200 &&
			apiResult?.response?.data?.statusCode! <= 300
		)
	) {
		parseError(apiResult, setErrorData)
	} else {
		handleSuccess()
	}
}

export const parseError = (
	apiResult: any,
	setErrorData: (err: UiErrorData) => void
) => {
	setErrorData(apiResult.response.data)
}
