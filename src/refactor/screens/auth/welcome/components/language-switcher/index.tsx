import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import Eng from '@assets/images/English.svg'
import Geo from '@assets/images/Georgian.svg'
import Arrow from '@assets/images/SwitcherArrow.svg'
import { useTheme, Theme } from '@theme/index'
import AppText from '@components/text/index'
import KVStore from '@store/kv'
import { setLanguage } from '@app/redux/profile/actions'
import useAnimation from '@app/refactor/screens/auth/welcome/components/language-switcher/animation'
import { switchLanguage } from '@app/utils/i18n'

const LanguageSwitcher = () => {
	const dispatch = useDispatch()
	const { styles } = useTheme(_styles)
	const { fillStyle, outlineStyle, toggleAnimation } = useAnimation()

	const [lang, setLang] = useState(KVStore.get('language'))

	const onPress = () => {
		toggleAnimation()
		const newLang = lang === 'ka' ? 'en' : 'ka'
		setLang(newLang)
		dispatch(setLanguage(newLang)) //TODO: Remove
		switchLanguage(newLang)
	}

	const flagIcon = lang === 'ka' ? <Geo /> : <Eng />
	const curLanguageText = lang === 'en' ? 'English' : 'ქართული'

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Animated.View style={[outlineStyle, styles.row]}>
				{flagIcon}
				<AppText style={styles.text}>{curLanguageText}</AppText>
				<Arrow />
			</Animated.View>
			<Animated.View style={[fillStyle, styles.row]}>
				{flagIcon}
				<AppText medium={true} style={styles.text}>
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

export default LanguageSwitcher
