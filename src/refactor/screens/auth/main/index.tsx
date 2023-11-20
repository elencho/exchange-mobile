import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
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

const Tab = createBottomTabNavigator()

const Main = ({ navigation, route }: ScreenProp<'Main'>) => {
	const dispatch = useDispatch()
	const { theme } = useTheme()
	const isFocused = useIsFocused()

	const fromResume = route.params?.fromResume === true
	const prevAppState = useRef<AppStateStatus>()
	const { accessToken } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		changeNavigationBarColor(theme.color.backgroundSecondary, true)
		const stateChangeListener = AppState.addEventListener(
			'change',
			handleAppStateChange
		)

		return () => {
			changeNavigationBarColor(theme.color.backgroundPrimary, true)
			stateChangeListener.remove()
		}
	}, [])

	const handleAppStateChange = useCallback(async (newState: AppStateStatus) => {
		const appClosing =
			newState === 'inactive' && prevAppState.current === 'active'

		const bioVisible =
			newState === 'active' &&
			!fromResume &&
			accessToken &&
			!KV.get('webViewVisible') &&
			biometricDiffElapsed()

		if (bioVisible) {
			const email = jwt_decode<TokenParams>(accessToken)?.email
			getBiometricEnabled(email)
		}

		if (appClosing) {
			KV.set('lastOpenDateMillis', Date.now())
		}

		console.log(prevAppState.current, newState)
		prevAppState.current = newState
	}, [])

	const getBiometricEnabled = useCallback(
		async (email: string) => {
			const bioEnabledEmails = await SecureKV.get('bioEnabledEmails')
			const userEnabledBio = bioEnabledEmails?.includes(email)

			if (userEnabledBio && isFocused) {
				navigation.navigate({
					key: 'Resume-uniqueKey',
					name: 'Resume',
					params: {
						from: 'Main',
					},
				})
			}
		},
		[isFocused]
	)

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
