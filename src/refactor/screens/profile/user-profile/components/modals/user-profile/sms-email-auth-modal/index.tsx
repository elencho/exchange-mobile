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
	smsAuthModalVisible: boolean
	emailAuthModalVisible: boolean
}

export default function SmsEmailAuthModal(props: SmsEmailAuthModalProps) {
	const {
		type,
		toggleSmsAuthModal,
		toggleEmailAuthModal,
		smsAuthModalVisible,
		emailAuthModalVisible,
	} = props

	const navigation = useNavigation()
	const {
		resend,
		hide,
		handleHide,
		otpLoading,
		cellCount,
		visible,
		seconds,
		timerVisible,
		value,
		setValue,
	} = useSmsAuthEmailModal({
		type,
		toggleSmsAuthModal,
		toggleEmailAuthModal,
		smsAuthModalVisible,
		emailAuthModalVisible,
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
			<AppText style={styles.header} variant="l">
				{`${type} Authentication`}
			</AppText>
			<AppText style={styles.secondary} variant="s">
				Enter One Time Password
			</AppText>

			<View style={styles.codeInput}>
				<TwoFaInput
					otpChangeType={type}
					navigation={navigation}
					value={value}
					cellCount={cellCount}
					setValue={setValue}
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
			visible={visible}
			onModalHide={handleHide}
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
		},
		codeInput: {
			marginVertical: 35,
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
			fontSize: 20,
			lineHeight: 28,
		},
	})
