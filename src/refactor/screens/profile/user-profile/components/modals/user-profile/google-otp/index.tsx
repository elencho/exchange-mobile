import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import AppModal from '@components/modal'
import AppText from '@components/text'
import { useGoogleOtp } from './use-google-otp'
import TwoFaInput from '@components/input_2fa'

interface Props {
	withdrawal?: boolean
	whitelist?: boolean
}

export default function GoogleOtpModal(props: Props) {
	const { toggleGoogleOtpModalVisible, googleOtpModalVisible } = props
	const { navigation, value, setValue, hide } = useGoogleOtp({
		googleOtpModalVisible,
		toggleGoogleOtpModalVisible,
	})
	const { styles, theme } = useTheme(_styles)

	const children = (
		<View style={styles.container}>
			<AppText style={styles.header} variant="l">
				Google Authentication
			</AppText>
			<AppText style={styles.secondary}>Enter One Time Password</AppText>

			<View style={styles.codeInput}>
				<TwoFaInput
					value={value}
					cellCount={6}
					setValue={setValue}
					navigation={navigation}
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
