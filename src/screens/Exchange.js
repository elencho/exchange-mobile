import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Linking, Pressable } from 'react-native'
import Rocket from '../assets/images/Rocket'
import AppText from '../components/AppText'
import Background from '../components/Background'
import TopRow from '../refactor/common/components/top_row'
import colors from '../constants/colors'
import { exchangeUtil } from '../utils/userProfileUtils'
import useCopyToClipboard from '@app/utils/copyToClipboard'
import CopyLogo from '@assets/images/Copy.svg'
import messaging from '@react-native-firebase/messaging'

const Exchange = () => {
	const handlePress = async () => {
		const refresh_token = await SecureStore.getItemAsync('refreshToken')
		const data = await exchangeUtil(refresh_token)
		Linking.openURL(data?.redirectUri)
	}
	const [fcmToken, setFcmToken] = useState('')

	const { copyToClipboard } = useCopyToClipboard()

	useEffect(() => {
		checkToken()
	}, [])

	const checkToken = async () => {
		const token = await messaging().getToken()
		if (token) {
			setFcmToken(token)
		}
	}

	return (
		<Background>
			<TopRow />
			<CopyLogo
				style={{ marginBottom: 10 }}
				onPress={() => copyToClipboard(fcmToken)}
			/>
			<View style={styles.wrapper}>
				<Rocket style={styles.rocket} />
				<AppText header style={styles.mainText}>
					Coming Soon...
				</AppText>
				<AppText body style={styles.secText}>
					Exchange page coming soon
				</AppText>
				<Pressable style={styles.btn} onPress={handlePress}>
					<AppText medium style={styles.web}>
						Exchange on WEB
					</AppText>
				</Pressable>
			</View>
		</Background>
	)
}

export default Exchange

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: colors.PRIMARY_BACKGROUND,
		paddingHorizontal: 16,
	},
	mainText: {
		color: colors.PRIMARY_TEXT,
		marginTop: 12,
	},
	secText: {
		color: '#838BB2',
		marginTop: 10,
	},

	btn: {
		marginTop: 40,
	},
	web: {
		color: colors.SECONDARY_PURPLE,
	},
	headRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	wrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
})
