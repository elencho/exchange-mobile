import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Strong_Password from '@assets/images/User_profile/Strong_Password.svg'
import { Theme, useTheme } from '@theme/index'
import Background from '@components/background'
import { AppButton } from '@components/button'
import AppInput from '@components/input'
import AppText from '@components/text'
import { setNewPasswordOtpThunk } from '@store/redux/auth/thunks'
import WithKeyboard from '@app/components/WithKeyboard'
import { startLoginAction } from '@app/redux/profile/actions'
import { Screens } from '@app/refactor/setup/nav/nav'

interface Props extends NativeStackScreenProps<Screens, 'SetNewPassword'> {}

export default function SetNewPassword({ navigation }: Props) {
	const dispatch = useDispatch()
	const { theme, styles } = useTheme(_styles)

	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [error, setError] = useState(false)

	useEffect(() => {
		error && setError(false)
	}, [pass, confirmPass])

	const goToLogin = () => navigation.navigate('Login')

	const passLength = pass?.length >= 8
	const hasNumber = /\d/.test(pass)
	const hasUpperAndLower = /([A-Z].*[a-z]|[a-z].*[A-Z])/.test(pass)
	const passValid = passLength && hasNumber && hasUpperAndLower

	const errorStyle = (valid: boolean) => {
		return !valid && pass ? { color: theme.color.error } : {}
	}

	const setNewPassword = () => {
		if (pass !== confirmPass || !passValid) {
			setError(true)
		} else {
			dispatch(
				setNewPasswordOtpThunk({ newPass: pass, confirmPass, navigation })
			)
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
				flexGrow={true}
				padding={true}
				contentContainerStyle={styles.middle}
				modal={undefined}
				refreshControl={undefined}
				scrollUp={undefined}>
				<Strong_Password
					style={{ alignSelf: 'center', transform: [{ scaleY: 1.1 }] }}
				/>

				<View style={{ alignItems: 'center' }}>
					<AppText variant="headline" style={styles.primary}>
						Set New Password
					</AppText>
					<AppText style={styles.secondary}>
						Generate new password for your account
					</AppText>
				</View>

				<AppInput
					labelBackgroundColor={theme.color.backgroundPrimary}
					style={styles.input}
					label="Enter New Password"
					onChangeText={setPass}
					value={pass}
					secureTextEntry
					error={error && (!passValid || !pass)}
				/>

				<View>
					<Text style={styles.validations}>
						<AppText variant="m" style={errorStyle(passLength)}>
							8 or more characters,
						</AppText>{' '}
						<AppText variant="m" style={errorStyle(hasUpperAndLower)}>
							Upper & lowercase letters,
						</AppText>{' '}
						<AppText variant="m" style={errorStyle(hasNumber)}>
							At least one number,
						</AppText>
					</Text>
				</View>

				<AppInput
					labelBackgroundColor={theme.color.backgroundPrimary}
					style={styles.input}
					label="Confirm New Password"
					onChangeText={setConfirmPass}
					value={confirmPass}
					secureTextEntry
					error={error && pass !== confirmPass}
				/>

				<AppButton
					variant="primary"
					text="Save"
					style={styles.button}
					onPress={setNewPassword}
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
		validations: {
			color: theme.color.textSecondary,
			fontSize: 11,
			lineHeight: 15,
		},
	})
