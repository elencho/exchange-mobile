import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import Eng from '../assets/images/English.svg'
import Geo from '../assets/images/Georgian.svg'
import Arrow from '../assets/images/SwitcherArrow.svg'
import colors from '../constants/colors'
import images from '../constants/images'
import { setLanguage } from '../redux/profile/actions'
import { switchLanguage } from '../utils/i18n'
import AppText from './AppText'

const LanguageSwitcher = () => {
	const defaltLanguage = useSelector((state) => state.common.language)
	const dispatch = useDispatch()

	const isGeo = defaltLanguage === 'ka'
	const chosenLanguageText = defaltLanguage === 'en' ? 'English' : 'ქართული'
	const icon = isGeo ? <Geo /> : <Eng />
	const liked = useSharedValue(0)

	const onPress = () => {
		liked.value = withSpring(liked.value ? 0 : 1)
		const chosenLang = isGeo ? 'en' : 'ka'
		dispatch(setLanguage(chosenLang))
		switchLanguage(chosenLang)
	}

	const fillStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: liked.value }],
			opacity: liked.value,
		}
	})
	const outlineStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
				},
			],
		}
	})

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Animated.View style={[outlineStyle, styles.row]}>
				{icon}
				<AppText style={styles.text}>{chosenLanguageText}</AppText>
				<Arrow />
			</Animated.View>
			<Animated.View style={[fillStyle, styles.row]}>
				{icon}
				<AppText medium style={styles.text}>
					{chosenLanguageText}
				</AppText>
				<Arrow />
			</Animated.View>
		</Pressable>
	)
}

export default LanguageSwitcher

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		marginBottom: 45,
		borderWidth: 1,
		borderColor: colors.SECONDARY_TEXT,
		width: 140,
		height: 40,
		paddingHorizontal: 30,
		borderRadius: 50,
	},
	text: {
		color: colors.SECONDARY_TEXT,
		marginHorizontal: 5,
		textAlign: 'center',
		width: 70,
		fontSize: 13,
	},
	row: {
		flexDirection: 'row',
		position: 'absolute',
		left: 16,
		alignItems: 'center',

		height: 24,
		top: 7,
	},
	flag: {
		height: 24,
		width: 24,
	},
})
