import React from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'

const CustomRefreshContol = (props: RefreshControlProps) => {
	const { refreshing, ...rest } = props
	return (
		<RefreshControl
			refreshing={refreshing}
			tintColor={'#93A1E3'}
			progressBackgroundColor={'#292D4A'}
			colors={['#6582FD']}
			{...rest}
		/>
	)
}

export default CustomRefreshContol
