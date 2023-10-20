import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'
import GoogleAuthModal from '../modals/user-profile/google-auth'
import GoogleOtpModal from '../modals/user-profile/google-otp'
import PasswordModal from '../modals/user-profile/password-modal'
import SecurityRow from '../modals/user-profile/security-row'
import SmsEmailAuthModal from '../modals/user-profile/sms-email-auth-modal'

export default function Security({ loading, bioAvailable }) {
	const { styles } = useTheme(_styles)
	return !loading ? (
		<>
			<View style={styles.block}>
				<AppText variant="s" style={[styles.secondary, styles.margin]}>
					2FA is specific type of multi-factor authentication that strengthens
					access security
				</AppText>
				{['Google_Auth', 'E_mail_Auth', 'SMS_Auth'].map((r, i, a) => (
					<SecurityRow key={r} text={r} />
				))}
				<View style={styles.line} />
			</View>

			<View style={styles.block}>
				{bioAvailable && <SecurityRow text="Biometric" />}
				<SecurityRow text="Strong_Password" />
			</View>

			<PasswordModal />
			<GoogleAuthModal />
			<SmsEmailAuthModal type="Email" />
			<SmsEmailAuthModal type="SMS" />
			<GoogleOtpModal />
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
			color: theme.color.backgroundSecondary,
		},
		line: {
			marginBottom: 10,
			height: 1,
			flex: 1,
			backgroundColor: theme.color.buttonDisabled,
		},
	})
