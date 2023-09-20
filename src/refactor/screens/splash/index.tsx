import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Easing, StyleSheet, View } from 'react-native'
import { Animated } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Logo from '@assets/images/Logo.svg'
import { Theme, useTheme } from '@theme/index'
import useInitApp from '@app/refactor/screens/splash/use-init-app'
import { ScreenProps } from '@app/refactor/setup/nav/types'

interface Props extends NativeStackScreenProps<ScreenProps, 'Splash'> {}

const Splash = ({ navigation }: Props) => {
	SplashScreen.hide() // TODO: Remove library

	const { styles } = useTheme(_styles)

	useInitApp(navigation)

	return (
		<View style={styles.container}>
			<Logo width={80} height={'100%'} />
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.color.backgroundPrimary,
			alignItems: 'center',
			justifyContent: 'center',
		},
	})

export default Splash
