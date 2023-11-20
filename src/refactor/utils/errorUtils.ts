import { Dispatch, SetStateAction } from 'react'

export const handleGeneralError = async (
	apiFunction: () => any,
	setGeneralErrorData: Dispatch<SetStateAction<UiErrorData | null>>
) => {
	try {
		const res = await apiFunction()
		if (res?.payload?.errors?.[0]) {
			//For KeyCloak API calls
			setGeneralErrorData(res.payload.errors[0])
		} else {
			// For Regular API calss
			setGeneralErrorData(res.payload.response.data)
		}
	} catch (e) {}
}
