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
}) => {
	return (
		<Pressable
			style={[
				styles.container,
				style,
				error && { borderColor: colors.ERROR_TEXT },
			]}
			onPress={!disabled ? handlePress : null}>
			{selectedText ? (
				<View style={styles.row}>
					{icon && <View style={styles.icon}>{icon}</View>}
					<AppText
						medium
						body
						noTranslate={noTranslate}
						style={[
							styles.selectedText,
							error && { color: colors.ERROR_TEXT },
							disabled && { color: colors.SECONDARY_TEXT },
						]}
						numberOfLines={1}>
						{selectedText}
					</AppText>
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
							disabled && { color: colors.SECONDARY_TEXT, opacity: 0.3 },
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
					<Arrow />
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
		marginLeft: 8,
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
		marginLeft: 12,
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
	icon: {
		marginRight: 10,
	},
})
