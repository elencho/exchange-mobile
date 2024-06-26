import React, { forwardRef } from 'react'
import { StyleSheet, View, Pressable, TextInput } from 'react-native'
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
} from 'react-native-reanimated'
import Close from '../../assets/images/Close'
import Search from '../../assets/images/Search'
import colors from '../../constants/colors'
import { IS_ANDROID } from '../../constants/system'
import AppSwitcher from '../AppSwitcher'
import AppText from '../AppText'

const BalanceSearchBar = forwardRef(
	(
		{
			setShowZeroBalances,
			type,
			value,
			showZeroBalances,
			animatedValue,
			hideButtonsHandler,
			showButtonsHandler,
		},
		ref
	) => {
		const inputStyle = useAnimatedStyle(() => {
			return {
				width: `${animatedValue.value}%`,
				borderRadius: 6,
				borderWidth: 1,
				borderColor: interpolateColor(
					animatedValue.value,
					[8, 100],
					[colors.PRIMARY_BACKGROUND, colors.SECONDARY_PURPLE]
				),
			}
		})

		const closeBtn = useAnimatedStyle(() => {
			return { opacity: interpolate(animatedValue.value, [8, 100], [0, 1]) }
		})

		const Right = () => (
			<Animated.View style={closeBtn}>
				<Pressable
					style={styles.searchIcon}
					hitSlop={50}
					onPress={hideButtonsHandler}>
					<Close />
				</Pressable>
			</Animated.View>
		)
		const toggleZeroBalances = () => setShowZeroBalances(!showZeroBalances)

		const Left = () => (
			<Pressable
				hitSlop={50}
				onPress={showButtonsHandler}
				style={{ zIndex: 100 }}>
				<Search height={20} width={20} />
			</Pressable>
		)
		return (
			<View style={styles.container}>
				<Animated.View style={[styles.input, inputStyle]}>
					<Left />

					<TextInput
						style={styles.inputText}
						value={value}
						ref={ref}
						onChangeText={type}
						selectionColor={'#FFFFFF'}
					/>

					<Right />
				</Animated.View>
				<View style={styles.wrapper}>
					<AppSwitcher onToggle={toggleZeroBalances} isOn={!showZeroBalances} />
					<AppText calendarDay style={styles.secondary}>
						Hide Zero Balances
					</AppText>
				</View>
			</View>
		)
	}
)

export default BalanceSearchBar

const styles = StyleSheet.create({
	container: {
		paddingBottom: 10,
		alignItems: 'flex-start',
		flex: 1,
		justifyContent: 'center',
		paddingTop: 10,
		backgroundColor: colors.PRIMARY_BACKGROUND,
	},
	input: {
		position: 'absolute',
		flex: 1,
		right: 0,
		width: '100%',
		height: 44,
		paddingHorizontal: 20,
		zIndex: 99,
		backgroundColor: colors.PRIMARY_BACKGROUND,
		flexDirection: 'row',
		alignItems: 'center',
	},
	wrapperBox: {
		height: 50,
	},
	hide: {
		flexDirection: 'row',
		alignItems: 'center',

		flex: 1,
	},
	wrapper: {
		flexDirection: 'row',
		flex: 1,
		textAlign: 'center',
		alignItems: 'center',
	},
	searchInput: {
		borderWidth: 1,
		borderRadius: 6,
		height: 45,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 11,
		borderColor: colors.SECONDARY_PURPLE,
		zIndex: 1,
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		marginLeft: 20,
	},
	selected: {
		backgroundColor: colors.SECONDARY_TEXT,
		borderRadius: 20,
		width: '75%',
		height: '75%',
	},
	searchIcon: {
		zIndex: 99,
	},
	inputText: {
		borderRadius: 6,
		fontFamily: 'Ubuntu_Medium',
		fontSize: 14,
		lineHeight: IS_ANDROID ? 18 : null,
		flex: 1,
		color: colors.PRIMARY_TEXT,
		height: '100%',
		marginLeft: 14,
	},
})
