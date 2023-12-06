import React, { useEffect } from 'react'
import {
	FlatList,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native'
import { Theme, useTheme } from '@theme/index'
import Background from '@components/background'
import { AppButton } from '@components/button'
import { Headline } from '@components/headline'
import CustomRefreshContol from '@components/refresh-control'
import AppText from '@components/text'
import Logout from '@app/assets/images/User_profile/Logout.svg'
import PersonalSecuritySwitcher from './components/modals/user-profile/personal-security-switcher'
import { Personal } from './components/personal'
import Security from './components/security'
import { useProfile } from './use-profile'
import { NavigationProp } from '@react-navigation/native'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import launchSumsubSdk from '@app/utils/sumsubMobileSdk'
import { useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import BackSvg from '@app/assets/images/Back.svg'
import BackButton from '@components/back_button'

const UserProfile = ({ route }: ScreenProp<'UserProfile'>) => {
	const { theme, styles } = useTheme(_styles)
	const {
		logout,
		onRefresh,
		back,
		onScroll,
		showRefreshControl,
		personalSecurity,
		userProfileLoading,
		bioAvailable,
		setPersonalSecurity,
	} = useProfile()

	const { userInfo } = useSelector((state: RootState) => state.profile)

	useEffect(() => {
		if (
			route.params?.justRegistered === true &&
			userInfo?.userType === 'PHYSICAL'
		) {
			launchSumsubSdk(userInfo.email)
		}
	}, [])

	const renderItem = () => (
		<>
			{personalSecurity === 'Personal' && (
				<Personal loading={userProfileLoading} />
			)}
			{personalSecurity === 'Security' && (
				<Security loading={userProfileLoading} bioAvailable={bioAvailable} />
			)}
		</>
	)

	return (
		<Background>
			<View style={styles.topRow}>
				<BackButton onPress={back} />

				<TouchableOpacity onPress={logout}>
					<Logout />
				</TouchableOpacity>
			</View>

			<Headline title="My Profile" />
			<AppText style={styles.secondary}>{userInfo?.email}</AppText>

			<PersonalSecuritySwitcher
				value={personalSecurity}
				switcher={setPersonalSecurity}
			/>
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
					) : undefined
				}
			/>
		</Background>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		secondary: {
			color: theme.color.textSecondary,
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

export default UserProfile
