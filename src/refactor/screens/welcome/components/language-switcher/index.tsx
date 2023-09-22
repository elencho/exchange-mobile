import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Animated from 'react-native-reanimated'
import { RootStateOrAny } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import Eng from '@assets/images/English.svg'
import Geo from '@assets/images/Georgian.svg'
import Arrow from '@assets/images/SwitcherArrow.svg'
import { useTheme, Theme } from '@theme/index'
import AppText from '@components/text/index'
import { setLanguage } from '@app/redux/profile/actions'
import { Language } from '@app/refactor/common/constants'
import useAnimation from '@app/refactor/screens/welcome/components/language-switcher/animation'
import { switchLanguage } from '@app/utils/i18n'

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

	const flagIcon = defaultLanguage === 'ka' ? <Geo /> : <Eng />
	const curLanguageText = defaultLanguage === 'en' ? 'English' : 'ქართული'

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Animated.View style={[outlineStyle, styles.row]}>
				{flagIcon}
				<AppText variant="l" style={styles.text}>
					{curLanguageText}
				</AppText>
				<Arrow />
			</Animated.View>
			<Animated.View style={[fillStyle, styles.row]}>
				{flagIcon}
				<AppText variant="l" style={styles.text}>
					{curLanguageText}
				</AppText>
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
	})
}
