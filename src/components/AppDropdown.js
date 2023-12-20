import React from 'react'
import { StyleSheet, Pressable, View } from 'react-native'
import Arrow from '../assets/images/Arrow'
import Close from '../assets/images/Close'
import colors from '../constants/colors'
import AppText from './AppText'

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
}) => {
	return (
		<Pressable
			style={[
				styles.container,
				style,
				error && { borderColor: colors.ERROR_TEXT },
				disabled && { borderColor: 'rgba(105, 111, 142, 0.3)' },
				totalText && { height: 60 },
			]}
			onPress={!disabled ? handlePress : null}>
			{selectedText ? (
				<View style={styles.row}>
					{icon && <View style={styles.icon}>{icon}</View>}
					<View style={icon && { marginRight: 30, marginLeft: 14 }}>
						<AppText
							medium
							body
							noTranslate={noTranslate}
							style={[
								styles.selectedText,
								error && { color: colors.ERROR_TEXT },
								disabled && !isOneMethod && { color: colors.SECONDARY_TEXT },
							]}
							numberOfLines={1}>
							{selectedText}
						</AppText>
						{totalText && (
							<AppText subtext style={styles.secondaryText} numberOfLines={1}>
								{totalText}
							</AppText>
						)}
					</View>
				</View>
			) : activeLabel ? (
				<AppText medium body style={styles.selectedText}>
					{activeLabel}
				</AppText>
			) : (
				<AppText
					medium
					body
					style={[
						styles.label,
						error && { color: colors.ERROR_TEXT },
						disabled && { color: colors.SECONDARY_TEXT, opacity: 0.6 },
					]}>
					{label}
				</AppText>
			)}
			{withLabel && selectedText && (
				<View style={styles.withLabelContainer}>
					<AppText
						subtext
						style={[
							styles.withLabelText,
							disabled && { color: colors.SECONDARY_TEXT, opacity: 0.6 },
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

export default AppDropdown

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		paddingHorizontal: 22,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: colors.BORDER,
		height: 44,
	},
	label: {
		color: colors.SECONDARY_TEXT,
	},
	withLabelContainer: {
		position: 'absolute',
		left: 13,
		top: -9,
		paddingHorizontal: 8,
		backgroundColor: colors.PRIMARY_BACKGROUND,
	},
	withLabelText: {
		color: colors.SECONDARY_TEXT,
	},
	selectedText: {
		color: colors.PRIMARY_TEXT,
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
		color: colors.SECONDARY_TEXT,
		marginTop: 4,
	},
})
