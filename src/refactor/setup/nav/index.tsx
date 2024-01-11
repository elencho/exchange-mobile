import {
	NavigationContainer,
	createNavigationContainerRef,
	DefaultTheme,
	NavigationState,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useRef, useState } from 'react'
import Main from '@app/refactor/screens/auth/main'
import Resume from '@app/refactor/screens/auth/resume'
import Login from '@app/refactor/screens/auth/login'
import Login2Fa from '@app/refactor/screens/auth/login2fa'
import Maintenance from '@app/refactor/screens/auth/maintenance'
import ResetOtp from '@app/refactor/screens/auth/otp_reset'
import ForgotPassword from '@app/refactor/screens/auth/password_forgot'
import SetNewPassword from '@app/refactor/screens/auth/password_set'
import Register from '@app/refactor/screens/auth/register/'
import Splash from '@app/refactor/screens/auth/splash/index'
import UpdateAvailable from '@app/refactor/screens/auth/update'
import Welcome from '@app/refactor/screens/auth/welcome'
import UserProfile from '@app/refactor/screens/profile/user-profile'
import EmailVerification from '@app/refactor/screens/auth/email_verification'
import CardVerificationOneScreen from '@app/screens/CardVerificationOne'
import CardVerificationTwoScreen from '@app/screens/CardVerificationTwo'
import BalanceScreen from '@app/screens/Wallet/Balance'
import NoInternet from '@app/refactor/screens/auth/no_internet'
import { Screens } from './nav'
import { useDispatch } from 'react-redux'
import { setGeneralError } from '@store/redux/common/slice'

import { enableScreens } from 'react-native-screens'
import { useTheme } from '@theme/index'
import NetInfo from '@react-native-community/netinfo'
import { AppState, AppStateStatus } from 'react-native'
import { getNotification, inAppNotificationListener } from 'getNotification'

enableScreens(false)
const Stack = createNativeStackNavigator<Screens>()
export const navigationRef = createNavigationContainerRef<Screens>()

export default function AppNavigator() {
	const dispatch = useDispatch()

	const [currentPage, setCurrentPage] = useState('Splash')
	const [activeAppState, setActiveAppState] = useState(AppState.currentState)
	const appState = useRef(AppState.currentState)
	const { theme } = useTheme()

	// const { showModal } = useModal()
	const onNavigationChanged = (state?: NavigationState) => {
		setTimeout(() => {
			dispatch(setGeneralError(undefined))
		}, 10)

		// TODO: This is needed for wallet screen to work, to identify which screen is active,
		// We can remove this after refcatoring wallet screen
		dispatch({
			type: 'SET_STACK_NAVIGATION_ROUTE',
			stackRoute: state?.routes[state.routes.length - 1].name,
		})
		setCurrentPage(state?.routes[state.routes.length - 1].name)
	}
	useEffect(() => {
		AppState.addEventListener('change', _handleAppStateChange)

		return () => {
			AppState.removeEventListener('change', _handleAppStateChange)
		}
	}, [])

	const _handleAppStateChange = (nextAppState: AppStateStatus) => {
		appState.current = nextAppState
		setActiveAppState(appState.current)
	}

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			if (
				activeAppState === 'active' &&
				currentPage !== 'Splash' &&
				currentPage !== 'Resume' &&
				state.isConnected === false
			) {
				navigationRef.navigate('NoInternet')
			}
		})
		return () => unsubscribe()
	}, [currentPage, activeAppState])
	getNotification()
	inAppNotificationListener()

	return (
		<NavigationContainer
			onStateChange={onNavigationChanged}
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
					navigationBarColor: theme.color.backgroundPrimary,
				}}
				initialRouteName="Splash">
				<Stack.Screen name="Splash" component={Splash} />
				<Stack.Screen
					name="Welcome"
					component={Welcome}
					options={{ animation: 'fade' }}
				/>
				<Stack.Screen
					name="NoInternet"
					component={NoInternet}
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
					component={Main}
					options={{
						animation: 'fade',
						navigationBarColor: theme.color.backgroundSecondary,
					}}
				/>

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
				<Stack.Screen name="ResetOtpInstructions" component={ResetOtp} />
				<Stack.Screen
					name="Resume"
					component={Resume}
					options={{ animation: 'fade' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
