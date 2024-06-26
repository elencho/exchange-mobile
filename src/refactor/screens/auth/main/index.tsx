import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import jwt_decode from 'jwt-decode'
import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Alert, AppState, AppStateStatus } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { useDispatch, useSelector } from 'react-redux'
import TransactionHistory from '@app/refactor/screens/transactions/transactions_history'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { useTheme } from '@theme/index'
import { BottomTabs } from '@app/components/BottomTabs'
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
import { fetch } from '@react-native-community/netinfo'

import { CommonActions } from '@react-navigation/native'
import ConvertNow from '@app/refactor/screens/convert'
import { useModal } from '@components/modal/global_modal'
import { setBiometricSuccess } from '@store/redux/common/slice'

const Tab = createBottomTabNavigator()

const Main = ({ navigation, route }: ScreenProp<'Main'>) => {
	const dispatch = useDispatch()
	const { theme } = useTheme()
	const {
		setIsBiometricScreenOpenedForModal,
		setModalVisible,
		isModalVisible,
		modalContent,
		showModal,
		isBiometricScreenOpenedForModal,
	} = useModal()
	const fromResume = route.params?.fromResume === true
	const initialRoute = route.params?.initialRoute
	const transactionInitialTab = route.params?.transactionsInitialTab

	const prevAppState = useRef<AppStateStatus>()
	const { accessToken } = useSelector((state: RootState) => state.auth)
	const { biometricSuccess, isBiometricScreenOpened, webViewVisible } =
		useSelector((state: RootState) => state.common)

	useEffect(() => {
		let timeout: NodeJS.Timeout
		if (
			Object.keys(modalContent ?? {}).length > 0 &&
			(biometricSuccess == null || biometricSuccess === true)
		) {
			timeout = setTimeout(() => {
				showModal(modalContent)
			}, 1000)
		}

		return () => {
			clearTimeout(timeout)
		}
	}, [modalContent, biometricSuccess])

	useEffect(() => {
		changeNavigationBarColor(theme.color.backgroundSecondary, true)
		const stateChangeListener = AppState.addEventListener(
			'change',
			handleAppStateChange
		)
		dispatch(fetchUserInfoThunk())

		return () => {
			// unsubscribe()
			changeNavigationBarColor(theme.color.backgroundPrimary, true)
			stateChangeListener.remove()
		}
	}, [webViewVisible])

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

	const handleAppStateChange = useCallback(
		async (newState: AppStateStatus) => {
			const appClosing = isAppClosing(newState)
			dispatch(setBiometricSuccess(false))
			const bioVisible =
				newState === 'active' &&
				!fromResume &&
				accessToken !== undefined &&
				webViewVisible !== true &&
				biometricDiffElapsed() &&
				(await isEnrolledAsync())
			if (bioVisible) {
				const email = jwt_decode<TokenParams>(accessToken)?.email
				getBiometricEnabled(email)
			} else if (newState === 'active' && !bioVisible) {
				setIsBiometricScreenOpenedForModal(false)
				dispatch(setBiometricSuccess(null))
				setModalVisible(true)
			}

			if (appClosing && !isModalVisible) {
				setIsBiometricScreenOpenedForModal(true)
			}

			if (appClosing && !resumeIsShown()) {
				KV.set('lastCloseDateMillis', Date.now())
			}
			prevAppState.current = newState
		},
		[webViewVisible]
	)

	const getBiometricEnabled = async (email: string) => {
		const bioEnabledEmails = await SecureKV.get('bioEnabledEmails')
		const userEnabledBio = bioEnabledEmails?.includes(email)
		if (!userEnabledBio) {
			dispatch(setBiometricSuccess(null))
		}

		fetch().then((state) => {
			if (state.isConnected && userEnabledBio) {
				navigation.navigate({
					key: 'Resume-uniqueKey',
					name: 'Resume',
					params: {
						from: 'Main',
					},
				})
			} else if (
				state.isConnected === false &&
				userEnabledBio &&
				!resumeIsShown()
			) {
				navigation.dispatch((state) => {
					const newRoutes = [
						...state.routes.slice(0, state.index + 1),
						{ name: 'NoInternet' },
						{
							key: 'Resume-uniqueKey',
							name: 'Resume',
							params: {
								from: 'Main',
							},
						},
					]

					return CommonActions.reset({
						...state,
						routes: newRoutes,
						index: newRoutes.length - 1,
					})
				})
			}
		})
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
			initialRouteName={initialRoute || 'ConvertNow'}
			tabBar={(props) => <BottomTabs {...props} />}>
			<Tab.Screen name="ConvertNow" component={ConvertNow} />
			<Tab.Screen name="Wallet" component={Wallet} />
			<Tab.Screen
				name="Transactions"
				component={TransactionHistory}
				initialParams={{ initialTab: transactionInitialTab }}
			/>
			<Tab.Screen name="Exchange" component={Exchange} />
		</Tab.Navigator>
	)
}
export default Main
