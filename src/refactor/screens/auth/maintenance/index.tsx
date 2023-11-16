import React, { useState } from 'react'
import { ImageBackground, Linking, StyleSheet, Text, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import Gear from '@assets/images/Gear.svg'
import Logo from '@assets/images/Logo.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import { Images } from '@app/refactor/common/constants'
import { checkReadiness } from '@app/utils/appUtils'

export default function Maintenance(navigation: any) {
	const { styles } = useTheme(_styles)
	const [loading, setLoading] = useState(false)

	const goToSupport = () =>
		Linking.openURL('https://support.cryptal.com/hc/en-us/requests/new')

	const refresh = async () => {
		setLoading(true)
		const { status } = await checkReadiness(DeviceInfo.getVersion())
		if (status !== 'DOWN') navigation.navigate('Welcome')
		setLoading(false)
	}

	const Margin = (margin: { margin: number }) => (
		<View style={{ marginHorizontal: margin.margin / 2 }} />
	)

	return (
		<ImageBackground
			resizeMode="contain"
			source={Images.stars}
			style={styles.background}>
			<Logo style={styles.logo} />
			<View style={styles.content}>
				<Margin margin={80} />
				<Gear />
				<AppText style={styles.header}>Hey there!</AppText>
				<AppText style={styles.secondary}>
					We've been hard at work bringing new improvements to the platform.
					Soon the platform will be fully operational.
				</AppText>
				<Margin margin={22} />
				<AppText style={styles.secondary}>
					Thanks for your patience and understanding.
				</AppText>
				<AppButton
					variant="primary"
					text="Refresh"
					loading={loading}
					onPress={refresh}
					style={styles.button}
				/>
			</View>
			<View style={styles.footer}>
				<AppText style={styles.supportText}>
					Need Help? Contact
					<View style={{ width: 4 }} />
					<AppButton
						variant="text"
						text="Support"
						onPress={goToSupport}
						style={styles.support}
					/>
				</AppText>
				<Margin margin={14} />
				<AppText style={styles.contactText}>
					+995 322 053 253 | Support@cryptal.com
				</AppText>
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
			justifyContent: 'center',
			flexDirection: 'column',
		},
		content: {
			alignItems: 'center',
			width: '100%',
		},
		logo: {
			position: 'absolute',
			marginTop: 15,
			top: 55,
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
			fontFamily: theme.font.medium,
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
		support: {
			marginLeft: 10,
		},
	})
