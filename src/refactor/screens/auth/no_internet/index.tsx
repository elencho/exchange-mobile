import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'
import { Trans } from 'react-i18next'
import { useNetInfoInstance, fetch } from '@react-native-community/netinfo'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setBiometricScreenOpened } from '@store/redux/common/slice'
import { RootState } from '@app/refactor/redux/rootReducer'
import KV from '@store/kv/regular'
import { biometricDiffElapsed } from '@app/refactor/utils/authUtils'
import { isEnrolledAsync } from 'expo-local-authentication'
import { MaterialIndicator } from 'react-native-indicators'

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
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		dispatch(setBiometricScreenOpened(true))
		return () => {
			dispatch(setBiometricScreenOpened(false))
		}
	}, [])

	const handlePress = async () => {
		fetch().then(async (state) => {
			setLoading(true)
			const bioVisible =
				KV.get('webViewVisible') !== true &&
				biometricDiffElapsed() &&
				(await isEnrolledAsync()) &&
				isBiometricEnabled
			if (state.isConnected) {
				if (bioVisible) {
					navigation.replace('Resume', { from: 'NoInternet' })
				} else {
					navigation.goBack()
				}
			}
			setLoading(false)
		})
	}

	const TryAgain = console.log('loading', loading)
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
				{/* {loading ? (
					<MaterialIndicator
						color="#6582FD"
						animationDuration={3000}
						size={16}
						style={{ flex: 0 }}
					/>
				) : (
					<AppText variant="title" style={styles.text} />
				)} */}
				<AppText style={styles.textWrapper}>
					{/* It seems you are offline right now! Refresh, or */}
					<View style={styles.row}>
						<AppText variant="title" style={styles.text}>
							It seems you are offline right now! Refresh, or
						</AppText>

						{loading ? (
							<MaterialIndicator
								color="#6582FD"
								animationDuration={3000}
								size={16}
								style={{ flex: 0 }}
							/>
						) : (
							<AppText style={styles.textSec} onPress={handlePress}>
								Try again
							</AppText>
						)}
					</View>
					{/* <Trans
						i18nKey="noInternet"
						defaults="<t>It seems you are offline right now! Refresh, or</t>  <b>Try again</b>"
						components={{
							b: loading ? (
								<MaterialIndicator
									color="#6582FD"
									animationDuration={3000}
									size={16}
									style={{ flex: 0 }}
								/>
							) : (
								<Text style={styles.textSec} onPress={handlePress} />
							),
							t: ,
						}}
					/> */}
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
			flexWrap: 'nowrap',
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
		row: {
			flexDirection: 'row',
		},
	})
