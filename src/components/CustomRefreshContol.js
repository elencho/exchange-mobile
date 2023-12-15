import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'
import React, { useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { useDispatch } from 'react-redux'

const CustomRefreshContol = ({ ...rest }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(saveGeneralError(null))
	}, [])

	return (
		<RefreshControl
			tintColor={'#93A1E3'}
			progressBackgroundColor={'#292D4A'}
			colors={['#6582FD']}
			{...rest}
		/>
	)
}

export default CustomRefreshContol
