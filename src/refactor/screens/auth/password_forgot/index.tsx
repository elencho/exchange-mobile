import React, { useCallback, useEffect, useState } from 'react'
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
	resetPasswordConfirmCodeThunk as resetPasswordConfirmCodeThunk,
	resendPasswordCodeThunk,
} from '@store/redux/auth/thunks'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { setTimer } from '@store/redux/auth/slice'
import { COUNTDOWN_SECONDS } from '@app/refactor/common/constants'
import GeneralError from '@components/general_error'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'
import { useFocusEffect } from '@react-navigation/native'

const LOGIN_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const COUNTDOWN = 30

const ForgotPassword = ({ navigation }: ScreenProp<'ForgotPassword'>) => {
	const { styles, theme } = useTheme(_styles)
	const dispatch = useDispatch()
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)

	const [mail, setMail] = useState('')
	const [mailError, setMailError] = useState<string | boolean>(false)
	const [code, setCode] = useState('')
	const [codeError, setCodeError] = useState(false)

	const [seconds, setSeconds] = useState(0)

	const { authLoading, timerVisible } = useSelector(
		(state: RootState) => state.auth
	)

	const validMail = mail.trim().length ? LOGIN_REGEX.test(mail) : false

	useFocusEffect(
		useCallback(() => {
			dispatch(forgotPasswordStartThunk({ navigation }))

			return () => {
				dispatch(setTimer(false))
			}
		}, [])
	)

	useEffect(() => {
		if (seconds) {
			setTimeout(() => {
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

	const onResendPressed = () => {
		if (!mail.trim()) setMailError(true)
		else if (!validMail) setMailError('Enter Valid Email')

		if (mail.trim() && validMail) {
			handleGeneralError(
				() => dispatch(resendPasswordCodeThunk({ mail })),
				setGeneralErrorData
			)

			setSeconds(COUNTDOWN)
		}
	}

	const onNextPressed = async () => {
		if (!code.trim()) setCodeError(true)
		if (!mail.trim()) setMailError(true)
		else if (!validMail) setMailError('Enter Valid Email')

		if (mail.trim() && code.trim() && validMail) {
			handleGeneralError(
				() =>
					dispatch(
						resetPasswordConfirmCodeThunk({ mail, otp: code, navigation })
					),
				setGeneralErrorData
			)
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
				<AppButton variant="text" text={'Send'} onPress={onResendPressed} />
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
				<GeneralError errorData={generalErrorData} />
				<AppInput
					labelBackgroundColor={theme.color.backgroundPrimary}
					style={styles.input}
					label="Enter Email"
					value={mail}
					onChangeText={setMail}
					onFocusOrChange={() => setMailError(false)}
					rightComponent={<MailInputRight />}
					error={mailError}
				/>
				<AppInput
					labelBackgroundColor={theme.color.backgroundPrimary}
					style={styles.input}
					label="Enter Code"
					value={code}
					onChangeText={setCode}
					onFocusOrChange={() => setCodeError(false)}
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
