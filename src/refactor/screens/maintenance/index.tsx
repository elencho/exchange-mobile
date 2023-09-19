import React, { useState, useEffect } from 'react'
import { ImageBackground, Linking, StyleSheet, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import SplashScreen from 'react-native-splash-screen'
import { Images } from 'refactor/common/constants'
import { checkReadiness } from 'utils/appUtils'
import Logo from 'assets/images/Logo.svg'
import Gear from 'assets/images/Gear.svg'
import { Button } from 'refactor/common/components/button'
import { COLORS_DARK } from 'refactor/setup/theme/colors'
import AppText from 'components/AppText'
import { Theme } from 'refactor/setup/theme'
import { useTheme } from 'refactor/setup/theme/index.context'
import Text from 'refactor/common/components/text'

export default function Maintanance(navigation: any) {
	const { styles } = useTheme(_styles)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		SplashScreen.hide()
	}, [])

	const goToSupport = () =>
		Linking.openURL('https://support.cryptal.com/hc/en-us/requests/new')

	const refresh = async () => {
		setLoading(true)
		const { status } = await checkReadiness(DeviceInfo.getVersion())
		if (status !== 'DOWN') navigation.navigate('Welcome')
		setLoading(false)
	}

	const Margin = (margin: { margin: number }) => (
		<View style={{ marginVertical: margin.margin / 2 }} />
	)

	return (
		<ImageBackground
			resizeMode="contain"
			source={Images.stars}
			style={styles.background}>
			<Logo />
			<Margin margin={80} />
			<Gear />
			<Text style={styles.header}>Hey there!</Text>
			<Text style={styles.secondary}>
				We've been hard at work bringing new improvements to the platform. Soon
				the platform will be fully operational.
			</Text>
			<Margin margin={22} />
			<Text style={styles.secondary}>
				Thanks for your patience and understanding.
			</Text>
			<Button
				variant="primary"
				text="Refresh"
				loading={loading}
				onPress={refresh}
				style={styles.button}
			/>
			<View style={styles.footer}>
				<Text style={styles.supportText}>
					Need Help? Contact
					<Button variant="text" text="Support" onPress={goToSupport} />
				</Text>
				<Margin margin={14} />
				<Text style={styles.contactText}>
					+995 322 053 253 | Support@cryptal.com
				</Text>
			</View>
		</ImageBackground>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		background: {
			flex: 1,
			alignItems: 'center',
			backgroundColor: theme.color.backgroundPrimary,
			paddingVertical: 30,
		},
		button: {
			width: '50%',
			marginTop: 64,
		},
		footer: {
			position: 'absolute',
			bottom: 22,
			left: 60,
			right: 60,
		},
		supportText: {
			textAlign: 'center',
			color: '#838BB2CC',
		},
		contactText: {
			textAlign: 'center',
			color: 'rgba(131, 139, 178, 0.8)',
		},
		header: {
			color: theme.color.textPrimary,
			fontFamily: 'Ubuntu_Medium',
			fontSize: 24,
			marginTop: 22,
			marginBottom: 15,
			lineHeight: 28,
		},
		secondary: {
			color: '#838BB2',
			textAlign: 'center',
			marginHorizontal: 30,
			lineHeight: 21,
		},
	})
