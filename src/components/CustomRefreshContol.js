import React from 'react'
import { RefreshControl } from 'react-native'

const CustomRefreshContol = ({ ...rest }) => {
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
