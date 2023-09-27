import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { useDispatch, useSelector } from 'react-redux'
import Strong_Password from '@assets/images/User_profile/Strong_Password.svg'
import { Theme, useTheme } from '@theme/index'
import Background from '@components/background'
import { AppButton } from '@components/button'
import AppInput from '@components/input/index'
import AppText from '@components/text'
import GeneralError from '@app/components/GeneralError'
import WithKeyboard from '@app/components/WithKeyboard'
import useForgotPassword from '@app/refactor/screens/password_forgot/use-forgot-password'
import { Screens } from '@app/refactor/setup/nav/types'
import { errorHappenedHere } from '@app/utils/appUtils'

interface Props extends NativeStackScreenProps<Screens, 'ForgotPassword'> {}

export default function ForgotPassword({ navigation }: Props) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const { styles, theme } = useTheme(_styles)

	const [seconds, setSeconds] = useState(30)
	const {
		profile: { forgotPassInfo, timerVisible },
		transactions: { loading },
	}: any = state

	const {
		goToLogin,
		sendCode,
		saveUsername,
		saveCode,
		next,
		error,
		errorText,
		mailValid,
	} = useForgotPassword(forgotPassInfo, navigation)

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
		return () => {
			dispatch({ type: 'SAVE_FORGOT_PASS_INFO', forgotPassInfo: {} })
			dispatch({ type: 'TOGGLE_TIMER', timerVisible: false })
			setSeconds(30)
		}
	}, [])

	const Right = () => {
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
			return (
				<AppText style={{ color: theme.color.textPrimary }}>{seconds}</AppText>
			)
		} else {
			return <AppButton variant="text" text="Send" onPress={sendCode} />
		}
	}

	return (
		<Background>
			<TouchableOpacity style={styles.back} onPress={goToLogin}>
				<AppButton
					variant="text"
					text="Back to Log In"
					style={styles.backText}
					onPress={goToLogin}
				/>
			</TouchableOpacity>

			<WithKeyboard
				contentContainerStyle={styles.middle}
				modal={undefined}
				refreshControl={undefined}>
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
					onChangeText={saveUsername}
					value={forgotPassInfo.username}
					rightComponent={<Right />}
					error={!mailValid && error ? errorText() : ''}
				/>
				<AppInput
					labelBackgroundColor={theme.color.backgroundPrimary}
					style={styles.input}
					label="Enter Code"
					onChangeText={saveCode}
					value={forgotPassInfo.code}
					error={error ? forgotPassInfo.code?.trim() : ''}
				/>
				<AppButton
					variant="primary"
					text="Next"
					style={styles.button}
					onPress={next}
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
