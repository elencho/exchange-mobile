import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Close from '../../assets/images/Close.svg'

export default function CloseModalIcon({ onPress, style }) {
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
