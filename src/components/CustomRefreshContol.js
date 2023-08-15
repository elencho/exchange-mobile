import { RefreshControl } from 'react-native'
import React from 'react'

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
