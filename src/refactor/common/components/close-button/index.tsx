import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Close from '@assets/images/Close.svg'

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
		width: 25,
		height: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: { alignItems: 'flex-end' },
})
