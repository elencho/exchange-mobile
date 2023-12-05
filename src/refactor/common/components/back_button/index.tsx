import React from 'react'
import { StyleSheet, Pressable, View } from 'react-native'
import BackSvg from '@app/assets/images/Back.svg'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'

interface Props {
	onPress: () => void
	style?: any
}

const BackButton: React.FC<Props> = ({ onPress, style }) => {
	const { styles } = useTheme(_styles)

	return (
		<Pressable style={[styles.container, style]} onPress={onPress}>
			<BackSvg />
			<AppText style={styles.text}>Back</AppText>
		</Pressable>
	)
}

export default BackButton

const _styles = (theme: Theme) => {
	return StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		text: {
			color: theme.color.textThird,
			marginLeft: 2,
			marginBottom: 1,
			fontSize: 14,
		},
	})
}
