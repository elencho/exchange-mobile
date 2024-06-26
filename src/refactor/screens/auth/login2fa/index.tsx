import { t } from 'i18next'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Pressable, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import EmailLoginAuth from '@assets/images/User_profile/EmailLoginAuth.svg'
import SmsAuth from '@assets/images/User_profile/Sms_Auth.svg'
import TotpAuth from '@assets/images/User_profile/Totp_Auth.svg'
import { Theme, useTheme } from '@theme/index'
import AppBackground from '@components/background'
import { AppButton } from '@components/button'
import TwoFaInput from '@components/input_2fa'
import AppText from '@components/text'
import {
	otpForLoginThunk,
	resendOtpThunk,
	resetOtpThunk,
	startLoginThunk,
} from '@store/redux/auth/thunks'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { setOtpTimer } from '@store/redux/auth/slice'
import { COUNTDOWN_SECONDS } from '@app/refactor/common/constants'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'
import BackButton from '@components/back_button'
import { MaterialIndicator } from 'react-native-indicators'
import { OTPTypes } from '@app/refactor/types/enums'
import { CodeFieldOverridableComponent } from 'react-native-confirmation-code-field/esm/CodeField'
import { useFocusEffect } from '@react-navigation/native'

export const Login2Fa = ({ navigation }: ScreenProp<'Login2Fa'>) => {
	const dispatch = useDispatch()
	const { theme, styles } = useTheme(_styles)
	const inputRef = useRef<CodeFieldOverridableComponent>(null)

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(0)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)

	const { otpTimerVisible, otpType, otpLoading, otpResendLoading } =
		useSelector((state: RootState) => state.auth)

	const cellCount = otpType === 'SMS' ? 4 : 6

	useEffect(() => {
		dispatch(setOtpTimer(true))

		return () => {
			dispatch(setOtpTimer(false))
			setValue('')
			setSeconds(0)
		}
	}, [])

	useFocusEffect(
		useCallback(() => {
			const timerId = setTimeout(() => {
				if (inputRef.current && otpType === OTPTypes.SMS) {
					inputRef.current.focus()
				}
			}, 1000)

			return () => clearTimeout(timerId)
		}, [otpType])
	)

	useEffect(() => {
		if (!otpTimerVisible) return

		if (seconds) {
			setTimeout(() => {
				setSeconds(seconds - 1)
			}, 1000)
		} else {
			dispatch(setOtpTimer(false))
		}
	}, [seconds])

	useEffect(() => {
		if (otpTimerVisible) {
			setSeconds(COUNTDOWN_SECONDS)
		}
	}, [otpTimerVisible])

	const goBack = () => navigation.navigate('Login')
	const goToReset = () => dispatch(resetOtpThunk(navigation))

	const image = () => {
		switch (otpType) {
			case 'TOTP':
				return <TotpAuth style={{ transform: [{ scale: 1.3 }] }} />
			case 'EMAIL':
				return <EmailLoginAuth />
			case 'SMS':
				return <SmsAuth style={{ transform: [{ scale: 1.3 }] }} />
		}
	}

	const resendOrCountDown = () => {
		if (otpResendLoading) {
			return (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					size={16}
					style={{ flex: 0 }}
				/>
			)
		} else if (otpTimerVisible) {
			return (
				<AppText style={{ color: theme.color.textPrimary }}>{seconds}</AppText>
			)
		} else {
			return (
				<AppButton
					variant="text"
					text="resend purple"
					onPress={() => {
						resend()
						setGeneralErrorData(null)
					}}
				/>
			)
		}
	}

	const resend = () => dispatch(resendOtpThunk({ navigation }))

	const onCodeFilled = () =>
		handleGeneralError(
			() => dispatch(otpForLoginThunk({ otp: value, navigation })),
			setGeneralErrorData
		)

	return (
		<AppBackground>
			<WithKeyboard
				keyboardVerticalOffsetIOS={40}
				padding={true}
				flexGrow={true}
				modal={undefined}
				refreshControl={undefined}
				scrollUp={undefined}>
				<Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
					<BackButton onPress={goBack} style={styles.back} />
					<View style={styles.middle}>
						{image()}
						<View>
							<AppText variant="headline" style={styles.primary}>
								{t(`${otpType} authentication login`)}
							</AppText>
							<AppText style={styles.secondary}>
								enter one time password
							</AppText>
						</View>

						<View style={styles.twoFaInput}>
							<TwoFaInput
								ref={inputRef}
								value={value}
								setValue={(txt) => {
									setValue(txt)
									setGeneralErrorData(null)
								}}
								cellCount={cellCount}
								onFill={onCodeFilled}
								generalErrorData={generalErrorData}
								loading={otpLoading}
							/>
						</View>
					</View>

					<View style={styles.bottom}>
						{otpType !== 'TOTP' ? (
							<View style={styles.row}>
								<AppText style={[styles.secondary, { marginRight: 5 }]}>
									Didn't receive code?
								</AppText>
								{resendOrCountDown()}
							</View>
						) : null}
						{otpType !== 'EMAIL' ? (
							<AppButton
								variant="text"
								text="Reset OTP"
								style={styles.resetText}
								onPress={goToReset}
							/>
						) : null}
					</View>
				</Pressable>
			</WithKeyboard>
		</AppBackground>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		back: {
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: 28,
			alignSelf: 'flex-start',
		},
		backText: {
			marginBottom: 2,
			marginLeft: 10,
			flex: 1,
		},
		bottom: {
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: 44,
		},
		container: {
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
			backgroundColor: theme.color.backgroundPrimary,
		},
		middle: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		primary: {
			color: theme.color.textPrimary,
			textAlign: 'center',
			marginTop: 27,
			marginBottom: 12,
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 20,
		},
		secondary: {
			color: theme.color.textSecondary,
			textAlign: 'center',
		},
		twoFaInput: {
			marginTop: 40,
		},
		resetText: {
			marginBottom: 10,
		},
	})

export default Login2Fa
