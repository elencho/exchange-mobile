import {
	NavigationContainer,
	createNavigationContainerRef,
	DefaultTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import MainScreen from '@app/navigation/MainScreen'
import Login from '@app/refactor/screens/auth/login'
import Login2Fa from '@app/refactor/screens/auth/login2fa'
import Maintenance from '@app/refactor/screens/auth/maintenance'
import ResetOtpInstructions from '@app/refactor/screens/auth/otp_reset'
import ForgotPassword from '@app/refactor/screens/auth/password_forgot'
import SetNewPassword from '@app/refactor/screens/auth/password_set'
import Register from '@app/refactor/screens/auth/register/'
import Splash from '@app/refactor/screens/auth/splash/index'
import UpdateAvailable from '@app/refactor/screens/auth/update'
import Welcome from '@app/refactor/screens/auth/welcome'
import UserProfile from '@app/refactor/screens/profile/user-profile'
import TransactionFilter from '@app/refactor/screens/transactions/TransactionFilter'
import CardVerificationOneScreen from '@app/screens/CardVerificationOne'
import CardVerificationTwoScreen from '@app/screens/CardVerificationTwo'
import EmailVerification from '@app/refactor/screens/auth/email_verification'
import Resume from '@app/screens/Resume'
import BalanceScreen from '@app/screens/Wallet/Balance'
import useNotifications from '@app/screens/useNotifications'
import { Screens } from './nav'
import { useDispatch } from 'react-redux'

const Stack = createNativeStackNavigator<Screens>()
export const navigationRef = createNavigationContainerRef()

export default function AppNavigator() {
	const dispatch = useDispatch()
	// const state: any = useSelector((state) => state)
	// const {
	// 	errors: { generalError },
	// } = state

	useNotifications()

	// TODO: this
	// BackHandler.addEventListener('hardwareBackPress', () => true)

	// TODO: This is needed for wallet screen to work, to identify which screen is active,
	// We can remove this after refcatoring wallet screen
	const onStateChange = (state: any) => {
		dispatch({
			type: 'SET_STACK_NAVIGATION_ROUTE',
			stackRoute: state.routes[state.routes.length - 1].name,
		})

		// if (generalError)
		// 	dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })
	}

	return (
		<NavigationContainer
			onStateChange={onStateChange}
			ref={navigationRef}
			theme={{
				dark: true,
				colors: { ...DefaultTheme.colors, background: 'transparent' },
			}}>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
					headerLeft: () => null,
					animation: 'slide_from_right',
				}}
				initialRouteName="Splash">
				<Stack.Screen name="Splash" component={Splash} />
				<Stack.Screen
					name="Welcome"
					component={Welcome}
					options={{ animation: 'fade' }}
				/>
				<Stack.Screen
					name="UpdateAvailable"
					component={UpdateAvailable}
					options={{ animation: 'fade' }}
				/>
				<Stack.Screen
					name="Maintenance"
					component={Maintenance}
					options={{ animation: 'fade' }}
				/>
				<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
				<Stack.Screen name="SetNewPassword" component={SetNewPassword} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Registration" component={Register} />
				<Stack.Screen name="EmailVerification" component={EmailVerification} />
				<Stack.Screen
					name="Main"
					component={MainScreen}
					options={{ animation: 'fade' }}
				/>

				<Stack.Screen name="TransactionFilter" component={TransactionFilter} />
				<Stack.Screen name="UserProfile" component={UserProfile} />
				<Stack.Screen name="Balance" component={BalanceScreen} />

				<Stack.Screen
					name="CardVerificationOne"
					component={CardVerificationOneScreen}
				/>
				<Stack.Screen
					name="CardVerificationTwo"
					component={CardVerificationTwoScreen}
				/>

				<Stack.Screen name="Login2Fa" component={Login2Fa} />
				<Stack.Screen
					name="ResetOtpInstructions"
					component={ResetOtpInstructions}
				/>
				<Stack.Screen
					name="Resume"
					component={Resume}
					options={{ animation: 'fade' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
