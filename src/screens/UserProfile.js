import { useFocusEffect } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Logout from '../assets/images/User_profile/Logout'
import AppText from '../components/AppText'
import Background from '../components/Background'
import CustomRefreshContol from '../components/CustomRefreshContol'
import PurpleText from '../components/PurpleText'
import Headline from '../components/TransactionHistory/Headline'
import Personal from '../components/UserProfile/Personal'
import PersonalSecuritySwitcher from '../components/UserProfile/PersonalSecuritySwitcher'
import Security from '../components/UserProfile/Security'
import colors from '../constants/colors'
import { fetchUserInfo, switchPersonalSecurity } from '../redux/profile/actions'
import { clearFilters } from '../redux/transactions/actions'
import { checkIsCompatable } from '../utils/biometricsAuth'
import { logoutUtil } from '../utils/userProfileUtils'

function UserProfile({ navigation, route }) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const [showRefreshControl, setShowRefreshControl] = useState(false)
	const [bioAvailable, setBioAvailable] = useState(false)

	const {
		profile: { Personal_Security, userInfo, userProfileLoading },
	} = state

	useEffect(() => {
		dispatch(fetchUserInfo(route.params?.fromRegistration))
		checkCompitable()
		const timer = setTimeout(() => {
			setShowRefreshControl(true)
		}, 1000)
		return () => clearTimeout(timer)
	}, [])

	useFocusEffect(
		useCallback(() => {
			return () => dispatch(switchPersonalSecurity('Personal'))
		}, [])
	)

	const checkCompitable = async () => {
		const compitable = await checkIsCompatable()
		setBioAvailable(compitable)
	}

	const logout = async () => {
		const refresh_token = await SecureStore.getItemAsync('refreshToken')
		const status = await logoutUtil(refresh_token)
		if (status === 204) {
			await SecureStore.deleteItemAsync('accessToken')
			await SecureStore.deleteItemAsync('refreshToken')
			navigation.navigate('Welcome')

			dispatch({ type: 'LOGOUT' })
		}
	}

	const onRefresh = () => {
		checkCompitable()
		dispatch(fetchUserInfo())
	}
	const back = () => {
		clear()
		navigation.navigate('Main', { screen: route.params?.sourceScreenName })
	}

	const clear = () => {
		dispatch(clearFilters())
		dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' })
	}

	const onScroll = (event) => {
		const { y } = event.nativeEvent.contentOffset
		if (y > 0) {
			setShowRefreshControl(true)
		}
	}
	const renderItem = () => (
		<>
			{Personal_Security === 'Personal' && (
				<Personal loading={userProfileLoading} />
			)}
			{Personal_Security === 'Security' && (
				<Security loading={userProfileLoading} bioAvailable={bioAvailable} />
			)}
		</>
	)

	return (
		<Background>
			<View style={styles.topRow}>
				<TouchableOpacity onPress={back} style={styles.back}>
					<PurpleText text="Back to Home" />
				</TouchableOpacity>

				<TouchableOpacity onPress={logout}>
					<Logout />
				</TouchableOpacity>
			</View>

			<Headline title="My Profile" />
			<AppText style={styles.secondary}>{userInfo?.email}</AppText>

			<PersonalSecuritySwitcher />
			<FlatList
				data={[0]}
				renderItem={renderItem}
				onScroll={onScroll}
				showsVerticalScrollIndicator={false}
				refreshControl={
					showRefreshControl ? (
						<CustomRefreshContol
							refreshing={userProfileLoading}
							onRefresh={onRefresh}
						/>
					) : null
				}
			/>
		</Background>
	)
}

export default memo(UserProfile)

const styles = StyleSheet.create({
	secondary: {
		color: colors.SECONDARY_TEXT,
		marginBottom: 22,
		marginTop: 6,
	},
	topRow: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 20,
		paddingBottom: 28,
	},
})
