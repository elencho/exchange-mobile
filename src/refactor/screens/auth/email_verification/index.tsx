import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import EmailLoginAuth from '@assets/images/User_profile/EmailLoginAuth.svg'
import { Theme, useTheme } from '@theme/index'
import AppBackground from '@components/background'
import { AppButton } from '@components/button'
import TwoFaInput from '@components/input_2fa'
import AppText from '@components/text'
import {
	resendOtpThunk,
	verifyRegistrationThunk,
} from '@store/redux/auth/thunks'
import CloseModalIcon from '@app/components/InstantTrade/CloseModalIcon'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { COUNTDOWN_SECONDS } from '@app/refactor/common/constants'
import { setOtpTimer } from '@store/redux/auth/slice'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'
import { MaterialIndicator } from 'react-native-indicators'

const EmailVerification = ({
	navigation,
	route,
}: ScreenProp<'EmailVerification'>) => {
	const dispatch = useDispatch()
	const { styles, theme } = useTheme(_styles)

	const { from, mail } = route.params

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(0)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)

	const { otpTimerVisible, otpLoading, otpResendLoading } = useSelector(
		(state: RootState) => state.auth
	)

	useEffect(() => {
		dispatch(setOtpTimer(true))

		return () => {
			dispatch(setOtpTimer(false))
			setValue('')
			setSeconds(0)
		}
	}, [])

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

	const checkMailText = () => {
		if (mail) {
			return (
				<View>
					<AppText style={[styles.secondary, { marginBottom: 36 }]}>
						{t('check_your_{{email}}_after_registration', {
							email: mail,
						})}
					</AppText>
				</View>
			)
		}
	}

	const goBack = () => {
		if (from === 'Registration') navigation.navigate('Registration')
		else navigation.navigate('Login')
	}

	const resend = () => dispatch(resendOtpThunk({ navigation }))

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

	const onCodeFilled = () =>
		handleGeneralError(
			() => dispatch(verifyRegistrationThunk({ otp: value, navigation })),
			setGeneralErrorData
		)

	return (
		<AppBackground>
			<WithKeyboard
				keyboardVerticalOffsetIOS={40}
				flexGrow={true}
				padding={true}
				modal={undefined}
				refreshControl={undefined}
				scrollUp={undefined}>
				<View style={styles.container}>
					<View style={styles.top}>
						<CloseModalIcon onPress={goBack} style={undefined} />
					</View>

					<View style={styles.middle}>
						<EmailLoginAuth />

						<View>
							<AppText variant="headline" style={styles.primary}>
								EMAIL authentication login
							</AppText>
						</View>
						{checkMailText()}

						<TwoFaInput
							navigation={navigation}
							value={value}
							setValue={(txt) => {
								setValue(txt)
								setGeneralErrorData(null)
							}}
							cellCount={6}
							onFill={onCodeFilled}
							indicatorStyle={{ top: '70%' }}
							generalErrorData={generalErrorData}
							loading={otpLoading}
						/>
					</View>

					<View style={styles.row}>
						<AppText style={[styles.secondary, { marginRight: 5 }]}>
							Didn't receive code?
						</AppText>
						{resendOrCountDown()}
					</View>
				</View>
			</WithKeyboard>
		</AppBackground>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingBottom: 45,
		},
		middle: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		primary: {
			color: theme.color.textPrimary,
			textAlign: 'center',
			marginTop: 23,
			marginBottom: 12,
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
			alignSelf: 'center',
		},
		secondary: {
			color: theme.color.textSecondary,
			textAlign: 'center',
			lineHeight: 21,
		},
		top: {
			alignItems: 'flex-end',
			marginTop: 10,
		},
	})

export default EmailVerification
