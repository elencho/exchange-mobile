import { Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import AppText from 'components/AppText'
import { RootStateOrAny } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from 'redux/profile/actions'
import { switchLanguage } from 'utils/i18n'
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

import Eng from 'assets/images/English.svg'
import Arrow from 'assets/images/SwitcherArrow.svg'
import { Images, Language } from 'refactor/common/constants'
import { Theme } from 'refactor/common/theme'
import { useTheme } from 'refactor/common/theme/use-theme'

export default function LanguageSwitcher() {
	const Styles = useTheme(createStyles)
	const dispatch = useDispatch()

	const defaultLanguage = useSelector(
		(state: RootStateOrAny) => state.profile.language
	)
	const isGeo = defaultLanguage === 'ka'
	const chosenLanguageText = defaultLanguage === 'en' ? 'English' : 'ქართული'
	const icon = isGeo ? (
		<Image source={Images.geo} style={Styles.flag} />
	) : (
		<Eng />
	)
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
		<Pressable style={Styles.container} onPress={onPress}>
			<Animated.View style={[outlineStyle, Styles.row]}>
				{icon}
				<AppText style={Styles.text}>{chosenLanguageText}</AppText>
				<Arrow />
			</Animated.View>
			<Animated.View style={[fillStyle, Styles.row]}>
				{icon}
				<AppText medium style={Styles.text}>
					{chosenLanguageText}
				</AppText>
				<Arrow />
			</Animated.View>
		</Pressable>
	)
}

const createStyles = (theme: Theme) => {
	return StyleSheet.create({
		container: {
			alignSelf: 'center',
			marginBottom: 40,
			borderWidth: 1,
			borderColor: theme.color.border,
			width: 140,
			height: 40,
			paddingHorizontal: 30,
			borderRadius: 50,
		},
		text: {
			color: theme.color.onSecondary,
			marginHorizontal: 5,
			textAlign: 'center',
			width: 70,
		},
		row: {
			flexDirection: 'row',
			position: 'absolute',
			left: 16,
			alignItems: 'center',
			height: 24,
			top: 5,
		},
		flag: {
			height: 24,
			width: 24,
		},
	})
}
