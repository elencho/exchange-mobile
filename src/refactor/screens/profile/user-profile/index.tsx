import React, { useMemo } from 'react'
import {
	FlatList,
	StyleSheet,
	Text,
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

export default function UserProfile({ route }) {
	const { theme, styles } = useTheme(_styles)
	const {
		logout,
		onRefresh,
		back,
		clear,
		onScroll,
		showRefreshControl,
		Personal_Security,
		userInfo,
		userProfileLoading,
		bioAvailable,
	} = useProfile(route)

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
				<AppButton
					onPress={back}
					variant="text"
					text="Back to Home"
					style={styles.back}
				/>

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