import React from 'react'
import { StyleSheet } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'

interface HeadlineProps {
	title: string
}

export const Headline = (props: HeadlineProps) => {
	const { styles } = useTheme(_styles)
	const { title } = props

	return (
		<AppText variant={'headline'} style={styles.text}>
			{title}
		</AppText>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		text: {
			color: theme.color.textPrimary,
			marginVertical: 10,
		},
	})
