import React from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from '@assets/images/Logo.svg'
import { Theme, useTheme } from '@theme/index'
import useInitApp from '@app/refactor/screens/auth/splash/use-init-app'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import useNotificationsAndroid from '@app/screens/useNotificationsAndroid'

const Splash = (props: ScreenProp<'Splash'>) => {
	const { styles } = useTheme(_styles)

	useNotificationsAndroid()
	useInitApp(props)

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
