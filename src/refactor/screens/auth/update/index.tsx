import React from 'react'
import { Linking, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import VersionCheck from 'react-native-version-check'
import { Theme, useTheme } from '@theme/index'
import AppBackground from '@components/background'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import { System } from '@app/refactor/common/util'
import { ScreenProp } from '@app/refactor/setup/nav/nav'

const Update = ({}: ScreenProp<'Welcome'>) => {
	const { styles } = useTheme(_styles)

	const update = async () => {
		const storeUrl = await VersionCheck.getStoreUrl({
			packageName: System.packageName,
			appID: System.appId,
		})
		Linking.canOpenURL(storeUrl).then((supported) => {
			supported && Linking.openURL(storeUrl)
		})
	}

	return (
		<AppBackground style={styles.container}>
			<FastImage
				style={{
					height: 130,
					width: 180,
				}}
				source={require('@assets/images/Update.png')}
			/>
			<AppText variant="headline" style={styles.header}>
				Update Available
			</AppText>
			<AppText style={styles.secondary}>Update Available descr</AppText>
			<AppButton
				variant="primary"
				text="Update"
				onPress={update}
				style={styles.button}
			/>
		</AppBackground>
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

export default Update
