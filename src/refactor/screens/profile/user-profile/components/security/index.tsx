import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'
import GoogleAuthModal from '../modals/user-profile/google-auth'
import GoogleOtpModal from '../modals/user-profile/google-otp'
import PasswordModal from '../modals/user-profile/password-modal'
import SecurityRow from '../modals/user-profile/security-row'
import SmsEmailAuthModal from '../modals/user-profile/sms-email-auth-modal'
import PersonalSecuritySkeleton from '../modals/user-profile/skeletons/PersonalSecuritySkeleton'
import { useSecurity } from './use-security'

interface Props {
	loading: boolean
	bioAvailable: boolean
}
export default function Security({ loading, bioAvailable }: Props) {
	const { styles } = useTheme(_styles)
	const {
		passwordModalVisible,
		togglePasswordModal,
		toggleGoogleAuthModal,
		emailAuthModalVisible,
		toggleEmailAuthModalVisible,
		googleAuthModalVisible,
		toggleGoogleOtpModalVisible,
		googleOtpModalVisible,
		toggleSmsAuthModalVisible,
		smsAuthModalVisible,
		setChosenOtpType,
		chosenOtpType,
	} = useSecurity()
	return !loading ? (
		<>
			<View style={styles.block}>
				<AppText variant="s" style={[styles.secondary, styles.margin]}>
					2FA is specific type of multi-factor authentication that strengthens
					access security
				</AppText>
				{['Google_Auth', 'E_mail_Auth', 'SMS_Auth'].map((r, i, a) => (
					<SecurityRow
						key={r}
						text={r}
						toggleEmailAuthModalVisible={toggleEmailAuthModalVisible}
						toggleGoogleOtpModalVisible={toggleGoogleOtpModalVisible}
						toggleGoogleAuthModal={toggleGoogleAuthModal}
						setChosenOtpType={setChosenOtpType}
						toggleSmsAuthModalVisible={toggleSmsAuthModalVisible}
					/>
				))}
				<View style={styles.line} />
			</View>

			<View style={styles.block}>
				{bioAvailable && <SecurityRow text="Biometric" />}
				<SecurityRow
					text="Strong_Password"
					togglePasswordModal={togglePasswordModal}
				/>
			</View>

			<PasswordModal
				passwordModalVisible={passwordModalVisible}
				togglePasswordModal={togglePasswordModal}
			/>
			<GoogleAuthModal
				toggleGoogleAuthModal={toggleGoogleAuthModal}
				googleAuthModalVisible={googleAuthModalVisible}
			/>
			<SmsEmailAuthModal
				type={chosenOtpType}
				toggleSmsAuthModal={toggleSmsAuthModalVisible}
				toggleEmailAuthModal={toggleEmailAuthModalVisible}
				smsAuthModalVisible={smsAuthModalVisible}
				emailAuthModalVisible={emailAuthModalVisible}
				toggleGoogleAuthModal={toggleGoogleAuthModal}
			/>
			{/* <SmsEmailAuthModal
				type="SMS"
				toggleSmsAuthModal={toggleSmsAuthModalVisible}
				toggleEmailAuthModal={toggleEmailAuthModalVisible}
				smsAuthModalVisible={smsAuthModalVisible}
				emailAuthModalVisible={emailAuthModalVisible}
				toggleGoogleAuthModal={toggleGoogleAuthModal}
			/> */}
			<GoogleOtpModal
				toggleGoogleOtpModalVisible={toggleGoogleOtpModalVisible}
				googleOtpModalVisible={googleOtpModalVisible}
				toggleEmailAuthModalVisible={toggleEmailAuthModalVisible}
			/>
		</>
	) : (
		<PersonalSecuritySkeleton />
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		block: {
			backgroundColor: theme.color.backgroundPrimary,
		},
		margin: { marginBottom: 20, marginTop: 10 },
		secondary: {
			color: theme.color.textSecondary,
		},
		line: {
			marginBottom: 10,
			height: 1,
			flex: 1,
			backgroundColor: theme.color.buttonDisabled,
		},
	})
