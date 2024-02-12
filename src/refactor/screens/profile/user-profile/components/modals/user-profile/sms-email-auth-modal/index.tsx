import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppModal from '@components/modal'
import AppText from '@components/text'
import TwoFaInput from '@components/input_2fa'
import { useSmsAuthEmailModal } from './use-sms-email-auth-modal'

interface SmsEmailAuthModalProps {
	type: 'SMS' | 'Email'
	toggleSmsAuthModal: (v: boolean) => void
	toggleEmailAuthModal: (v: boolean) => void
	toggleGoogleAuthModal: (v: boolean) => void
	smsAuthModalVisible: boolean
	emailAuthModalVisible: boolean
}

export default function SmsEmailAuthModal(props: SmsEmailAuthModalProps) {
	const {
		toggleSmsAuthModal,
		toggleEmailAuthModal,
		smsAuthModalVisible,
		emailAuthModalVisible,
		toggleGoogleAuthModal,
	} = props

	const type = emailAuthModalVisible ? 'Email' : 'SMS'
	const navigation = useNavigation()
	const {
		resend,
		hide,
		otpLoading,
		cellCount,
		visible,
		seconds,
		value,
		setValue,
		handleFill,
		generalErrorData,
		timerVisible,
		onShow,
	} = useSmsAuthEmailModal({
		type,
		toggleSmsAuthModal,
		toggleEmailAuthModal,
		smsAuthModalVisible,
		emailAuthModalVisible,
		toggleGoogleAuthModal,
	})
	const { styles, theme } = useTheme(_styles)
	const resendOrCountDown = () => {
		if (otpLoading) {
			return (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					size={16}
					style={styles.indicator}
				/>
			)
		} else if (timerVisible) {
			return (
				<AppText style={{ color: theme.color.textPrimary }}>{seconds}</AppText>
			)
		} else {
			return <AppButton variant="text" text="resend purple" onPress={resend} />
		}
	}

	const children = (
		<View style={styles.container}>
			<AppText style={styles.header} variant="headline">
				{`${type} Authentication`}
			</AppText>
			<AppText style={styles.secondary} variant="l">
				Enter One Time Password
			</AppText>

			<View style={styles.codeInput}>
				<TwoFaInput
					onFill={handleFill}
					navigation={navigation}
					value={value}
					cellCount={6}
					setValue={setValue}
					generalErrorData={generalErrorData}
				/>
			</View>

			<View style={styles.row}>
				<AppText style={[{ marginRight: 5, color: theme.color.textSecondary }]}>
					Didn't receive code?
				</AppText>
				{resendOrCountDown()}
			</View>
		</View>
	)

	return (
		<AppModal
			children={children}
			bottom
			hide={hide}
			visible={emailAuthModalVisible}
			onShow={onShow}
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			paddingHorizontal: 41,
		},
		codeInput: {
			marginTop: 24,
			marginBottom: 40,
		},
		header: {
			color: theme.color.textPrimary,
			marginBottom: 10,
			textAlign: 'center',
		},
		indicator: {
			flex: 0,
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		secondary: {
			color: theme.color.textSecondary,
		},
	})
