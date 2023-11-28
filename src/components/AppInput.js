import React, { memo, useEffect, useRef, useState } from 'react'
import {
	TextInput,
	StyleSheet,
	View,
	Animated,
	Easing,
	TouchableWithoutFeedback,
	Pressable,
} from 'react-native'
import Close from '../assets/images/Close'
import AppText from '../components/AppText'
import colors from '../constants/colors'
import { IS_ANDROID } from '../constants/system'

const AppInput = ({
	label = '',
	left = null,
	activeRight = null,
	right = null,
	style,
	value,
	error = false,
	errorText = null,
	isForModal,
	labelBackgroundColor = colors.PRIMARY_BACKGROUND,
	disabled,
	handleClear,
	onFocus,
	editable,
	isSearch,
	onChangeText = () => {},
	...rest
}) => {
	const [isFocused, setIsFocused] = useState(false)

	const inputRef = useRef(null)
	const focusAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(focusAnim, {
			toValue: isFocused || value ? 1 : 0,
			duration: 150,
			easing: Easing.bezier(0.4, 0, 0.2, 1),
			useNativeDriver: false,
		}).start()
	}, [focusAnim, isFocused, value])

	let borderColor = error
		? colors.ERROR_TEXT
		: isFocused
		? colors.SECONDARY_PURPLE
		: disabled
		? 'rgba(105, 111, 142, 0.4)'
		: '#42475D'

	const rightComponent = isFocused && activeRight ? activeRight : right
	const isPlaceholder = !isFocused && !value && !right

	return (
		<View style={style}>
			<View style={[styles.inputContainer, { borderColor }]}>
				{left}

				<TextInput
					style={[styles.input, disabled && styles.disabledInput]}
					ref={inputRef}
					onBlur={() => setIsFocused(false)}
					onFocus={() => setIsFocused(true)?.bind(onFocus)}
					value={value}
					placeholderTextColor={colors.SECONDARY_TEXT}
					onChangeText={(text) => onChangeText(text)}
					editable={!disabled && editable}
					{...rest}
				/>

				{label ? (
					<TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
						<Animated.View
							style={[
								styles.labelContainer,
								{
									width: isPlaceholder ? '100%' : null,
									backgroundColor: focusAnim.interpolate({
										inputRange: [0, 1],
										outputRange: ['transparent', labelBackgroundColor],
									}),
									opacity:
										isSearch &&
										focusAnim.interpolate({
											inputRange: [0, 1],
											outputRange: [1, 0],
										}),

									transform: [
										{
											scale: focusAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [1, 0.75],
											}),
										},
										{
											translateY: focusAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [0, -31],
											}),
										},
										{
											translateX: focusAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [10, 0],
											}),
										},
									],
								},
							]}>
							<AppText
								body
								numberOfLines={1}
								style={{
									color:
										isFocused && error
											? colors.ERROR_TEXT
											: isFocused
											? colors.PRIMARY_PURPLE
											: error
											? colors.ERROR_TEXT
											: colors.SECONDARY_TEXT,
									opacity: disabled ? 0.6 : 1,
									backgroundColor: colors.PRIMARY_BACKGROUND,
								}}>
								{label}
							</AppText>
						</Animated.View>
					</TouchableWithoutFeedback>
				) : null}

				{rightComponent && (
					<View style={styles.icon}>
						{handleClear && value.length > 0 ? (
							<Pressable
								style={{
									padding: 10,
									paddingRight: 2,
								}}
								onPress={handleClear}>
								<Close width={10} height={10} />
							</Pressable>
						) : (
							rightComponent
						)}
					</View>
				)}
			</View>
			{errorText && (
				<AppText small style={styles.errorText}>
					{errorText}
				</AppText>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	errorText: {
		color: '#F45E8C',
		marginTop: 8,
	},
	input: {
		fontFamily: 'Ubuntu_Medium',
		fontSize: 14,
		lineHeight: IS_ANDROID ? 18 : null,
		flex: 1,
		color: colors.PRIMARY_TEXT,
		height: '100%',
		marginRight: 10,
	},
	disabledInput: {
		color: colors.SECONDARY_TEXT,
		opacity: 0.6,
	},
	Gesinput: {
		fontFamily: 'Ubuntu_Medium',
		fontSize: 14,
		lineHeight: 18,
		flex: 1,
		paddingLeft: 22,
		color: colors.PRIMARY_TEXT,
		height: '100%',
		marginRight: 10,
		position: 'absolute',
		width: 250,
	},
	inputContainer: {
		borderWidth: 1,
		height: 44,
		paddingHorizontal: 22,
		flexDirection: 'row',
		alignItems: 'center',
		// marginTop: 11,
	},
	labelContainer: {
		position: 'absolute',
		paddingHorizontal: 12,
		height: 25,
		overflow: 'visible',
		justifyContent: 'center',
	},
	icon: {
		alignItems: 'flex-end',
		zIndex: -1,
	},
})

export default memo(AppInput)
