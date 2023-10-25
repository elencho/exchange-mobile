import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Pressable,
	Keyboard,
} from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { useDispatch, useSelector } from 'react-redux'
import EmailLoginAuth from '../assets/images/User_profile/EmailLoginAuth.svg'
import SmsAuth from '../assets/images/User_profile/Sms_Auth.svg'
import TotpAuth from '../assets/images/User_profile/Totp_Auth.svg'
import AppText from '../components/AppText'
import Background from '../components/Background'
import PurpleText from '../components/PurpleText'
import TwoFaInput from '../components/TwoFaInput'
import WithKeyboard from '../components/WithKeyboard'
import colors from '../constants/colors'
import images from '../constants/images'
import { startLoginAction } from '../redux/profile/actions'

export default function Login2Fa({ navigation }) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		profile: { userAndPassInfo, timerVisible },
		transactionsOld: { loading },
	} = state

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)

	useEffect(() => {
		if (!seconds) {
			dispatch({ type: 'TOGGLE_TIMER', timerVisible: false })
			setSeconds(30)
		}
		if (seconds && timerVisible) {
			setTimeout(() => {
				setSeconds(seconds - 1)
			}, 1000)
		}
	}, [seconds, timerVisible])

	useEffect(() => {
		dispatch({ type: 'TOGGLE_TIMER', timerVisible: true })

		return () => {
			dispatch({ type: 'TOGGLE_FORGOT_PASS_MODE', forgotPassMode: false })
			setValue('')
			dispatch({ type: 'TOGGLE_TIMER', timerVisible: false })
			setSeconds(30)
		}
	}, [])

	const type = userAndPassInfo?.attributes?.otpType
	const cellCount = type === 'SMS' ? 4 : 6

	const goBack = () => dispatch(startLoginAction(navigation))
	const goToReset = () => dispatch({ type: 'RESET_OTP', navigation })

	const image = () => {
		if (type === 'TOTP')
			return <TotpAuth style={{ transform: [{ scale: 1.3 }] }} />
		if (type === 'EMAIL') return <EmailLoginAuth />
		if (type === 'SMS')
			return <SmsAuth style={{ transform: [{ scale: 1.3 }] }} />
	}

	const resend = () =>
		dispatch({
			type: 'RESEND_SAGA',
			login2Fa: true,
			url: userAndPassInfo.callbackUrl,
		})

	const resendOrCountDown = () => {
		if (loading) {
			return (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					size={16}
					style={{ flex: 0 }}
				/>
			)
		} else if (timerVisible) {
			return <AppText style={{ color: colors.PRIMARY_TEXT }}>{seconds}</AppText>
		} else {
			return <PurpleText text="resend purple" onPress={resend} />
		}
	}

	return (
		<Background>
			<WithKeyboard padding flexGrow>
				<Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
					<TouchableOpacity style={styles.back} onPress={goBack}>
						<PurpleText
							numberOfLines={1}
							text="Back to Log In"
							style={styles.backText}
						/>
					</TouchableOpacity>
					<View style={styles.middle}>
						{image()}

						{/* Animate */}
						<View>
							<AppText header style={styles.primary}>
								{t(`${type} authentication login`)}
							</AppText>
							<AppText style={styles.secondary}>
								enter one time password
							</AppText>
						</View>

						<View style={styles.twoFaInput}>
							<TwoFaInput
								navigation={navigation}
								cellCount={cellCount}
								value={value}
								setValue={setValue}
								login
							/>
						</View>
					</View>

					<View style={styles.bottom}>
						{type !== 'TOTP' ? (
							<View style={styles.row}>
								<AppText style={[styles.secondary, { marginRight: 5 }]}>
									Didn't receive code?
								</AppText>
								{resendOrCountDown()}
							</View>
						) : null}
						{type !== 'EMAIL' ? (
							<PurpleText text="Reset OTP" onPress={goToReset} />
						) : null}
					</View>
				</Pressable>
			</WithKeyboard>
		</Background>
	)
}

const styles = StyleSheet.create({
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
		flex: 1,
		backgroundColor: colors.PRIMARY_BACKGROUND,
	},
	middle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	primary: {
		color: colors.PRIMARY_TEXT,
		marginTop: 27,
		marginBottom: 12,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		textAlign: 'center',
	},
	twoFaInput: {
		marginTop: 40,
	},
})
