import {
	NavigationContainer,
	createNavigationContainerRef,
	DefaultTheme,
	useRoute,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { BackHandler } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MainScreen from '@app/navigation/MainScreen'
import Splash from '@app/refactor/screens/splash/index'
import Welcome from '@app/refactor/screens/welcome'
import CardVerificationOneScreen from '@app/screens/CardVerificationOne'
import CardVerificationTwoScreen from '@app/screens/CardVerificationTwo'
import EmailVerification from '@app/screens/EmailVerification'
import ForgotPasswordScreen from '@app/screens/ForgotPassword'
import LoginScreen from '@app/screens/Login'
import Login2FaScreen from '@app/screens/Login2Fa'
import MaintananceScreen from '@app/screens/Maintanance'
import RegistrationScreen from '@app/screens/Registration'
import ResetOtpInstructionsScreen from '@app/screens/ResetOtpInstructions'
import Resume from '@app/screens/Resume'
import SetNewPasswordScreen from '@app/screens/SetNewPassword'
import TransactionFilter from '@app/screens/TransactionFilter'
import UpdateAvailableScreen from '@app/screens/UpdateAvailable'
import UserProfileScreen from '@app/screens/UserProfile'
import BalanceScreen from '@app/screens/Wallet/Balance'
//import Welcome from '@app/screens/Welcome'
import useNotifications from '@app/screens/useNotifications'
import { ScreenProps } from './types'

const Stack = createNativeStackNavigator<ScreenProps>()
export const navigationRef = createNavigationContainerRef()

export default function AppNavigator() {
	const dispatch = useDispatch()
	const state: any = useSelector((state) => state)
	const {
		errors: { generalError },
	} = state

	useNotifications()

	BackHandler.addEventListener('hardwareBackPress', () => true)

	const onStateChange = (state: any) => {
		dispatch({
			type: 'SET_STACK_NAVIGATION_ROUTE',
			stackRoute: state.routes[state.routes.length - 1].name,
		})
		if (generalError)
			dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })
	}

	return (
		<NavigationContainer
			onStateChange={onStateChange}
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
					component={UpdateAvailableScreen}
					options={{ animation: 'fade' }}
				/>
				<Stack.Screen
					name="Maintenance"
					component={MaintananceScreen}
					options={{ animation: 'fade' }}
				/>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Registration" component={RegistrationScreen} />
				<Stack.Screen name="EmailVerification" component={EmailVerification} />
				<Stack.Screen
					name="Main"
					component={MainScreen}
					options={{ animation: 'fade' }}
				/>

				<Stack.Screen name="TransactionFilter" component={TransactionFilter} />
				<Stack.Screen name="UserProfile" component={UserProfileScreen} />
				<Stack.Screen name="Balance" component={BalanceScreen} />

				<Stack.Screen
					name="CardVerificationOne"
					component={CardVerificationOneScreen}
				/>
				<Stack.Screen
					name="CardVerificationTwo"
					component={CardVerificationTwoScreen}
				/>

				<Stack.Screen name="Login2Fa" component={Login2FaScreen} />
				<Stack.Screen
					name="ResetOtpInstructions"
					component={ResetOtpInstructionsScreen}
				/>
				<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
				<Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
				<Stack.Screen
					name="Resume"
					component={Resume}
					options={{ animation: 'fade' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
