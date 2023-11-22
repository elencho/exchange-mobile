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

const extractApiError = (apiResult: any) => {
	const keyCloakError = apiResult?.payload?.errors?.[0]
	const regularError = apiResult?.payload?.response?.data

	return keyCloakError
		? (keyCloakError as UiErrorData)
		: regularError
		? (regularError as UiErrorData)
		: null
}
