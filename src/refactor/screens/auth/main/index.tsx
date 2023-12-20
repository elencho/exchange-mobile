import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import jwt_decode from 'jwt-decode'
import React, { memo, useCallback, useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { useDispatch, useSelector } from 'react-redux'
import TransactionHistory from '@app/refactor/screens/transactions/transactions_history'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { useTheme } from '@theme/index'
import BottomTabs from '@app/components/BottomTabs'
import { RootState } from '@app/refactor/redux/rootReducer'
import { TokenParams } from '@app/refactor/types/auth/splash'
import InstantTrade from '@app/screens/InstantTrade'
import Wallet from '@app/screens/Wallet'
import Exchange from '@app/screens/Exchange'
import { setTabRouteName } from '@app/redux/transactions/actions'
import { biometricDiffElapsed } from '@app/refactor/utils/authUtils'
import KV from '@store/kv/regular'
import SecureKV from '@store/kv/secure'
import { isEnrolledAsync } from 'expo-local-authentication'
import { System } from '@app/refactor/common/util'
import { fetchUserInfoThunk } from '@app/refactor/redux/profile/profileThunks'
import { useNetInfoInstance } from '@react-native-community/netinfo'

const Tab = createBottomTabNavigator()

const Main = ({ navigation, route }: ScreenProp<'Main'>) => {
	const dispatch = useDispatch()
	const { theme } = useTheme()

	const fromResume = route.params?.fromResume === true
	const prevAppState = useRef<AppStateStatus>()
	const { accessToken } = useSelector((state: RootState) => state.auth)
	const {
		netInfo: { isConnected },
	} = useNetInfoInstance()
	useEffect(() => {
		changeNavigationBarColor(theme.color.backgroundSecondary, true)
		const stateChangeListener = AppState.addEventListener(
			'change',
			handleAppStateChange
		)
		dispatch(fetchUserInfoThunk())

		return () => {
			changeNavigationBarColor(theme.color.backgroundPrimary, true)
			stateChangeListener.remove()
		}
	}, [])

	const resumeIsShown = () => {
		const routes = navigation.getState().routes
		return routes.length > 0 && routes[routes.length - 1].name === 'Resume'
	}

	const isAppClosing = (newState: AppStateStatus) => {
		return System.isIos
			? newState === 'inactive' &&
					(prevAppState.current === 'active' ||
						prevAppState.current === undefined)
			: newState === 'background' &&
					(prevAppState.current === 'active' ||
						prevAppState.current === undefined)
	}

	const handleAppStateChange = useCallback(async (newState: AppStateStatus) => {
		const appClosing = isAppClosing(newState)

		const bioVisible =
			newState === 'active' &&
			!fromResume &&
			accessToken !== undefined &&
			KV.get('webViewVisible') !== true &&
			biometricDiffElapsed() &&
			(await isEnrolledAsync())

		// console.log({
		// 	new: newState,
		// 	prev: prevAppState.current,
		// 	diff: (Date.now() - (KV.get('lastOpenDateMillis') || 0)) / 1000,
		// 	enrolled: await isEnrolledAsync(),
		// 	webView: KV.get('webViewVisible'),
		// 	bioVisible,
		// })

		if (bioVisible) {
			const email = jwt_decode<TokenParams>(accessToken)?.email
			getBiometricEnabled(email)
		}

		if (appClosing && !resumeIsShown()) {
			KV.set('lastOpenDateMillis', Date.now())
		}
		prevAppState.current = newState
	}, [])

	const getBiometricEnabled = async (email: string) => {
		const bioEnabledEmails = await SecureKV.get('bioEnabledEmails')
		const userEnabledBio = bioEnabledEmails?.includes(email)
		if (userEnabledBio && isConnected) {
			navigation.navigate({
				key: 'Resume-uniqueKey',
				name: 'Resume',
				params: {
					from: 'Main',
				},
			})
		}
	}

	return (
		<Tab.Navigator
			screenListeners={{
				state: (e) => {
					const tabs = e?.data?.state
					const tabName = tabs.routes[tabs.index].name
					dispatch(setTabRouteName(tabName))
				},
			}}
			screenOptions={({}) => ({
				headerShown: false,
				unmountOnBlur: true,
				animationEnabled: true,
				lazy: true,
				freezeOnBlur: true,
				swipeEnabled: false,
			})}
			initialRouteName="Trade"
			tabBar={({ state, navigation, descriptors }) => (
				<BottomTabs
					routes={state.routes}
					navigation={navigation}
					descriptors={descriptors}
				/>
			)}>
			<Tab.Screen name="Trade" component={InstantTrade} />
			<Tab.Screen name="Wallet" component={Wallet} />
			<Tab.Screen name="Transactions" component={TransactionHistory} />
			<Tab.Screen name="Exchange" component={Exchange} />
		</Tab.Navigator>
	)
}
export default memo(Main)
