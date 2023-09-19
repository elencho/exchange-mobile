import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	BackHandler,
	ImageBackground,
} from 'react-native'
import useNotificationsAndroid from 'screens/useNotificationsAndroid'

import colors from 'constants/colors'
import Logo from 'assets/images/LogoWhite.svg'
import GeneralError from 'components/GeneralError'
import LanguageSwitcher from 'refactor/screens/welcome/components/language-switcher'
import useInitApp from 'refactor/screens/welcome/hooks/use-init-app'
import { useDispatch } from 'react-redux'
import {
	startLoginAction,
	startRegistrationAction,
} from 'redux/profile/actions'
import { errorHappenedHere } from 'utils/appUtils'
import { Button } from 'refactor/common/components/button'
import { Navigation } from 'refactor/setup/nav/types'
import Text from 'refactor/common/components/text'
import { useTheme } from 'refactor/setup/theme/index.context'
import { Theme } from 'refactor/setup/theme'

export default function Welcome(navigation: Navigation) {
	const dispatch = useDispatch()
	const { styles } = useTheme(_style)

	useNotificationsAndroid()
	useInitApp(navigation)

	BackHandler.addEventListener('hardwareBackPress', () => true)

	const startLogin = () => dispatch(startLoginAction(navigation))
	const startRegistration = () => dispatch(startRegistrationAction(navigation))

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
					<Logo />
					<Text variant="headline">Welcome to Cryptal</Text>
					<Text variant="l" style={styles.subtext}>
						Secure and Simple · Your Gateway to the Global Crypto Universe
					</Text>
					<GeneralError
						style={styles.error}
						show={errorHappenedHere('Welcome')}
					/>
					<Button
						variant="primary"
						text="Login"
						onPress={startLogin}
						style={styles.button}
					/>
					<Button
						variant="primary"
						text="Registration"
						onPress={startRegistration}
						style={{ fontSize: 16 }}
					/>
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
			color: theme.color.textPrimary,
			marginTop: 30,
			marginBottom: 12,
			textAlign: 'center',
		},
		subtext: {
			color: theme.color.textSecondary,
			marginTop: 12,
			textAlign: 'center',
		},
		secondary: {
			color: theme.color.textSecondary,
			textAlign: 'center',
		},
		imageBackground: {
			flex: 1,
		},
	})
