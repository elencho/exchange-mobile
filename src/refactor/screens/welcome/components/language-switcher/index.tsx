import { Image, ImageStyle, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import AppText from 'components/AppText'
import { RootStateOrAny } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from 'redux/profile/actions'
import { switchLanguage } from 'utils/i18n'
import Animated from 'react-native-reanimated'

import Eng from 'assets/images/English.svg'
import Arrow from 'assets/images/SwitcherArrow.svg'
import { Images, Language } from 'refactor/common/constants'
import { Theme } from 'refactor/setup/theme'
import useAnimation from 'refactor/screens/welcome/components/language-switcher/animation'
import { useTheme } from 'refactor/setup/theme/index.context'
import Text from 'refactor/common/components/text'

export default function LanguageSwitcher() {
	const dispatch = useDispatch()
	const { styles } = useTheme(_styles)
	const { fillStyle, outlineStyle, toggleAnimation } = useAnimation()

	const defaultLanguage: Language = useSelector(
		(state: RootStateOrAny) => state.profile.language
	)

	const onPress = () => {
		toggleAnimation()
		const newLanguage = defaultLanguage === 'ka' ? 'en' : 'ka'
		dispatch(setLanguage(newLanguage))
		switchLanguage(newLanguage)
	}

	const defaultLanguageFlag =
		defaultLanguage === 'ka' ? (
			<Image source={Images.geo} style={styles.flag as ImageStyle} /> // TODO
		) : (
			<Eng />
		)
	const defaultLanguageText = defaultLanguage === 'en' ? 'English' : 'ქართული'

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Animated.View style={[outlineStyle, styles.row]}>
				{defaultLanguageFlag}
				<Text style={styles.text}>{defaultLanguageText}</Text>
				<Arrow />
			</Animated.View>
			<Animated.View style={[fillStyle, styles.row]}>
				{defaultLanguageFlag}
				<Text style={styles.text}>{defaultLanguageText}</Text>
				<Arrow />
			</Animated.View>
		</Pressable>
	)
}

const _styles = (theme: Theme) => {
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
			color: theme.color.textSecondary,
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
