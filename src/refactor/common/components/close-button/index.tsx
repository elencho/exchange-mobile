import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Close from '@assets/images/Close.svg'
import { System } from '@app/refactor/common/util'

interface CloseIconProps {
	onPress: () => void
	style?: StyleSheet.NamedStyles<any>
}

export default function CloseIcon(props: CloseIconProps) {
	const { onPress, style } = props
	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity style={styles.close} onPress={onPress}>
				<Close />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	close: {
		marginEnd: System.isIos ? 10 : 0,
		marginTop: System.isIos ? 10 : 0,
		width: 25,
		height: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: { alignItems: 'flex-end' },
})
