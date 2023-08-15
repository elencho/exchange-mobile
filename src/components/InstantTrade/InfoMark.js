import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

import { toggleInfoModal } from '../../redux/modals/actions'
import AppText from '../AppText'

export default function InfoMark({ inner, color }) {
	const dispatch = useDispatch()

	const showInfo = () => {
		dispatch(toggleInfoModal(true))
	}

	return (
		<TouchableOpacity
			style={[styles.container, { borderColor: color }]}
			onPress={showInfo}>
			<AppText medium body style={{ color }}>
				{inner}
			</AppText>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		width: 25,
		height: 25,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
