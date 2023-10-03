import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { unwrapResult } from '@reduxjs/toolkit'
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	BackHandler,
	ImageBackground,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '@assets/images/Logo.svg'
import { useTheme, Theme } from '@theme/index'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import GeneralError from '@app/components/GeneralError'
import LanguageSwitcher from '@app/components/LanguageSwitcher'
import {
	startLoginAction,
	startRegistrationAction,
} from '@app/redux/profile/actions'
import { startLogin } from '@app/refactor/redux/auth/authThunks'
import { RootState } from '@app/refactor/redux/rootReducer'
import { Screens } from '@app/refactor/setup/nav/types'
import useNotificationsAndroid from '@app/screens/useNotificationsAndroid'
import { errorHappenedHere } from '@app/utils/appUtils'

interface Props extends NativeStackScreenProps<Screens, 'Welcome'> {}

export default function Welcome({ navigation }: Props) {
	const dispatch = useDispatch()
	const { styles } = useTheme(_style)
	const state = useSelector((state: RootState) => state.authReducer)
	useNotificationsAndroid()

	// BackHandler.addEventListener('hardwareBackPress', () => true)
	const startLoginNew = async (): Promise<void> => {
		await dispatch(startLogin())

		console.log(state.loginStartInfo)
		// if (data.execution === 'LOGIN_USERNAME_PASSWORD') {
		// 	navigation.navigate('Login')
		// }
	}
	const startRegistration = () => dispatch(startRegistrationAction(navigation))

	return (
		<TouchableWithoutFeedback
			style={{ flex: 1 }}
			onPress={Keyboard.dismiss}
			accessible={false}>
			<ImageBackground
				style={styles.imageBackground}
				resizeMode="cover"
				source={require('@assets/images/WelcomeBackground.png')}>
				<View style={styles.container}>
					<Logo style={styles.logo} />
					<AppText variant="headline" style={styles.primary}>
						Welcome to Cryptal
					</AppText>
					<AppText variant="l" style={styles.subtext}>
						Secure and Simple · Your Gateway to the Global Crypto Universe
					</AppText>
					<View style={styles.paddingHorizontal}>
						<GeneralError
							style={styles.error}
							show={errorHappenedHere('Welcome')}
						/>
						<AppButton
							variant="primary"
							text="Login"
							onPress={startLoginNew}
							style={styles.button}
						/>
						<AppButton
							variant="text"
							text="Registration"
							onPress={startRegistration}
							style={{ fontSize: 16 }}
						/>
					</View>
				</View>
				<LanguageSwitcher />
			</ImageBackground>
		</TouchableWithoutFeedback>
	)
}

const _style = (theme: Theme) =>
	StyleSheet.create({
		button: {
			width: '90%',
			marginTop: 66,
			marginBottom: 32,
		},
		container: {
			flex: 1,
			justifyContent: 'center',
		},
		error: {
			marginTop: 20,
		},
		flex: {
			flex: 1,
		},
		loader: {
			flex: 1,
		},
		primary: {
			color: theme.color.textPrimary,
			marginTop: 30,
			marginBottom: 11,
			textAlign: 'center',
			width: '100%',
		},
		subtext: {
			color: theme.color.textSecondary,
			textAlign: 'center',
		},
		secondary: {
			color: theme.color.textSecondary,
			textAlign: 'center',
		},
		imageBackground: {
			flex: 1,
		},
		paddingHorizontal: {
			paddingHorizontal: '12%',
			alignItems: 'center',
			justifyContent: 'center',
		},
		logo: {
			alignSelf: 'center',
		},
	})
