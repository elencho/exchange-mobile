import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from '@assets/images/Logo.svg'
import { Theme, useTheme } from '@theme/index'
import useInitApp from '@app/refactor/screens/auth/splash/use-init-app'
import { Screens } from '@app/refactor/setup/nav/types'

interface Props extends NativeStackScreenProps<Screens, 'Splash'> {}

const Splash = ({ navigation }: Props) => {
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
