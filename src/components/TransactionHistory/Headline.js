import React from 'react'
import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import AppText from '../AppText'

export default function Headline({ title }) {
	return (
		<AppText header medium style={styles.text}>
			{title}
		</AppText>
	)
}

const styles = StyleSheet.create({
	text: {
		color: colors.PRIMARY_TEXT,
		marginVertical: 10,
	},
})
