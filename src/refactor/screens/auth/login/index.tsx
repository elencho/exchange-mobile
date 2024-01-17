import { t } from 'i18next'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import GeneralError from '@components/general_error'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { NavProp, ScreenProp } from '@app/refactor/setup/nav/nav'
import Constants from 'expo-constants'
import { setGeneralError } from '@store/redux/common/slice'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { setLoginLoading } from '@store/redux/auth/slice'
import { FullScreenLoader } from '@components/full_screen_loader'

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

const Login = ({ navigation, route }: ScreenProp<'Login'>) => {
	const { styles } = useTheme(_styles)
	const dispatch = useDispatch()

	const [mail, setMail] = useState('ibanet@cryptx.com')
	const [mailError, setMailError] = useState<boolean>(false)
	const [pass, setPass] = useState('Malina125$')
	const [passError, setPassError] = useState(false)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)

	const { loginLoading, fullScreenLoading } = useSelector(
		(state: RootState) => state.auth
	)

	useFocusEffect(
		useCallback(() => {
			dispatch(startLoginThunk(navigation))
		}, [])
	)

	const alreadyDrewPassedError = useRef(false)

	useEffect(() => {
		return navigation.addListener('focus', () => {
			setMail('ibanet@cryptx.com')
			setPass('Malina125$')
			setMailError(false)
			setPassError(false)
			setLoginLoading(false)

			const passedErr = route.params?.generalError

			if (!alreadyDrewPassedError.current && passedErr) {
				setGeneralErrorData(passedErr)
				alreadyDrewPassedError.current = true
			} else {
				setGeneralErrorData(null)
			}
		})
	}, [navigation])

	const onLoginPressed = async () => {
		const passEmpty = pass.trim().length === 0
		const mailEmpty = mail.trim().length === 0
		const mailValid = LOGIN_REGEX.test(mail)

		setGeneralErrorData(null)
		setPassError(passEmpty)
		setMailError(mailEmpty || !mailValid)

		if (!passEmpty && !mailEmpty && mailValid) {
			setGeneralErrorData(null)
			handleGeneralError(
				() => dispatch(usernameAndPaswordThunk({ mail, pass, navigation })),
				setGeneralErrorData
			)
		}
	}

	const onRegisterPressed = () => navigation.navigate('Registration')
	const onForgotPasswordPressed = () => navigation.navigate('ForgotPassword')

	return (
		<View style={styles.background}>
			<FullScreenLoader loading={fullScreenLoading}>
				<WithKeyboard
					keyboardVerticalOffsetIOS={0}
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
						{<GeneralError errorData={generalErrorData} />}
					</View>
					<AppInput
						style={styles.email}
						value={mail}
						onChangeText={setMail}
						onFocusOrChange={() => {
							setMailError(false)
							setGeneralErrorData(null)
						}}
						error={mailError}
						label={'Enter Email'}
					/>
					<AppInput
						secureTextEntry={true}
						value={pass}
						style={styles.password}
						onChangeText={setPass}
						onFocusOrChange={() => {
							setPassError(false)
							setGeneralErrorData(null)
						}}
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
						style={styles.button}
						loading={loginLoading}
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
			</FullScreenLoader>
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
			marginTop: 11,
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
