import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'
import { Trans } from 'react-i18next'
import { useNetInfoInstance, fetch } from '@react-native-community/netinfo'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setBiometricScreenOpened, setInternetScreenOpened } from '@store/redux/common/slice'
import { RootState } from '@app/refactor/redux/rootReducer'
import KV from '@store/kv/regular'
import { biometricDiffElapsed } from '@app/refactor/utils/authUtils'
import { isEnrolledAsync } from 'expo-local-authentication'
import { MaterialIndicator } from 'react-native-indicators'
import { toggleWebViewVisible } from '@app/redux/modals/actions'

const NoInternet = () => {
	const { styles } = useTheme(_styles)
	const navigation = useNavigation()

	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)

	useFocusEffect(
		useCallback(() => {
			// FOR MODAL OPENING
			dispatch(setInternetScreenOpened(true))
			dispatch({ type: 'SET_APP_WEBVIEW_OBJ', webViewObj: null })
			return () => {
				dispatch(setInternetScreenOpened(false))
			}
		}, [])
	)

	const handlePress = async () => {
		setLoading(true)
		setTimeout(async () => {
			fetch().then(async (state) => {
				if (state.isConnected) {
					navigation.goBack()
				}
			})
			setLoading(false)
		}, 1000)
	}

	return (
		<View style={styles.background}>
			<FastImage
				style={{
					height: 54,
					width: 66,
					marginBottom: 30,
				}}
				source={require('@assets/images/Wifi.png')}
			/>
			<View>
				<AppText variant="title" style={styles.text}>
					It seems you are offline right now!
				</AppText>
				<View style={styles.row}>
					<AppText variant="title" style={[styles.text, { marginRight: 5 }]}>
						Refresh, or
					</AppText>

					{loading ? (
						<MaterialIndicator
							color="#6582FD"
							animationDuration={3000}
							size={16}
							style={{ flex: 0 }}
						/>
					) : (
						<Pressable hitSlop={40} onPress={handlePress}>
							<AppText style={styles.textSec}>Try again</AppText>
						</Pressable>
					)}
				</View>
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
		},
		text: {
			color: '#838BB2',
			flexWrap: 'nowrap',
			textAlign: 'center',
		},
		textSec: {
			fontSize: 16,
			lineHeight: 20,
			fontFamily: theme.font.regular,
			color: '#6582fd',

			textAlign: 'center',
		},
		textWrapper: {
			marginTop: 30,
		},
		row: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			marginHorizontal: 20,
			textAlign: 'center',
			justifyContent: 'center',
		},
	})
