import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import Eng from '@assets/images/English.svg'
import Geo from '@assets/images/Georgian.svg'
import Arrow from '@assets/images/SwitcherArrow.svg'
import { useTheme, Theme } from '@theme/index'
import AppText from '@components/text/index'
import useAnimation from '@app/refactor/screens/auth/welcome/components/language-switcher/animation'
import { RootState } from '@app/refactor/redux/rootReducer'
import { setLanguage } from '@store/redux/common/slice'

const LanguageSwitcher = () => {
	const dispatch = useDispatch()
	const { styles } = useTheme(_styles)

	const language = useSelector((state: RootState) => state.common.language)

	const { fillStyle, outlineStyle, toggleAnimation } = useAnimation()

	const onPress = () => {
		toggleAnimation()
		const newLanguage = language === 'ka' ? 'en' : 'ka'
		dispatch(setLanguage(newLanguage))
	}

	const flagIcon = language === 'ka' ? <Geo /> : <Eng />
	const curLanguageText = language === 'en' ? 'English' : 'ქართული'

	const arrowMargin = { marginTop: 0 }

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Animated.View style={[outlineStyle, styles.row]}>
				{flagIcon}
				<AppText medium={true} style={styles.text}>
					{curLanguageText}
				</AppText>
				<Arrow style={arrowMargin} />
			</Animated.View>
			<Animated.View style={[fillStyle, styles.row]}>
				{flagIcon}
				<AppText medium={true} style={styles.text}>
					{curLanguageText}
				</AppText>
				<Arrow style={arrowMargin} />
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
			borderRadius: 50,
			justifyContent: 'center',
			alignItems: 'center',
		},
		text: {
			color: theme.color.textSecondary,
			marginHorizontal: 8,
			textAlign: 'justify',
		},
		row: {
			marginHorizontal: 10,
			flexDirection: 'row',
			position: 'absolute',
			alignItems: 'center',
		},
	})
}

export default LanguageSwitcher
