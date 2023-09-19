import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { CommonProps } from 'refactor/common/components/button'
import { Component } from 'refactor/common/components/types'
import { Theme } from 'refactor/setup/theme'
import { MaterialIndicator } from 'react-native-indicators'
import Text from 'refactor/common/components/text'
import { useTheme } from 'refactor/setup/theme/index.context'

export type PrimaryProps = {
	variant: 'primary'
	loading?: boolean
	backgroundColor?: string
	leftComponent?: Component
	rightComponent?: Component
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
				style,
				{
					backgroundColor: disabled
						? theme.color.buttonDisabled
						: backgroundColor,
				},
			]}
			onPress={loading ? null : onPress}>
			{leftComponent}
			{loading ? (
				<MaterialIndicator color="#FFFFFF" animationDuration={3000} size={20} />
			) : (
				<Text
					variant="l"
					style={[styles.buttonText, leftComponent && { marginLeft: 9 }]}>
					{text}
				</Text>
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
