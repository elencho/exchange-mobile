import React, { useEffect } from 'react'
import { Linking, StyleSheet, ViewStyle } from 'react-native'

import VersionCheck from 'react-native-version-check'
import SplashScreen from 'react-native-splash-screen'
import FastImage from 'react-native-fast-image'
import { APP_ID, packageName } from 'constants/system'
import { COLORS_DARK } from 'refactor/common/theme/colors'
import { Button } from 'refactor/common/components/button'
import AppText from 'components/AppText'
import Background from 'components/Background'
import Text from 'refactor/common/components/text'
import { useTheme } from 'refactor/common/theme/index.context'
import { Theme } from 'refactor/common/theme'

export default function UpdateAvailable() {
	const { styles } = useTheme(_styles)

	useEffect(() => {
		SplashScreen.hide()
	}, [])

	const update = async () => {
		const storeUrl = await VersionCheck.getStoreUrl({
			packageName,
			appID: APP_ID,
		})
		Linking.canOpenURL(storeUrl).then((supported) => {
			supported && Linking.openURL(storeUrl)
		})
	}

	return (
		<Background style={styles.container}>
			<FastImage
				style={{
					height: 130,
					width: 180,
				}}
				source={require('../assets/images/Update.png')}
			/>
			<Text variant="headline" style={styles.header}>
				Update Available
			</Text>
			<Text style={styles.secondary}>Update Available descr</Text>
			<Button
				variant="primary"
				text="Update"
				onPress={update}
				style={styles.button}
			/>
		</Background>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		button: {
			width: '80%',
			marginTop: 56,
		},
		container: {
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: '21%',
			paddingBottom: '41%',
		},
		header: {
			color: theme.color.textPrimary,
			marginTop: 20,
			marginBottom: 12,
		},
		secondary: {
			color: theme.color.textSecondary,
			marginHorizontal: '10%',
			textAlign: 'center',
			lineHeight: 22,
		},
	})
