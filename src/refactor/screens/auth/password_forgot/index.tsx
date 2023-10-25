import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Strong_Password from '@assets/images/User_profile/Strong_Password.svg'
import { Theme, useTheme } from '@theme/index'
import Background from '@components/background'
import { AppButton } from '@components/button'
import AppInput from '@components/input/index'
import AppText from '@components/text'
import {
	forgotPasswordStartThunk,
	resetPasswordOtpThunk,
	resetPasswordThunk,
} from '@store/redux/auth/thunks'
import GeneralError from '@app/components/GeneralError'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { errorHappenedHere } from '@app/utils/appUtils'

const LOGIN_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const COUNTDOWN = 30

const ForgotPassword = ({ navigation }: ScreenProp<'ForgotPassword'>) => {
	const { styles, theme } = useTheme(_styles)
	const dispatch = useDispatch()

	const [mail, setMail] = useState('')
	const [code, setCode] = useState('')
	const [error, setError] = useState(false)
	const [seconds, setSeconds] = useState(COUNTDOWN)
	const [sent, setSent] = useState(false)

	const state = useSelector((state: RootState) => state.auth)
	const { timerVisible } = state

	const validMail = mail.trim().length ? LOGIN_REGEX.test(mail) : false
	const errorText = error ? 'Enter Valid Email' : ''

	useEffect(() => {
		dispatch(forgotPasswordStartThunk({ navigation }))

		return () => {
			state.timerVisible = false
		}
	}, [])

	useEffect(() => {
		if (timerVisible) {
			setTimeout(() => {
				setSent(true)
				setSeconds(seconds - 1)
			}, 1000)
		}
		if (seconds == 1) {
			state.timerVisible = false
		}
	}, [seconds, timerVisible])

	useEffect(() => {
		setError(false)
	}, [mail, code])

	const goToLogin = () => navigation.navigate('Login')

	const onSendPressed = () => {
		if (!validMail) {
			setError(true)
		} else {
			dispatch(resetPasswordThunk({ mail }))
			if (sent) {
				setSeconds(COUNTDOWN)
			}
		}
	}

	const onNextPressed = () => {
		if (!(validMail && code.trim().length)) {
			setError(true)
		} else {
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
		<Background>
			<TouchableOpacity style={styles.back} onPress={goToLogin}>
				<AppButton
					variant="text"
					text="Back to Log In"
					style={styles.backText}
				/>
			</TouchableOpacity>

			<WithKeyboard
				contentContainerStyle={styles.middle}
				modal={undefined}
				refreshControl={undefined}
				scrollUp={undefined}
				padding={undefined}
				flexGrow={undefined}>
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
					rightComponent={<MailInputRight />}
					error={errorText}
				/>
				<AppInput
					labelBackgroundColor={theme.color.backgroundPrimary}
					style={styles.input}
					label="Enter Code"
					value={code}
					onChangeText={setCode}
				/>
				<AppButton
					variant="primary"
					text="Next"
					style={styles.button}
					onPress={onNextPressed}
				/>
			</WithKeyboard>
		</Background>
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
