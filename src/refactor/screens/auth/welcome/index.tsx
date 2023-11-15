import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	BackHandler,
	ImageBackground,
} from 'react-native'
import LogoWhite from '@assets/images/LogoWhite.svg'
import { useTheme, Theme } from '@theme/index'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import LanguageSwitcher from '@app/refactor/screens/auth/welcome/components/language-switcher'

const Welcome = ({ navigation }: ScreenProp<'Welcome'>) => {
	const { styles } = useTheme(_style)

	BackHandler.addEventListener('hardwareBackPress', () => true)

	const goToLogin = () => navigation.navigate('Login')
	const goToRegistration = () => navigation.navigate('Registration')

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
					<LogoWhite style={styles.logo} />
					<AppText variant="headline" style={styles.primary}>
						Welcome to Cryptal
					</AppText>
					<AppText variant="l" style={styles.subtext}>
						Secure and Simple · Your Gateway to the Global Crypto Universe
					</AppText>
					<View style={styles.paddingHorizontal}>
						<AppButton
							variant="primary"
							text="Login"
							onPress={goToLogin}
							style={styles.button}
						/>
						<AppButton
							variant="text"
							text="Registration"
							onPress={goToRegistration}
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

export default Welcome
