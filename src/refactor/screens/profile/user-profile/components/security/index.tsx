import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'
import GoogleAuthModal from '../modals/user-profile/google-auth'
import GoogleOtpModal from '../modals/user-profile/google-otp'
import PasswordModal from '../modals/user-profile/password-modal'
import SecurityRow from '../modals/user-profile/security-row'
import SmsEmailAuthModal from '../modals/user-profile/sms-email-auth-modal'
import PersonalSecuritySkeleton from '../modals/user-profile/skeletons/PersonalSecuritySkeleton'
import { useSecurity } from './use-security'
import { OtpToggle } from '../modals/user-profile/otp-toggle'
import { OTPTypes } from '@app/refactor/types/enums'
import SmsOtpModal from '../modals/user-profile/sms-otp-modal'
import PhoneNumberModal from '../modals/user-profile/phone-number-modal'

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
		handleOtpPress,
		otpType,
		userInfo,
		phoneNumberModalVisible,
		togglePhoneNumberModal,
		handleChangePhoneNumber,
	} = useSecurity()

	const data = [
		{
			title: 'Google Authentication',
			description: 'Google Auth Description',
			otpType: OTPTypes.TOTP,
		},
		{
			title: 'E-mail Authentication',
			description: userInfo?.email,
			otpType: OTPTypes.EMAIL,
		},
		{
			title: 'SMS Authentication',
			description: userInfo?.phoneNumber,
			otpType: OTPTypes.SMS,
			extraPress: () => handleChangePhoneNumber(),
		},
	]

	return !loading ? (
		<>
			<View style={styles.block}>
				<AppText variant="s" style={[styles.secondary, styles.margin]}>
					2FA is specific type of multi-factor authentication that strengthens
					access security
				</AppText>
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<OtpToggle
							title={item.title}
							onPress={handleOtpPress}
							isOn={otpType === item.otpType}
							description={item.description}
							otpType={item.otpType}
							extraPress={item?.extraPress}
						/>
					)}
				/>

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
			{googleAuthModalVisible && (
				<GoogleAuthModal
					toggleGoogleAuthModal={toggleGoogleAuthModal}
					googleAuthModalVisible={googleAuthModalVisible}
				/>
			)}
			{emailAuthModalVisible && (
				<SmsEmailAuthModal
					toggleSmsAuthModal={toggleSmsAuthModalVisible}
					toggleEmailAuthModal={toggleEmailAuthModalVisible}
					emailAuthModalVisible={emailAuthModalVisible}
					toggleGoogleAuthModal={toggleGoogleAuthModal}
					togglePhoneNumberModal={togglePhoneNumberModal}
				/>
			)}
			{smsAuthModalVisible && (
				<SmsOtpModal
					toggleEmailAuthModal={toggleEmailAuthModalVisible}
					toggleGoogleAuthModal={toggleGoogleAuthModal}
					toggleSmsAuthModal={toggleSmsAuthModalVisible}
					smsAuthModalVisible={smsAuthModalVisible}
					togglePhoneNumberModal={togglePhoneNumberModal}
				/>
			)}

			<GoogleOtpModal
				toggleGoogleOtpModalVisible={toggleGoogleOtpModalVisible}
				googleOtpModalVisible={googleOtpModalVisible}
				toggleEmailAuthModalVisible={toggleEmailAuthModalVisible}
				toggleSmsAuthModalVisible={toggleSmsAuthModalVisible}
				togglePhoneNumberModal={togglePhoneNumberModal}
			/>
			{phoneNumberModalVisible && (
				<PhoneNumberModal
					phoneNumberModalVisible={phoneNumberModalVisible}
					togglePhoneNumberModal={togglePhoneNumberModal}
				/>
			)}
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
			backgroundColor: theme.color.tabTagHint,
		},
	})
