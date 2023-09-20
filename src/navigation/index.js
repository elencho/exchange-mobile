import {
	NavigationContainer,
	createNavigationContainerRef,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { BackHandler } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { useDispatch, useSelector } from 'react-redux'
import CardVerificationOneScreen from '../screens/CardVerificationOne'
import CardVerificationTwoScreen from '../screens/CardVerificationTwo'
import EmailVerification from '../screens/EmailVerification'
import ForgotPasswordScreen from '../screens/ForgotPassword'
import LoginScreen from '../screens/Login'
import Login2FaScreen from '../screens/Login2Fa'
import MaintananceScreen from '../screens/Maintanance'
import RegistrationScreen from '../screens/Registration'
import ResetOtpInstructionsScreen from '../screens/ResetOtpInstructions'
import Resume from '../screens/Resume'
import SetNewPasswordScreen from '../screens/SetNewPassword'
import TransactionFilter from '../screens/TransactionFilter'
import UpdateAvailableScreen from '../screens/UpdateAvailable'
import UserProfileScreen from '../screens/UserProfile'
import BalanceScreen from '../screens/Wallet/Balance'
import WelcomeScreen from '../screens/Welcome'
import useNotifications from '../screens/useNotifications'
import MainScreen from './MainScreen'

enableScreens(false)
const Stack = createNativeStackNavigator()
export const navigationRef = createNavigationContainerRef()

export default function Navigator() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		errors: { generalError },
	} = state

	BackHandler.addEventListener('hardwareBackPress', () => true)

	const onStateChange = (state) => {
		dispatch({
			type: 'SET_STACK_NAVIGATION_ROUTE',
			stackRoute: state.routes[state.routes.length - 1].name,
		})
		if (generalError)
			dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })
	}

	const screenOptions = {
		headerShown: false,
		gestureEnabled: false,
		headerLeft: () => null,
		animation: 'slide_from_right',
		navigationBarColor: '#161629',
	}

	useNotifications()

	return (
		<NavigationContainer
			onStateChange={onStateChange}
			ref={navigationRef}
			theme={{ colors: { background: 'transparent' } }}>
			<Stack.Navigator
				// initialRouteName={'SplashScreen'}
				screenOptions={screenOptions}>
				{/* TODO:remove */}
				{/* <Stack.Screen
          options={{ animation: 'fade' }}
          name="SplashScreen"
          component={Splash}
        /> */}
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
				<Stack.Screen
					name="UpdateAvailable"
					component={UpdateAvailableScreen}
				/>
				<Stack.Screen name="Maintanance" component={MaintananceScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Registration" component={RegistrationScreen} />
				<Stack.Screen name="EmailVerification" component={EmailVerification} />
				<Stack.Screen
					options={{ animation: 'fade', navigationBarColor: '#1F1F35' }}
					name="Main"
					component={MainScreen}
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
					options={{ animation: 'fade' }}
					component={Resume}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
