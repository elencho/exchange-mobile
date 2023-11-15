import { Dispatch, SetStateAction } from 'react'

export const handleGeneralError = async (
	apiFunction: () => any,
	setGeneralErrorData: Dispatch<SetStateAction<any>>
) => {
	const res = await apiFunction()

	if (res?.payload.errors[0]) {
		setGeneralErrorData(res.payload.errors[0])
	}
}
