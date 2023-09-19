import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { t } from 'i18next'

import Logo from 'assets/images/Logo.svg'

import { setCredentials } from 'redux/profile/actions'
import AppInput from 'components/AppInput'
import AppText from 'components/AppText'
import GeneralError from 'components/GeneralError'
import WithKeyboard from 'components/WithKeyboard'
import { errorHappenedHere } from 'utils/appUtils'
import { COLORS_DARK } from 'refactor/setup/theme/colors'
import { Button } from 'refactor/common/components/button'
import useLogin from 'refactor/screens/login/use-login'

export default function Login() {
	const {
		loginText,
		passwordText,
		loginError,
		passwordError,
		userProfileLoading,
		onLoginChanged,
		onPasswordChanged,
		onRegisterPressed,
		onLoginPressed,
		onForgotPasswordPressed,
	} = useLogin()

	return (
		<View style={styles.background}>
			<WithKeyboard padding flexGrow contentContainerStyle={styles.container}>
				<Logo style={styles.logo} />
				<View>
					<AppText header style={styles.primary}>
						Welcome to Cryptal
					</AppText>
				</View>

				<View style={styles.height42}>
					<GeneralError show={errorHappenedHere('Login')} />
				</View>
				<AppInput
					style={styles.email}
					onChangeText={onLoginChanged}
					value={loginText}
					error={loginError?.length != 0}
					errorText={loginError}
					autoCapitalize="none"
					label={'Enter Email'}
					labelBackgroundColor={COLORS_DARK.backgroundPrimary}
				/>
				<AppInput
					secureTextEntry
					onChangeText={onPasswordChanged}
					value={passwordText}
					autoCapitalize={'none'}
					style={styles.password}
					error={passwordError != false}
					right={
						<Button
							variant="text"
							text="Forgot?"
							onPress={onForgotPasswordPressed}
							style={{ marginLeft: 10 }}
						/>
					}
					label={'Enter Password'}
					labelBackgroundColor={COLORS_DARK.backgroundPrimary}
				/>
				<Button
					variant="primary"
					text="Login"
					onPress={onLoginPressed}
					loading={userProfileLoading}
					style={styles.button}
				/>
				<View style={{ marginBottom: 20 }}>
					<AppText style={styles.secondary}>
						{t('New User?')}{' '}
						<Button
							variant="text"
							text={t('Register')}
							onPress={onRegisterPressed}
						/>
					</AppText>
				</View>
			</WithKeyboard>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		width: '100%',
		marginTop: 84,
		marginBottom: 40,
	},
	background: {
		backgroundColor: COLORS_DARK.backgroundPrimary,
		flex: 1,
	},
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: '8%',
	},
	email: {
		marginBottom: 22,
		width: '100%',
	},
	height42: {
		marginBottom: 14,
		marginTop: 20,
		width: '100%',
	},
	logo: {
		width: 48,
		height: 54,
	},
	password: {
		width: '100%',
	},
	primary: {
		color: COLORS_DARK.textPrimary,
		marginTop: 30,
		textAlign: 'center',
	},
	secondary: {
		color: COLORS_DARK.textSecondary,
		textAlign: 'center',
		lineHeight: 21,
	},
})
