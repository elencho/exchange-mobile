import { t } from 'i18next'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from '@assets/images/Logo.svg'
import { COLORS_DARK } from '@theme/colors'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppInput from '@components/input'
import AppText from '@components/text'
import GeneralError from '@app/components/GeneralError'
import WithKeyboard from '@app/components/WithKeyboard'
import useLogin from '@app/refactor/screens/auth/login/use-login'
import { errorHappenedHere } from '@app/utils/appUtils'

export default function Login() {
	const {
		login,
		password,
		loginError,
		passwordError,
		userProfileLoading,
		onLoginChanged,
		onPasswordChanged,
		onRegisterPressed,
		onLoginPressed,
		onForgotPasswordPressed,
	} = useLogin()

	const { theme, styles } = useTheme(_styles)

	return (
		<View style={styles.background}>
			<WithKeyboard
				contentContainerStyle={styles.container}
				modal={undefined}
				refreshControl={undefined}>
				<Logo style={styles.logo} />
				<View>
					<AppText variant="headline" style={styles.primary}>
						Welcome to Cryptal
					</AppText>
				</View>

				<View style={styles.height42}>
					<GeneralError show={errorHappenedHere('Login')} />
				</View>
				<AppInput
					style={styles.email}
					onChangeText={onLoginChanged}
					value={login}
					error={loginError}
					autoCapitalize="none"
					label={'Enter Email'}
					labelBackgroundColor={theme.color.backgroundPrimary}
				/>
				<AppInput
					secureTextEntry={true}
					onChangeText={onPasswordChanged}
					value={password}
					autoCapitalize="none"
					label={'Enter Password'}
					labelBackgroundColor={theme.color.backgroundPrimary}
					style={styles.password}
					error={passwordError}
					rightComponent={
						<AppButton
							variant="text"
							text="Forgot?"
							onPress={onForgotPasswordPressed}
							style={{ marginLeft: 10 }}
						/>
					}
				/>
				<AppButton
					variant="primary"
					text="Login"
					onPress={onLoginPressed}
					loading={userProfileLoading}
					style={styles.button}
				/>
				<View style={{ marginBottom: 20 }}>
					<AppText style={styles.secondary}>
						{t('New User?')}{' '}
						<AppButton
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

const _styles = (theme: Theme) =>
	StyleSheet.create({
		button: {
			width: '100%',
			marginTop: 84,
			marginBottom: 40,
		},
		background: {
			backgroundColor: theme.color.backgroundPrimary,
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
			color: theme.color.textPrimary,
			marginTop: 30,
			textAlign: 'center',
		},
		secondary: {
			color: theme.color.textSecondary,
			textAlign: 'center',
			lineHeight: 21,
		},
	})
