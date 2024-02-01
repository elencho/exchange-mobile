import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import E_mail_Auth from '@assets/images/User_profile/Email_Auth.svg'
import SMS_Auth from '@assets/images/User_profile/Sms_Auth.svg'
import Google_Auth from '@assets/images/User_profile/Totp_Auth.svg'
import { Theme, useTheme } from '@theme/index'
import { OTPTypes } from '@app/refactor/types/enums'
import AppText from '@components/text'
import AppSwitcher from '@components/switcher'
import { AppButton } from '@components/button'

interface Props {
	title: string
	onPress: (otp: OTPTypes) => void
	isOn: boolean
	description: string | undefined
	otpType: OTPTypes
	extraPress?: () => void
}
const images = {
	TOTP: <Google_Auth />,
	EMAIL: <E_mail_Auth />,
	SMS: <SMS_Auth />,
}

export const OtpToggle = (props: Props) => {
	const { title, onPress, isOn, otpType, description, extraPress } = props
	const { styles } = useTheme(_styles)
	const imageToSearch: OTPTypes = otpType

	return (
		<View style={styles.row}>
			{images[imageToSearch]}

			<View style={styles.justify}>
				<AppText style={styles.white} variant="title">
					{title}
				</AppText>
				<Text>
					<AppText variant="l" style={styles.secondary}>
						{description}
					</AppText>
					{otpType === OTPTypes.SMS && (
						<AppButton onPress={extraPress} variant="text" text=" Change" />
					)}
				</Text>
			</View>

			<AppSwitcher
				isOn={isOn}
				onToggle={() => onPress(otpType)}
				disabled={isOn}
			/>
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		justify: {
			justifyContent: 'space-between',
			flex: 1,
			marginHorizontal: 20,
		},
		secondary: {
			color: theme.color.textSecondary,
			marginTop: 5,
		},
		row: {
			flexDirection: 'row',
			height: 68,
			alignItems: 'flex-start',
			marginTop: 10,
		},
		white: {
			color: theme.color.textPrimary,
		},
		btn: {
			paddingLeft: 20,
		},
	})
