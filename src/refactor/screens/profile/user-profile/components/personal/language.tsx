import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppButton } from '@components/button'
import AppText from '@components/text'

interface LanguageProps {
	styles: StyleSheet.NamedStyles<any>
	editLanguage: () => void
}
export const Language = (props: LanguageProps) => {
	const { styles, editLanguage } = props
	return (
		<View style={styles.row}>
			<AppText variant="m" style={styles.white}>
				Choose Language
			</AppText>
			<View style={styles.flex}>
				<AppButton
					variant="text"
					text="Edit"
					style={styles.purple}
					onPress={editLanguage}
				/>
			</View>
		</View>
	)
}
