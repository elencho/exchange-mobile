import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from '@assets/images/Logo.svg'
import { Theme, useTheme } from '@theme/index'
import useInitApp from '@app/refactor/screens/auth/splash/use-init-app'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import useNotificationsAndroid from '@app/screens/useNotificationsAndroid'
import { IS_IOS } from '@app/constants/system'

const Splash = (props: ScreenProp<'Splash'>) => {
	const { styles } = useTheme(_styles)
	const [shouldRender, setShouldRender] = useState(IS_IOS ? true : false)

	useNotificationsAndroid()
	useInitApp(props)

	useEffect(() => {
		setTimeout(() => {
			setShouldRender(true)
		}, 800)
	}, [])

	return (
		shouldRender && (
			<View style={styles.container}>
				<Logo width={80} height={'100%'} />
			</View>
		)
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
