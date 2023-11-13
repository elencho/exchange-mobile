import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
import jwt_decode from 'jwt-decode'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { AppState, AppStateStatus, NativeEventSubscription } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { useDispatch, useSelector } from 'react-redux'
import TransactionHistory from '@app/refactor/screens/transactions/TransactionHistory'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { useTheme } from '@theme/index'
import BottomTabs from '@app/components/BottomTabs'
import KVStore from '@store/kv'
import { RootState } from '@app/refactor/redux/rootReducer'
import { TokenParams } from '@app/refactor/types/auth/splash'
import InstantTrade from '@app/screens/InstantTrade'
import Wallet from '@app/screens/Wallet'
import Exchange from '@app/screens/Exchange'
import { setTabRouteName } from '@app/redux/transactions/actions'
import { biometricDiffElapsed } from '@app/refactor/utils/authUtils'

const Tab = createBottomTabNavigator()

const Main = ({ navigation, route }: ScreenProp<'Main'>) => {
	const dispatch = useDispatch()
	const { theme } = useTheme()
	const isFocused = useIsFocused()

	const { accessToken } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		changeNavigationBarColor(theme.color.backgroundSecondary, true)
		KVStore.set('lastOpenDateMillis', Date.now())
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
		const webViewVisible = KVStore.get('webViewVisible')

		const bioVisible =
			accessToken &&
			!webViewVisible &&
			newState === 'active' &&
			biometricDiffElapsed()

		if (bioVisible && accessToken) {
			const email = jwt_decode<TokenParams>(accessToken)?.email
			getBiometricEnabled(email)
		}

		if (newState === 'active') {
			KVStore.set('lastOpenDateMillis', Date.now())
		}
	}, [])

	const getBiometricEnabled = useCallback(
		async (email: string) => {
			const userEnabledBio = KVStore.get('bioEnabledEmails')?.includes(email)
			if (userEnabledBio && isFocused) {
				navigation.navigate({
					key: 'Resume-uniqueKey',
					name: 'Resume',
					params: {
						fromSplash: false,
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
