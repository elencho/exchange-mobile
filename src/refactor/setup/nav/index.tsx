import {
	NavigationContainer,
	createNavigationContainerRef,
	DefaultTheme,
	NavigationState,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
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
import useNotifications from '@app/screens/useNotifications'
import NoInternet from '@app/refactor/screens/auth/no_internet'
import { Screens } from './nav'
import { useDispatch, useSelector } from 'react-redux'
import { setGeneralError } from '@store/redux/common/slice'

import { RootState } from '@app/refactor/redux/rootReducer'
import { enableScreens } from 'react-native-screens'
import { useTheme } from '@theme/index'
import NetInfo from '@react-native-community/netinfo'
import useNotificationsAndroid from '@app/screens/useNotificationsAndroid'
import { useNotificationHandler } from 'notifiactionHandler'

enableScreens(false)
const Stack = createNativeStackNavigator<Screens>()
export const navigationRef = createNavigationContainerRef<Screens>()

export default function AppNavigator() {
	const dispatch = useDispatch()
	const {
		errors: { generalError },
	} = useSelector((state: RootState) => state)

	const { theme } = useTheme()
	// useNotifications()
	useNotificationHandler()
	// useNotificationsAndroid()
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
		// if (generalError) dispatch(saveGeneralError(null))
	}

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			if (state.isConnected === false) {
				navigationRef.navigate('NoInternet')
			}
		})
		// showModal({
		// 	title: 'Title',
		// 	redirectUrl: 'google.com',
		// 	callToAction: 'buy it now',
		// 	description:
		// 		'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uti labore et dolore magna aliquyam erat, sed diamsd voluptua. At vero eos et accusam et justo duo asor dolores et ea rebum. Stet clita kasd gubergren, no Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquy. Find out more',
		// 	banner:
		// 		'https://s.yimg.com/ny/api/res/1.2/8y6wUwbKd.9Wbx_MS7t.Vw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTUwNQ--/https://media.zenfs.com/en-US/homerun/fx_empire_176/716acf40f2f984c032e885a3b3a0cf62',
		// })
		return () => unsubscribe()
	}, [])

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
