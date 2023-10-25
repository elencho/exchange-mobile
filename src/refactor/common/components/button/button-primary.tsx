import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { useTheme, Theme } from '@theme/index'
import { CommonProps } from '@components/button'
import AppText from '@components/text'
import { Element } from '@components/types'
import KVStore from '@store/kv'

export type PrimaryProps = {
	variant: 'primary'
	loading?: boolean
	backgroundColor?: string
	leftComponent?: Element
	rightComponent?: Element
} & CommonProps

export function PrimaryButton({
	text,
	onPress,
	style,
	disabled = false,
	loading = false,
	backgroundColor,
	leftComponent,
	rightComponent,
}: PrimaryProps) {
	const { styles, theme } = useTheme(_styles)

	return (
		<Pressable
			disabled={disabled}
			style={[
				styles.button,
				{
					backgroundColor: disabled
						? theme.color.buttonDisabled
						: backgroundColor
						? backgroundColor
						: theme.color.brandPrimary,
				},
				style,
			]}
			onPress={loading ? null : onPress}>
			{leftComponent}
			{loading ? (
				<MaterialIndicator color="#FFFFFF" animationDuration={3000} size={20} />
			) : (
				<AppText
					variant="l"
					medium={true}
					style={[
						styles.buttonText,
						leftComponent && { marginLeft: 9 },
						KVStore.get('language') === 'ka'
							? { textTransform: 'uppercase' }
							: {},
					]}>
					{text}
				</AppText>
			)}
			{rightComponent}
		</Pressable>
	)
}

const _styles = (theme: Theme) => {
	return StyleSheet.create({
		button: {
			height: 45,
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
		},
		buttonText: {
			color: theme.color.textPrimary,
		},
	})
}
