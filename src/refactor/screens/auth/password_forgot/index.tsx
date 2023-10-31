import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Strong_Password from '@assets/images/User_profile/Strong_Password.svg'
import { Theme, useTheme } from '@theme/index'
import AppBackground from '@components/background'
import { AppButton } from '@components/button'
import AppInput from '@components/input/index'
import AppText from '@components/text'
import {
	forgotPasswordStartThunk,
	resetPasswordOtpThunk,
	resetPasswordStartThunk,
} from '@store/redux/auth/thunks'
import GeneralError from '@app/components/GeneralError'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { errorHappenedHere } from '@app/utils/appUtils'
import { setTimer } from '@store/redux/auth/slice'
import { COUNTDOWN_SECONDS } from '@app/refactor/common/constants'

const LOGIN_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const COUNTDOWN = 30

const ForgotPassword = ({ navigation }: ScreenProp<'ForgotPassword'>) => {
	const { styles, theme } = useTheme(_styles)
	const dispatch = useDispatch()

	const [mail, setMail] = useState('')
	const [mailError, setMailError] = useState<string | boolean>(false)
	const [code, setCode] = useState('')
	const [codeError, setCodeError] = useState(false)

	const [seconds, setSeconds] = useState(0)
	const [sent, setSent] = useState(false)

	const { authLoading, timerVisible } = useSelector(
		(state: RootState) => state.auth
	)

	const validMail = mail.trim().length ? LOGIN_REGEX.test(mail) : false

	useEffect(() => {
		dispatch(forgotPasswordStartThunk({ navigation }))

		return () => {
			dispatch(setTimer(false))
		}
	}, [])

	useEffect(() => {
		if (!timerVisible) return

		if (seconds) {
			setTimeout(() => {
				setSent(true)
				setSeconds(seconds - 1)
			}, 1000)
		} else {
			dispatch(setTimer(false))
		}
	}, [seconds])

	useEffect(() => {
		if (timerVisible) {
			setSeconds(COUNTDOWN_SECONDS)
		}
	}, [timerVisible])

	const goToLogin = () => navigation.navigate('Login')

	const onSendPressed = () => {
		if (!mail.trim()) setMailError(true)
		else if (!validMail) setMailError('Enter Valid Email')

		if (mail.trim() && validMail) {
			dispatch(resetPasswordStartThunk({ mail }))
			if (sent) {
				setSeconds(COUNTDOWN)
			}
		}
	}

	const onNextPressed = () => {
		if (!code.trim()) setCodeError(true)
		if (!mail.trim()) setMailError(true)
		else if (!validMail) setMailError('Enter Valid Email')

		if (mail.trim() && code.trim() && validMail) {
			dispatch(resetPasswordOtpThunk({ mail, otp: code, navigation }))
		}
	}

	const MailInputRight = () => {
		if (timerVisible) {
			return (
				<AppText variant="l" style={{ color: theme.color.textPrimary }}>
					{seconds.toString()}
				</AppText>
			)
		} else
			return (
				<AppButton
					variant="text"
					text={sent ? 'Resend' : 'Send'}
					onPress={onSendPressed}
				/>
			)
	}

	return (
		<AppBackground>
			<TouchableOpacity style={styles.back} onPress={goToLogin}>
				<AppButton
					variant="text"
					text="Back to Log In"
					style={styles.backText}
				/>
			</TouchableOpacity>

			<WithKeyboard
				contentContainerStyle={styles.middle}
				flexGrow={true}
				padding={true}
				modal={undefined}
				refreshControl={undefined}
				scrollUp={undefined}>
				<Strong_Password width={38} height={46} />

				<View style={{ alignItems: 'center' }}>
					<AppText variant="headline" style={styles.primary}>
						Forgot Your Password?
					</AppText>
					<AppText style={styles.secondary}>
						Enter the code you will receive on your e-mail to recover the
						password
					</AppText>
				</View>

				<GeneralError show={errorHappenedHere('ForgotPassword')} />

				<AppInput
					labelBackgroundColor={theme.color.backgroundPrimary}
					style={styles.input}
					label="Enter Email"
					value={mail}
					onChangeText={setMail}
					onFocus={() => setMailError(false)}
					rightComponent={<MailInputRight />}
					error={mailError}
				/>
				<AppInput
					labelBackgroundColor={theme.color.backgroundPrimary}
					style={styles.input}
					label="Enter Code"
					value={code}
					onChangeText={setCode}
					onFocus={() => setCodeError(false)}
					error={codeError}
				/>
				<AppButton
					variant="primary"
					text="Next"
					style={styles.button}
					onPress={onNextPressed}
					loading={authLoading}
				/>
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
		button: {
			width: '100%',
			marginTop: 84,
		},

		input: {
			width: '100%',
			marginVertical: 6,
		},
		middle: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		primary: {
			color: theme.color.textPrimary,
			marginTop: 18,
			marginBottom: 12,
			textAlign: 'center',
		},
		secondary: {
			color: theme.color.textSecondary,
			textAlign: 'center',
			lineHeight: 22,
			marginBottom: 23,
		},
	})

export default ForgotPassword