import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from 'jwt-decode'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { AppState } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { useDispatch } from 'react-redux'
import BottomTabs from '../components/BottomTabs'
import colors from '../constants/colors'
import { setTabRouteName } from '../redux/transactions/actions'
import Exchange from '../screens/Exchange'
import InstantTrade from '../screens/InstantTrade'
import TransactionHistory from '../screens/TransactionHistory'
import Wallet from '../screens/Wallet'

const Tab = createBottomTabNavigator()

function MainScreen({ navigation }) {
	const dispatch = useDispatch()
	const isFocused = useIsFocused()

	const [subscription, setSubscription] = useState()

	useEffect(() => {
		onBeforeShow()

		return () => {
			onClose()
		}
	}, [])

	const handleAppStateChange = useCallback(async (newState) => {
		const lastTimeOpen = await AsyncStorage.getItem('isOpenDate')
		const timeDifference = lastTimeOpen
			? Date.now() - JSON.parse(lastTimeOpen)
			: false
		const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
		const webViewVisible = await AsyncStorage.getItem('webViewVisible')
		const authVisible = await AsyncStorage.getItem('authVisible')

		if (newState !== 'active' && !authVisible) {
			const date = JSON.stringify(Date.now())
			await AsyncStorage.setItem('isOpenDate', date)
			await AsyncStorage.removeItem('isLoggedIn')
		}

		const bioVisible =
			!webViewVisible &&
			!isLoggedIn &&
			newState === 'active' &&
			timeDifference >= 30000

		if (bioVisible) {
			SecureStore.getItemAsync('accessToken')
				.then((t) => {
					if (t) {
						const email = jwt_decode(t)?.email
						dispatch({ type: 'OTP_SAGA', token: t })
						getBiometricEnabled(email)
					}
				})
				.catch((err) => console.log(err))
		}
	}, [])

	const onBeforeShow = async () => {
		await changeNavigationBarColor(colors.SECONDARY_BACKGROUND, true)
		setSubscription(AppState.addEventListener('change', handleAppStateChange))
	}

	const onClose = async () => {
		await changeNavigationBarColor(colors.PRIMARY_BACKGROUND, true)

		subscription?.remove()
	}

	const getBiometricEnabled = useCallback(
		async (user) => {
			const enabled = await AsyncStorage.getItem('BiometricEnabled')
			if (enabled) {
				let parsedUsers = await JSON.parse(enabled)
				const userIndex = await parsedUsers?.find(
					(u) => u?.user === user && u?.enabled === true
				)
				if (userIndex && isFocused) {
					navigation.navigate({
						key: 'Resume-uniqueKey',
						name: 'Resume',
						params: {
							fromSplash: false,
							version: false,
							isWorkingVersion: false,
						},
					})
				} else {
					return
				}
			}
		},
		[isFocused]
	)

	const setTabRoute = (e) => {
		dispatch(setTabRouteName(e.route.name))
	}

	return (
		<Tab.Navigator
			screenListeners={setTabRoute}
			tabBarPosition="bottom"
			screenOptions={{
				headerShown: false,
				unmountOnBlur: true,
				animationEnabled: true,
				lazy: true,
				freezeOnBlur: true,
				swipeEnabled: false,
			}}
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
export default memo(MainScreen)
