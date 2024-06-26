import React, {
	ReactNode,
	forwardRef,
	memo,
	useEffect,
	useRef,
	useState,
} from 'react'
import {
	NativeSyntheticEvent,
	Pressable,
	TextInputFocusEventData,
	TextInputProps,
} from 'react-native'
import {
	TextInput,
	StyleSheet,
	View,
	Animated,
	Easing,
	TouchableWithoutFeedback,
} from 'react-native'
import Close from '@assets/images/Close.svg'
import { useTheme, Theme } from '@theme/index'
import AppText from '@components/text/index'
import { System, mergeRefs } from '@app/refactor/common/util'

type Props = TextInputProps & {
	label?: string
	labelBackgroundColor?: string
	disabled?: boolean
	error?: string | boolean | null | undefined
	rightComponent?: ReactNode
	onFocusRightComponent?: ReactNode
	handleClear?: () => void
	onFocusOrChange?: () => void
}

const AppInput = forwardRef<TextInput, Props>((props: Props, ref) => {
	const {
		value,
		label = '',
		onChangeText,
		error = '',
		disabled = false,
		style,
		labelBackgroundColor,
		rightComponent,
		onBlur,
		onFocus,
		onFocusRightComponent,
		onFocusOrChange,
		handleClear,
	} = props
	const { theme, styles } = useTheme(_style)

	const [isFocused, setIsFocused] = useState(false)
	const inputRef = useRef<TextInput>(null)
	const focusAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(focusAnim, {
			toValue: isFocused || value ? 1 : 0,
			duration: 150,
			easing: Easing.bezier(0.4, 0, 0.2, 1),
			useNativeDriver: false,
		}).start()
	}, [focusAnim, isFocused, value])

	const borderColor = error
		? theme.color.error
		: isFocused
		? theme.color.brandSecondary
		: '#42475D'

	const isPlaceholder = !isFocused && !value && !rightComponent
	const rightChild =
		isFocused && onFocusRightComponent ? onFocusRightComponent : rightComponent

	const labelColor =
		isFocused && error
			? theme.color.error
			: isFocused
			? theme.color.brandPrimary
			: error
			? theme.color.error
			: theme.color.textSecondary

	const labelAnimation = {
		width: isPlaceholder ? '100%' : undefined,
		backgroundColor: focusAnim.interpolate({
			inputRange: [0, 1],
			outputRange: [
				'transparent',
				labelBackgroundColor ?? theme.color.backgroundPrimary,
			],
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
	}

	return (
		<View style={style}>
			<View style={[styles.inputContainer, { borderColor }]}>
				<TextInput
					{...props}
					style={[styles.input, disabled && styles.disabledInput]}
					ref={mergeRefs(inputRef, ref)}
					onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
						setIsFocused(false)
						onBlur?.(e)
					}}
					onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
						setIsFocused(true)
						onFocus?.(e)
						onFocusOrChange?.()
					}}
					value={value}
					placeholderTextColor={theme.color.textSecondary}
					onChangeText={(text) => {
						onChangeText?.(text)
						onFocusOrChange?.()
					}}
					editable={!disabled}
					autoCapitalize={props.autoCapitalize || 'none'}
				/>

				{label ? (
					<TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
						<Animated.View style={[styles.labelContainer, labelAnimation]}>
							<AppText
								variant="l"
								style={{
									color: labelColor,
									opacity: disabled ? 0.5 : 1,
								}}>
								{label}
							</AppText>
						</Animated.View>
					</TouchableWithoutFeedback>
				) : null}
				{rightChild && (
					<View style={styles.icon}>
						{handleClear && value?.length ? (
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
			{error && error.toString() !== 'true' && (
				<AppText variant="s" style={styles.errorText}>
					{error}
				</AppText>
			)}
		</View>
	)
})

const _style = (theme: Theme) =>
	StyleSheet.create({
		errorText: {
			color: theme.color.error,
			position: 'absolute',
			bottom: -23,
		},
		input: {
			fontFamily: theme.font.medium,
			fontSize: 14,
			lineHeight: System.isAndroid ? 18 : null,
			flex: 1,
			color: theme.color.textPrimary,
			height: '100%',
			marginRight: 10,
		},
		disabledInput: { color: theme.color.textSecondary },
		Gesinput: {
			fontFamily: theme.font.medium,
			fontSize: 14,
			lineHeight: 18,
			flex: 1,
			paddingLeft: 22,
			color: theme.color.textPrimary,
			height: '100%',
			marginRight: 10,
			position: 'absolute',
			width: 250,
		},
		inputContainer: {
			borderRadius: 6,
			borderWidth: 1,
			height: 44,
			paddingHorizontal: 22,
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: 11,
		},
		labelContainer: {
			position: 'absolute',
			paddingHorizontal: 14,
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
