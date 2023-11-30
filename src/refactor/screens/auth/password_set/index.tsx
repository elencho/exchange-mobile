import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Strong_Password from '@assets/images/User_profile/Strong_Password.svg'
import { Theme, useTheme } from '@theme/index'
import Background from '@components/background'
import { AppButton } from '@components/button'
import AppInput from '@components/input'
import AppText from '@components/text'
import { setNewPasswordOtpThunk } from '@store/redux/auth/thunks'
import WithKeyboard from '@app/components/WithKeyboard'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { RootState } from '@app/refactor/redux/rootReducer'
import { System } from '@app/refactor/common/util'

const SetNewPassword = ({ navigation }: ScreenProp<'SetNewPassword'>) => {
	const dispatch = useDispatch()
	const { theme, styles } = useTheme(_styles)

	const [pass, setPass] = useState('')
	const [passError, setPassError] = useState(false)

	const [confirmPass, setConfirmPass] = useState('')
	const [confirmPassError, setConfirmPassError] = useState(false)

	const { setPasswordLoading } = useSelector((state: RootState) => state.auth)

	const goToLogin = () => navigation.navigate('Login')

	const passLength = pass?.length >= 8
	const hasNumber = /\d/.test(pass)
	const hasUpperAndLower = /([A-Z].*[a-z]|[a-z].*[A-Z])/.test(pass)
	const passValid = passLength && hasNumber && hasUpperAndLower

	useEffect(() => {
		setConfirmPassError(confirmPass.length > 0 && confirmPass !== pass)
	}, [confirmPass])

	const onSavePressed = () => {
		if (pass !== confirmPass || !passValid) {
			setPassError(true)
			setConfirmPassError(true)
		} else {
			dispatch(
				setNewPasswordOtpThunk({ newPass: pass, confirmPass, navigation })
			)
		}
	}

	const styleManyChars = pass.length > 0 && !passLength && styles.redText
	const styleUpperLower = pass.length > 0 && !hasUpperAndLower && styles.redText
	const styleHasNumber = pass.length > 0 && !hasNumber && styles.redText

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
					style={styles.inputNewPass}
					label="Enter New Password"
					onChangeText={setPass}
					onFocusOrChange={() => setPassError(false)}
					value={pass}
					secureTextEntry={true}
					error={passError && (!passValid || !pass)}
				/>

				<View>
					<Text style={styles.validations}>
						<AppText variant="m" style={styleManyChars}>
							8_more_chars_registration
						</AppText>
						<AppText style={styleManyChars}>{', '}</AppText>
						<AppText variant="m" style={styleUpperLower}>
							upper_lowercase_letters_registration
						</AppText>
						<AppText style={styleUpperLower}>{', '}</AppText>
						<AppText variant="m" style={styleHasNumber}>
							at_least_one_number
						</AppText>
					</Text>
				</View>

				<AppInput
					labelBackgroundColor={theme.color.backgroundPrimary}
					style={styles.inputConfirmPass}
					label="Confirm New Password"
					onChangeText={setConfirmPass}
					onFocusOrChange={() => {
						setConfirmPassError(false)
					}}
					value={confirmPass}
					secureTextEntry={true}
					error={confirmPassError}
				/>

				<AppButton
					variant="primary"
					text="Save"
					style={styles.button}
					onPress={onSavePressed}
					loading={setPasswordLoading}
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
		inputNewPass: {
			marginTop: 24,
			width: '100%',
		},
		inputConfirmPass: {
			marginTop: System.isAndroid ? 5 : 11,
			width: '100%',
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
			marginTop: 8,
		},
		redText: {
			color: theme.color.error,
		},
	})

export default SetNewPassword
