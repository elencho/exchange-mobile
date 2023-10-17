import {
	NavigationContainer,
	createNavigationContainerRef,
	DefaultTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { BackHandler } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MainScreen from '@app/navigation/MainScreen'
import Login from '@app/refactor/screens/auth/login'
import Login2Fa from '@app/refactor/screens/auth/login2fa/Login2Fa'
import Maintenance from '@app/refactor/screens/auth/maintenance'
import ForgotPassword from '@app/refactor/screens/auth/password_forgot/index'
import Splash from '@app/refactor/screens/auth/splash/index'
import UpdateAvailable from '@app/refactor/screens/auth/update'
import Welcome from '@app/refactor/screens/auth/welcome'
import UserProfile from '@app/refactor/screens/profile/user-profile'
import CardVerificationOneScreen from '@app/screens/CardVerificationOne'
import CardVerificationTwoScreen from '@app/screens/CardVerificationTwo'
import EmailVerification from '@app/screens/EmailVerification'
import RegistrationScreen from '@app/screens/Registration'
import ResetOtpInstructionsScreen from '@app/screens/ResetOtpInstructions'
import Resume from '@app/screens/Resume'
import SetNewPasswordScreen from '@app/screens/SetNewPassword'
import TransactionFilter from '@app/screens/TransactionFilter'
import BalanceScreen from '@app/screens/Wallet/Balance'
import useNotifications from '@app/screens/useNotifications'
import { Screens } from './types'

const Stack = createNativeStackNavigator<Screens>()
export const navigationRef = createNavigationContainerRef()

export default function AppNavigator() {
	// const dispatch = useDispatch()
	// const state: any = useSelector((state) => state)
	// const {
	// 	errors: { generalError },
	// } = state

	useNotifications()

	// BackHandler.addEventListener('hardwareBackPress', () => true)

	// const onStateChange = (state: any) => {
	// 	console.log('asd')
	// 	dispatch({
	// 		type: 'SET_STACK_NAVIGATION_ROUTE',
	// 		stackRoute: state.routes[state.routes.length - 1].name,
	// 	})
	// 	if (generalError)
	// 		dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })
	// }

	return (
		<NavigationContainer
			// onStateChange={onStateChange}
			ref={navigationRef}
			// TODO: Check theme
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
				<Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Registration" component={RegistrationScreen} />
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
					component={ResetOtpInstructionsScreen}
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
