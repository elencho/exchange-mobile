import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import Eng from '@assets/images/English.svg'
import Geo from '@assets/images/Georgian.svg'
import Arrow from '@assets/images/SwitcherArrow.svg'
import { useTheme, Theme } from '@theme/index'
import AppText from '@components/text/index'
import KVStore from '@store/kv'
import useAnimation from '@app/refactor/screens/auth/welcome/components/language-switcher/animation'
import { switchLanguage } from '@app/utils/i18n'
import { RootState } from '@app/refactor/redux/rootReducer'
import { setLanguage } from '@store/redux/common/slice'
import { setLanguage as setLanguageOld } from '@app/redux/profile/actions'

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

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Animated.View style={[outlineStyle, styles.row]}>
				{flagIcon}
				<AppText style={styles.text}>{curLanguageText}</AppText>
				<Arrow style={styles.arrow} />
			</Animated.View>
			{/* <Animated.View style={[fillStyle, styles.row]}>
				{flagIcon}
				<AppText medium={true} style={styles.text} numberOfLines={1}>
					{curLanguageText}
				</AppText>
				<Arrow style={styles.arrow} />
			</Animated.View> */}
		</Pressable>
	)
}

const _styles = (theme: Theme) => {
	return StyleSheet.create({
		container: {
			alignSelf: 'center',
			marginBottom: 140, //40
			borderWidth: 1,
			borderColor: theme.color.border,
			height: 140, //40
			paddingHorizontal: 30,
			borderRadius: 50,
			justifyContent: 'flex-end',
		},
		row: {
			backgroundColor: 'green',
			flexDirection: 'row',
			alignItems: 'center',
		},
		text: {
			color: 'white', //theme.color.textSecondary,
			marginHorizontal: 5,
			textAlign: 'center',
		},
		arrow: {
			backgroundColor: 'yellow',
		},
	})
}
