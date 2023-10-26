import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Pressable,
	Keyboard,
} from 'react-native'
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
	resendOtpThunk,
	resetOtpThunk,
	startLoginThunk,
} from '@store/redux/auth/thunks'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { Screens } from '@app/refactor/setup/nav/nav'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props extends NativeStackScreenProps<Screens, 'Login2Fa'> {}

export const Login2Fa = ({ navigation }: Props) => {
	const dispatch = useDispatch()
	const { theme, styles } = useTheme(_styles)

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)

	const state = useSelector((state: RootState) => state.auth)
	const { timerVisible, otpType } = state

	const cellCount = otpType === 'SMS' ? 4 : 6

	useEffect(() => {
		state.timerVisible = true
		return () => {
			setValue('')
			state.timerVisible = false
			setSeconds(30)
		}
	}, [])

	useEffect(() => {
		if (!seconds) {
			state.timerVisible = false
			setSeconds(30)
		}
		if (seconds && timerVisible) {
			setTimeout(() => {
				setSeconds(seconds - 1)
			}, 1000)
		}
	}, [seconds, timerVisible])

	const goBack = () => {
		dispatch(startLoginThunk(navigation))
	}
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

	const resend = () => dispatch(resendOtpThunk({ from: 'Login2Fa' }))

	const resendOrCountDown = () => {
		if (timerVisible) {
			return (
				<AppText style={{ color: theme.color.textPrimary }}>{seconds}</AppText>
			)
		} else {
			return <AppButton variant="text" text="resend purple" onPress={resend} />
		}
	}

	return (
		<AppBackground>
			<WithKeyboard
				padding={true}
				flexGrow={true}
				modal={undefined}
				refreshControl={undefined}
				scrollUp={undefined}>
				<Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
					<TouchableOpacity style={styles.back} onPress={goBack}>
						<AppButton
							variant="text"
							text="Back to Log In"
							style={styles.backText}
						/>
					</TouchableOpacity>
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
								value={value}
								setValue={setValue}
								cellCount={cellCount}
								from="Login2Fa"
								navigation={navigation}
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
							<AppButton variant="text" text="Reset OTP" onPress={goToReset} />
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
	})

export default Login2Fa
