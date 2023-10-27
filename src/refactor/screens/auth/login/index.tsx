import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '@assets/images/Logo.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppInput from '@components/input'
import AppText from '@components/text'
import {
	startLoginThunk,
	usernameAndPaswordThunk,
} from '@store/redux/auth/thunks'
import GeneralError from '@app/components/GeneralError'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { errorHappenedHere } from '@app/utils/appUtils'
import Constants from 'expo-constants'

const LOGIN_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const vaxo_realuri = {
	login: 'Vakhtang.elisabedashvili@gmail.com',
	password: '11111!Aa',
}
const vaxo_satesto = { login: 'metro21@mailinator.com', password: '11111!Aa' }
const baneta_realuri = { login: 'ibanet@cryptx.com', password: 'Malina125$' }
const kervala = { login: 'gkerva@cryptal.com', password: 'TestGexCryptal7' }
const sali = { login: 'bukhiashvilisalome@gmail.com', password: 'Salome1996' }
const saliSatesto = {
	login: 'salo131@mailinator.com',
	password: 'Salome1996',
}
const banetaSms = { mail: 'iraklibanetishvili@yahoo.com', pass: 'Salo125' }
const testMail = { mail: 'remora.419@gmail.com', pass: 'Derrickrose1$' }

const Login = ({ navigation }: ScreenProp<'Login'>) => {
	const { styles } = useTheme(_styles)
	const dispatch = useDispatch()

	const [mail, setMail] = useState('')
	const [mailError, setMailError] = useState<string | boolean>(false)
	const [pass, setPass] = useState('')
	const [passError, setPassError] = useState(false)

	const authLoading = useSelector((state: RootState) => state.auth.authLoading)

	const validMail = LOGIN_REGEX.test(mail)

	useEffect(() => {
		dispatch(startLoginThunk(navigation))
	}, [])

	useEffect(() => {
		return navigation.addListener('focus', () => {
			setMail('')
			setPass('')
			setMailError(false)
			setPassError(false)
		})
	}, [navigation])

	const onLoginPressed = () => {
		if (!pass.trim()) setPassError(true)
		if (!mail.trim()) setMailError(true)
		else if (!validMail) setMailError('Enter Valid Email')

		if (mail.trim() && pass.trim() && validMail) {
			dispatch(usernameAndPaswordThunk({ mail, pass, navigation }))
		}
	}

	const onRegisterPressed = () => navigation.navigate('Registration')
	const onForgotPasswordPressed = () => navigation.navigate('ForgotPassword')

	return (
		<View style={styles.background}>
			<WithKeyboard
				keyboardVerticalOffsetIOS={10}
				contentContainerStyle={styles.container}
				flexGrow={true}
				padding={true}
				modal={undefined}
				refreshControl={undefined}
				scrollUp={false}>
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
					value={mail}
					onChangeText={setMail}
					onFocus={() => setMailError(false)}
					error={mailError}
					label={'Enter Email'}
				/>
				<AppInput
					secureTextEntry={true}
					value={pass}
					style={styles.password}
					onChangeText={setPass}
					onFocus={() => setPassError(false)}
					error={passError}
					label={'Enter Password'}
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
					loading={authLoading}
					style={styles.button}
				/>
				<View style={{ marginBottom: 20 }}>
					<AppText style={styles.secondary}>
						{t('New User?')}{' '}
						<AppButton
							variant="text"
							text="Register"
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
			justifyContent: 'center',
			paddingTop: Platform.select({
				ios: Constants.statusBarHeight + 10,
				android: (StatusBar.currentHeight || 0) + 20,
			}),
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

export default Login
