import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppButton } from '@components/button'
import AppText from '@components/text'

interface PhoneProps {
	styles: StyleSheet.NamedStyles<any>
	edit: () => void
}
export const Phone = (props: PhoneProps) => {
	const { styles, edit } = props
	return (
		<View style={styles.row}>
			<AppText variant="m" style={styles.white}>
				My Phone Number
			</AppText>
			<View style={styles.flex}>
				<AppButton
					variant="text"
					text="Edit"
					style={styles.purple}
					onPress={edit}
				/>
			</View>
		</View>
	)
}
