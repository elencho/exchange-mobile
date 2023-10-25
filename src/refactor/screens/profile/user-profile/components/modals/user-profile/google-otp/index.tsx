import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import AppModal from '@components/modal'
import AppText from '@components/text'
import TwoFaInput from '@app/components/TwoFaInput'
import { useGoogleOtp } from './use-google-otp'

//TODO: FIX types
export default function GoogleOtpModal({ withdrawal, whitelist }) {
	const { navigation, value, setValue, hide, googleOtpModalVisible } =
		useGoogleOtp()
	const { styles, theme } = useTheme()

	const children = (
		<View style={styles.container}>
			<AppText style={styles.header} variant="l">
				Google Authentication
			</AppText>
			<AppText style={styles.secondary}>Enter One Time Password</AppText>

			<View style={styles.codeInput}>
				{/*TODO: fix this */}
				<TwoFaInput
					navigation={navigation}
					withdrawal={withdrawal}
					whitelist={whitelist}
					value={value}
					cellCount={6}
					setValue={setValue}
				/>
			</View>
		</View>
	)

	return (
		<AppModal
			children={children}
			bottom
			hide={hide}
			visible={googleOtpModalVisible}
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			backgroundColor: theme.color.backgroundPrimary,
		},
		codeInput: {
			marginVertical: 35,
		},
		header: {
			color: theme.color.textPrimary,
			marginBottom: 10,
		},
		secondary: {
			color: theme.color.textSecondary,
		},
	})
