import AppText from 'components/AppText'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { CommonProps } from 'refactor/common/components/button'
import { Component } from 'refactor/common/components/types'
import { Theme } from 'refactor/common/theme'
import { COLORS_DARK } from 'refactor/common/theme/colors'
import { MaterialIndicator } from 'react-native-indicators'
import { useTheme } from 'refactor/common/theme/use-theme'

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
	const Styles = useTheme(createStyles)

	return (
		<Pressable
			disabled={disabled}
			style={[
				Styles.button,
				style,
				{
					backgroundColor: disabled
						? COLORS_DARK.buttonDisabled
						: backgroundColor,
					//TODO: Fix theme access
				},
			]}
			onPress={loading ? null : onPress}>
			{leftComponent}
			{loading ? (
				<MaterialIndicator color="#FFFFFF" animationDuration={3000} size={20} />
			) : (
				<AppText
					body
					medium
					style={[Styles.buttonText, leftComponent && { marginLeft: 9 }]}>
					{text}
				</AppText>
			)}
			{rightComponent}
		</Pressable>
	)
}

const createStyles = (theme: Theme) => {
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
