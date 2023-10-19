import React from 'react'
import { RefreshControl } from 'react-native'

interface Props {
	refreshing: boolean
	onRefresh: () => void
}

const CustomRefreshControl: React.FC<Props> = ({ onRefresh, refreshing }) => (
	<RefreshControl
		tintColor={'#93A1E3'}
		progressBackgroundColor={'#292D4A'}
		colors={['#6582FD']}
		refreshing={refreshing}
		onRefresh={onRefresh}
	/>
)

export default CustomRefreshControl
