import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	BackHandler,
	ImageBackground,
} from 'react-native'
import useNotificationsAndroid from 'screens/useNotificationsAndroid'

import AppButton from 'components/AppButton'
import AppText from 'components/AppText'
import colors from 'constants/colors'
import Logo from 'assets/images/LogoWhite.svg'
import GeneralError from 'components/GeneralError'
import LanguageSwitcher from 'components/LanguageSwitcher'
import useInitApp from 'refactor/features/auth/welcome/hooks/use-init-app'
import PurpleText from 'components/PurpleText'
import { useDispatch } from 'react-redux'
import {
	startLoginAction,
	startRegistrationAction,
} from 'redux/profile/actions'
import { errorHappenedHere } from 'utils/appUtils'

export default function Welcome(navigation: any) {
	useNotificationsAndroid()
	useInitApp(navigation)

	const dispatch = useDispatch()
	const startLogin = () => dispatch(startLoginAction(navigation))
	const startRegistration = () => dispatch(startRegistrationAction(navigation))

	BackHandler.addEventListener('hardwareBackPress', () => true)

	return (
		<TouchableWithoutFeedback
			style={{ flex: 1 }}
			onPress={Keyboard.dismiss}
			accessible={false}>
			<ImageBackground
				style={styles.imageBackground}
				resizeMode="cover"
				source={require('../assets/images/WelcomeBackground.png')}>
				<View style={styles.container}>
					<Logo style={styles.logo} />
					<AppText header style={styles.primary}>
						Welcome to Cryptal
					</AppText>
					<AppText body style={styles.subtext}>
						Secure and Simple · Your Gateway to the Global Crypto Universe
					</AppText>

					<GeneralError
						style={styles.error}
						show={errorHappenedHere('Welcome')}
					/>
					<AppButton text="Login" style={styles.button} onPress={startLogin} />
					<PurpleText
						style={{ fontSize: 16 }}
						text="Registration"
						onPress={startRegistration}
					/>
				</View>
				<LanguageSwitcher />
			</ImageBackground>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	button: {
		width: '90%',
		marginTop: 66,
		marginBottom: 32,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: '12%',
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
		color: colors.PRIMARY_TEXT,
		marginTop: 30,
		marginBottom: 12,
		textAlign: 'center',
	},
	subtext: {
		color: colors.SECONDARY_TEXT,
		marginTop: 12,
		textAlign: 'center',
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		textAlign: 'center',
	},
	imageBackground: {
		flex: 1,
	},
})
