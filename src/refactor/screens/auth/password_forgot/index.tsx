import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { MaterialIndicator } from 'react-native-indicators'
import BackButton from '@components/back_button'
import { FullScreenLoader } from '@components/full_screen_loader'

const LOGIN_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const ForgotPassword = ({ navigation }: ScreenProp<'ForgotPassword'>) => {
	const { styles, theme } = useTheme(_styles)
	const dispatch = useDispatch()

	const [mail, setMail] = useState('')
	const [mailError, setMailError] = useState<string | boolean>(false)
	const [code, setCode] = useState('')
	const [codeError, setCodeError] = useState(false)
	const [seconds, setSeconds] = useState(0)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)

	const alreadySent = useRef(false)

	const language = useSelector((state: RootState) => state.common.language)
	const {
		forgotLoading,
		forgotResendLoading,
		timerVisible,
		fullScreenLoading,
	} = useSelector((state: RootState) => state.auth)

	const validMail = mail.trim().length ? LOGIN_REGEX.test(mail) : false

	useEffect(() => {
		return navigation.addListener('focus', () => {
			setSeconds(0)
			alreadySent.current = false
		})
	}, [navigation])

	useFocusEffect(
		useCallback(() => {
			dispatch(forgotPasswordStartThunk({ navigation }))
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
			alreadySent.current = true
		}
	}, [timerVisible])

	const goBack = () => navigation.goBack()

	const onResendPressed = () => {
		if (mail.trim() && validMail) {
			handleGeneralError(
				() => dispatch(resendPasswordCodeThunk({ mail, navigation })),
				setGeneralErrorData
			)
		} else {
			setMailError(true)
		}
	}

	const onNextPressed = async () => {
		setCodeError(!code.trim())
		setMailError(!(mail.trim() && validMail))
		setGeneralErrorData(null)

		if (mail.trim() && code.trim() && validMail) {
			setGeneralErrorData(null)
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
		const sendText =
			alreadySent.current && language === 'en' ? 'Resend' : 'Send'

		if (forgotResendLoading) {
			return (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					size={16}
					style={{ flex: 0 }}
				/>
			)
		} else if (timerVisible) {
			return (
				<AppText variant="l" style={{ color: theme.color.textPrimary }}>
					{seconds.toString()}
				</AppText>
			)
		} else
			return (
				<AppButton variant="text" text={sendText} onPress={onResendPressed} />
			)
	}

	return (
		<FullScreenLoader loading={fullScreenLoading}>
			<AppBackground>
				<BackButton onPress={goBack} style={styles.back} />

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
						style={styles.inputMail}
						label="Enter Email"
						value={mail}
						onChangeText={setMail}
						onFocusOrChange={() => {
							setMailError(false)
							setGeneralErrorData(null)
						}}
						rightComponent={<MailInputRight />}
						error={mailError}
					/>
					<AppInput
						labelBackgroundColor={theme.color.backgroundPrimary}
						style={styles.inputPass}
						label="Enter Code"
						value={code}
						onChangeText={setCode}
						onFocusOrChange={() => {
							setCodeError(false)
							setGeneralErrorData(null)
						}}
						error={codeError}
					/>
					<AppButton
						variant="primary"
						text="Next"
						style={styles.button}
						onPress={onNextPressed}
						loading={forgotLoading}
					/>
				</WithKeyboard>
			</AppBackground>
		</FullScreenLoader>
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
		inputMail: {
			marginTop: 24,
			width: '100%',
		},
		inputPass: {
			marginTop: 11,
			width: '100%',
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
