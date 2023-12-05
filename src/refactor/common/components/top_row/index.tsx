import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import colors from '@app/constants/colors'
import AppText from '@components/text'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootState } from '@app/refactor/redux/rootReducer'
import { Screens } from '@app/refactor/setup/nav/nav'

interface Props {
	clear?: () => void
	headlineLogo?: React.ReactNode
}

function TopRow({ clear, headlineLogo }: Props) {
	const navigation =
		useNavigation<NativeStackNavigationProp<Screens, 'UserProfile'>>()
	const route = useRoute()

	const userInfo = useSelector((state: RootState) => state?.profile?.userInfo)
	const firstName = userInfo?.firstName
	const lastName = userInfo?.lastName

	const initials = () => {
		if (firstName && lastName) {
			return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
		} else {
			return ''
		}
	}

	const navigate = () => {
		navigation.navigate('UserProfile', { sourceScreenName: route.name })
		clear && clear()
	}

	const getDisplayText = (routeName: string) => {
		switch (routeName) {
			case 'Transactions':
				return 'Transaction History'
			case 'Wallet':
				return 'My Wallet'
			case 'Trade':
				return 'Instant Trade'
			case 'Exchange':
				return 'Exchange'
			default:
				return ''
		}
	}

	const title = getDisplayText(route.name)

	return (
		<View style={styles.topRow}>
			<View style={styles.flexRow}>
				<AppText variant="headline" style={styles.headline}>
					{title}
				</AppText>
				{headlineLogo ? headlineLogo : null}
			</View>

			<Pressable style={styles.profile} onPress={navigate}>
				<AppText medium style={styles.text}>
					{initials()}
				</AppText>
				<View style={styles.dot} />
			</Pressable>
		</View>
	)
}

export default TopRow

const styles = StyleSheet.create({
	dot: {
		position: 'absolute',
		right: 0,
		top: 0,
		width: 13,
		height: 13,
		borderWidth: 4,
		borderRadius: 2,
		borderColor: colors.PRIMARY_BACKGROUND,
		backgroundColor: '#21E0A5',
		marginTop: -2,
		marginRight: -2,
	},
	logo: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
	profile: {
		backgroundColor: '#323753',
		borderRadius: 20,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	topRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		zIndex: 99,
		paddingTop: 20,
		paddingBottom: 28,
	},
	text: {
		color: colors.PRIMARY_TEXT,
		fontSize: 15,
		lineHeight: 19,
	},
	headline: {
		color: colors.PRIMARY_TEXT,
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
})
