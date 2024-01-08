import React, { ReactNode } from 'react'
import { StyleSheet, Pressable, View, StyleProp, ViewStyle } from 'react-native'
import Arrow from '@assets/images/Arrow.svg'
import Close from '@assets/images/Close.svg'
import AppText from '@components/text/index'
import { Theme, useTheme } from '@theme/index'

type Props = {
	label: string | null
	activeLabel?: string
	selectedText?: string
	totalText?: string
	handlePress: () => void
	handleClear?: () => void
	style?: StyleProp<ViewStyle>
	icon?: ReactNode
	notClearable?: boolean
	error?: boolean
	disabled?: boolean
	hideArrow?: boolean
	noTranslate?: boolean
	isOneMethod?: boolean
	withLabel?: boolean
}

const AppDropdown = ({
	label,
	handlePress,
	handleClear,
	selectedText,
	style,
	icon,
	activeLabel,
	notClearable,
	withLabel = false,
	error,
	disabled,
	hideArrow,
	noTranslate,
	isOneMethod,
	totalText,
}: Props) => {
	const { styles, theme } = useTheme(_styles)

	return (
		<Pressable
			style={[
				styles.container,
				style,
				error && { borderColor: theme.color.error },
				disabled && { borderColor: 'rgba(105, 111, 142, 0.3)' },
				totalText != null && { height: 60 },
			]}
			onPress={!disabled ? handlePress : null}>
			{selectedText ? (
				<View style={styles.row}>
					{icon && <View style={styles.icon}>{icon}</View>}
					<View
						style={icon !== undefined && { marginRight: 30, marginLeft: 14 }}>
						<AppText
							medium
							variant="l"
							noTranslate={noTranslate}
							style={[
								styles.selectedText,
								error && { color: theme.color.error },
								disabled &&
									!isOneMethod && { color: theme.color.textSecondary },
							]}
							numberOfLines={1}>
							{selectedText}
						</AppText>
						{totalText && (
							<AppText
								variant="l"
								style={styles.secondaryText}
								numberOfLines={1}>
								{totalText}
							</AppText>
						)}
					</View>
				</View>
			) : activeLabel ? (
				<AppText variant="m" medium style={styles.selectedText}>
					{activeLabel}
				</AppText>
			) : (
				<AppText
					variant="l"
					medium
					style={[
						styles.label,
						error && { color: theme.color.error },
						disabled && { color: theme.color.textSecondary, opacity: 0.6 },
					]}>
					{label}
				</AppText>
			)}
			{withLabel && selectedText && (
				<View style={styles.withLabelContainer}>
					<AppText
						variant="l"
						style={[
							styles.withLabelText,
							disabled && { color: theme.color.textSecondary, opacity: 0.6 },
						]}>
						{label}
					</AppText>
				</View>
			)}

			<View>
				{selectedText && selectedText !== activeLabel && !notClearable ? (
					<Pressable style={styles.close} onPress={handleClear}>
						<Close width={9} height={9} />
					</Pressable>
				) : !hideArrow ? (
					<View style={{ marginLeft: -10 }}>
						<Arrow />
					</View>
				) : null}
			</View>
		</Pressable>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			borderWidth: 1,
			borderRadius: 6,
			paddingHorizontal: 22,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			borderColor: theme.color.border,
			height: 44,
		},
		label: {
			color: theme.color.textSecondary,
		},
		withLabelContainer: {
			position: 'absolute',
			left: 13,
			top: -9,
			paddingHorizontal: 8,
			backgroundColor: theme.color.backgroundPrimary,
		},
		withLabelText: {
			color: theme.color.textSecondary,
		},
		selectedText: {
			color: theme.color.textPrimary,
			flex: 0,
			marginRight: 10,
		},
		close: {
			width: 36,
			height: 30,
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: -15,
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
		},

		secondaryText: {
			color: theme.color.textSecondary,
			marginTop: 4,
		},
	})

export default AppDropdown
