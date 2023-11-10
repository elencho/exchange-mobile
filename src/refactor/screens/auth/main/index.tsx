import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
import jwt_decode from 'jwt-decode'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { AppState, NativeEventSubscription } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { useDispatch, useSelector } from 'react-redux'
import TransactionHistory from '@app/refactor/screens/transactions/transactions_history'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { useTheme } from '@theme/index'
import BottomTabs from '@app/components/BottomTabs'
import KVStore from '@store/kv'
import { BIOMETRIC_DIFF_MILLIS } from '@app/refactor/common/constants'
import { RootState } from '@app/refactor/redux/rootReducer'
import { TokenParams } from '@app/refactor/types/auth/splash'
import InstantTrade from '@app/screens/InstantTrade'
import Wallet from '@app/screens/Wallet'
import Exchange from '@app/screens/Exchange'
import { setTabRouteName } from '@app/redux/transactions/actions'

const Tab = createBottomTabNavigator()

const Main = ({ navigation, route }: ScreenProp<'Main'>) => {
	const dispatch = useDispatch()
	const { theme } = useTheme()
	const isFocused = useIsFocused()

	const [subscription, setSubscription] = useState<NativeEventSubscription>()
	const { accessToken } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		onBeforeShow()
		return () => {
			onClose()
		}
	}, [])

	const onBeforeShow = async () => {
		changeNavigationBarColor(theme.color.backgroundSecondary, true)
		setSubscription(AppState.addEventListener('change', handleAppStateChange))
	}

	const onClose = async () => {
		changeNavigationBarColor(theme.color.backgroundPrimary, true)
		subscription?.remove()
	}

	const handleAppStateChange = useCallback(async (newState: string) => {
		const isLoggedIn = KVStore.get('isLoggedIn')
		const webViewVisible = KVStore.get('webViewVisible')
		const authVisible = KVStore.get('authVisible')

		const lateTimeOpenMillis = KVStore.get('lastOpenDateMillis')
		const biometricDiffElapsed = lateTimeOpenMillis
			? Date.now() - lateTimeOpenMillis >= BIOMETRIC_DIFF_MILLIS
			: false

		if (newState !== 'active' && !authVisible) {
			KVStore.set('lastOpenDateMillis', Date.now())
			KVStore.del('isLoggedIn')
		}

		const bioVisible =
			!webViewVisible &&
			!isLoggedIn &&
			newState === 'active' &&
			biometricDiffElapsed

		if (bioVisible && accessToken) {
			const email = jwt_decode<TokenParams>(accessToken)?.email
			// TODO? dispatch({ type: 'OTP_SAGA', token: t })
			getBiometricEnabled(email)
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
					//TODO: remove after wallet refactor
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
