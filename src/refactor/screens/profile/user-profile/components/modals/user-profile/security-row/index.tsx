import React from 'react'
import { StyleSheet, View } from 'react-native'
import FaceID from '@assets/images/Face_ID.svg'
import TouchID from '@assets/images/Touch_ID.svg'
import E_mail_Auth from '@assets/images/User_profile/Email_Auth.svg'
import SMS_Auth from '@assets/images/User_profile/Sms_Auth.svg'
import Strong_Password from '@assets/images/User_profile/Strong_Password.svg'
import Google_Auth from '@assets/images/User_profile/Totp_Auth.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppSwitcher from '@components/switcher'
import AppText from '@components/text'
import { useSecurityRow } from './use-security-row'

type ImageKey =
	| 'Google_Auth'
	| 'E_mail_Auth'
	| 'SMS_Auth'
	| 'Strong_Password'
	| 'Biometric'

interface SecurityRowProps {
	text: ImageKey
	togglePasswordModal?: (v: boolean) => void
	toggleEmailAuthModalVisible?: (v: boolean) => void
	toggleGoogleOtpModalVisible: (v: boolean) => void
}
export default function SecurityRow(props: SecurityRowProps) {
	const {
		text,
		togglePasswordModal,
		toggleEmailAuthModalVisible,
		toggleGoogleOtpModalVisible,
	} = props
	const {
		userInfo,
		otpType,
		isBioOn,
		bioType,
		handlePassword,
		handleChange,
		handleChangeGoogle,
	} = useSecurityRow({
		text,
		togglePasswordModal,
		toggleEmailAuthModalVisible,
		toggleGoogleOtpModalVisible,
	})
	const { styles } = useTheme(_styles)

	const disabledCond = () => {
		switch (text) {
			case 'Google_Auth':
				return otpType === 'TOTP'
			case 'E_mail_Auth':
				return otpType === 'EMAIL'
			case 'SMS_Auth':
				return otpType === 'SMS'
			default:
				break
		}
	}

	const textCond = () => {
		switch (text) {
			case 'Google_Auth':
				return 'Google Authentication'
			case 'E_mail_Auth':
				return 'E-mail Authentication'
			case 'SMS_Auth':
				return 'SMS Authentication'
			case 'Pin':
				return 'Set a PIN Code'
			case 'Biometric':
				return 'Biometric'
			case 'Strong_Password':
				return 'Set a Strong Password'
			default:
				break
		}
	}

	const secondaryTextCond = () => {
		switch (text) {
			case 'Google_Auth':
				return 'Google Auth Description'
			case 'E_mail_Auth':
				return userInfo?.email
			case 'SMS_Auth':
				return userInfo?.phoneNumber
			case 'Pin':
				return 'Changing password periodically'
			case 'Biometric':
				return 'Set Face ID, or Fingerprint'
			case 'Strong_Password':
				return 'Change password periodically'
			default:
				break
		}
	}

	const switchCond = () => {
		switch (text) {
			case 'E_mail_Auth':
				return otpType === 'EMAIL'
			case 'SMS_Auth':
				return otpType === 'SMS'
			case 'Google_Auth':
				return otpType === 'TOTP'
			case 'Biometric':
				return isBioOn
			default:
				return false
		}
	}

	const renderCond = () => {
		if (text === 'SMS_Auth') {
			return otpType === 'SMS'
		}
		return true
	}

	const images = {
		Google_Auth: <Google_Auth />,
		E_mail_Auth: <E_mail_Auth />,
		SMS_Auth: <SMS_Auth />,
		Strong_Password: <Strong_Password />,
		Biometric: bioType === 'FACEID' ? <FaceID /> : <TouchID />,
	}

	const imageToSearch: ImageKey = text

	return (
		<>
			{renderCond() && (
				<View style={styles.row} key={text}>
					{images[imageToSearch]}

					<View style={styles.justify}>
						<AppText style={styles.white}>{textCond()}</AppText>
						<AppText variant="s" style={styles.secondary}>
							{secondaryTextCond()}
						</AppText>
					</View>

					{text === 'Strong_Password' ? (
						<AppButton variant="text" text="Edit" onPress={handlePassword} />
					) : text === 'Google_Auth' ? (
						<AppSwitcher
							isOn={switchCond()}
							onToggle={handleChangeGoogle}
							disabled={disabledCond()}
						/>
					) : (
						<AppSwitcher
							isOn={switchCond()}
							onToggle={handleChange}
							disabled={disabledCond()}
						/>
					)}
				</View>
			)}
		</>
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
	})
