import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import FastImage from 'react-native-fast-image'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'
import { Trans } from 'react-i18next'
import { useNetInfoInstance } from '@react-native-community/netinfo'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setBiometricScreenOpened } from '@store/redux/common/slice'
import { RootState } from '@app/refactor/redux/rootReducer'
import KV from '@store/kv/regular'
import { biometricDiffElapsed } from '@app/refactor/utils/authUtils'
import { isEnrolledAsync } from 'expo-local-authentication'

const NoInternet = () => {
	const { styles } = useTheme(_styles)
	const navigation = useNavigation()
	const isBiometricEnabled = useSelector(
		(state: RootState) => state.common.isBiometricEnabled
	)
	const dispatch = useDispatch()
	const {
		refresh,
		netInfo: { isConnected },
	} = useNetInfoInstance()

	useEffect(() => {
		dispatch(setBiometricScreenOpened(true))
		return () => {
			dispatch(setBiometricScreenOpened(false))
		}
	}, [])

	const handlePress = async () => {
		const bioVisible =
			KV.get('webViewVisible') !== true &&
			biometricDiffElapsed() &&
			(await isEnrolledAsync()) &&
			isBiometricEnabled

		refresh()
		if (isConnected) {
			if (bioVisible) {
				navigation.replace('Resume', { from: 'NoInternet' })
			} else {
				navigation.goBack()
			}
		}
	}

	return (
		<View style={styles.background}>
			<FastImage
				style={{
					height: 54,
					width: 66,
				}}
				source={require('@assets/images/Wifi.png')}
			/>
			<View>
				<AppText style={styles.textWrapper}>
					{/* It seems you are offline right now! Refresh, or */}
					<Trans
						i18nKey="noInternet"
						defaults="<t>It seems you are offline right now! Refresh, or</t>  <b>Try again</b>"
						components={{
							b: <Text style={styles.textSec} onPress={handlePress} />,
							t: <AppText variant="title" style={styles.text} />,
						}}
					/>
				</AppText>
				<AppText></AppText>
			</View>
		</View>
	)
}

export default NoInternet

const _styles = (theme: Theme) =>
	StyleSheet.create({
		background: {
			backgroundColor: theme.color.backgroundPrimary,
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: 60,
		},
		text: {
			color: '#838BB2',
		},
		textSec: {
			fontSize: 16,
			lineHeight: 20,
			fontFamily: theme.font.regular,
			color: '#6582fd',
		},
		textWrapper: {
			textAlign: 'center',
			marginTop: 30,
		},
	})
