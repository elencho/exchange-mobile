import React, { useEffect } from 'react'
import { Linking, StyleSheet } from 'react-native'

import Background from '../components/Background'
import Update from '../assets/images/Update'
import AppText from '../components/AppText'
import colors from '../constants/colors'
import AppButton from '../components/AppButton'

import VersionCheck from 'react-native-version-check'
import { packageName, APP_ID } from '../constants/system'
import SplashScreen from 'react-native-splash-screen'
import FastImage from 'react-native-fast-image'

export default function UpdateAvailable() {
	useEffect(() => {
		SplashScreen.hide()
	}, [])

	const update = async () => {
		const options = { packageName: packageName, appID: APP_ID }

		const storeUrl = await VersionCheck.getStoreUrl(options)
		Linking.canOpenURL(storeUrl).then((supported) => {
			supported && Linking.openURL(storeUrl)
		})
	}

	return (
		<Background style={styles.container}>
			<FastImage
				style={{ height: 130, width: 180 }}
				source={require('../assets/images/Update.png')}
			/>

			<AppText header style={styles.header}>
				Update Available
			</AppText>
			<AppText style={styles.secondary}>Update Available descr</AppText>

			<AppButton text="Update" style={styles.button} onPress={update} />
		</Background>
	)
}

const styles = StyleSheet.create({
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
		color: colors.PRIMARY_TEXT,
		marginTop: 20,
		marginBottom: 12,
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		marginHorizontal: '10%',
		textAlign: 'center',
		lineHeight: 22,
	},
})
