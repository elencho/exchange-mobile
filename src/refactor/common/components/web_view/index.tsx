import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import {
	TouchableOpacity,
	Modal,
	StyleSheet,
	View,
	StatusBar,
	Platform,
} from 'react-native'
import WebView, { WebViewNavigation } from 'react-native-webview'
import { useDispatch, useSelector } from 'react-redux'
import Close from '@assets/images/Close.svg'
import { RootState } from '@app/refactor/redux/rootReducer'
import { setWebViewVisible } from '@store/redux/common/slice'
import { Theme, useTheme } from '@theme/index'
import { WebViewSource } from 'react-native-webview/lib/WebViewTypes'
import { useModal } from '@components/modal/global_modal'

type Props = {
	source: WebViewSource
	onNavigationStateChange?: (event: WebViewNavigation) => void
	onClose?: () => void
}

export const AppWebView = ({
	source,
	onNavigationStateChange,
	onClose,
}: Props) => {
	const dispatch = useDispatch()
	const { isModalVisible: isGlobalModalVisible } = useModal()
	const { styles } = useTheme(_styles)

	const webViewVisible = useSelector(
		(state: RootState) => state.common.webViewVisible
	)

	const closeWebView = async () => {
		dispatch(setWebViewVisible(false))
		onClose?.()
	}

	const handleOnShow = async () => {
		dispatch(setWebViewVisible(true))
	}

	const handleOnRequestClose = async () => {
		dispatch(setWebViewVisible(false))
	}

	return (
		<Modal
			statusBarTranslucent={true}
			visible={webViewVisible && !isGlobalModalVisible}
			onShow={handleOnShow}
			onRequestClose={handleOnRequestClose}
			animationType="slide">
			<StatusBar
				backgroundColor={'transparent'}
				translucent
				barStyle="dark-content"
			/>
			<TouchableOpacity activeOpacity={0.99} style={styles.flex}>
				<View style={styles.header}>
					<TouchableOpacity style={styles.close} onPress={closeWebView}>
						<Close />
					</TouchableOpacity>
				</View>

				<WebView
					nestedScrollEnabled
					originWhitelist={['*']}
					allowsFullscreenVideo
					allowsInlineMediaPlayback
					allowFileAccess
					allowFileAccessFromFileURLs
					allowUniversalAccessFromFileURLs
					javaScriptEnabled
					domStorageEnabled
					startInLoadingState
					source={source}
					onNavigationStateChange={onNavigationStateChange}
				/>
			</TouchableOpacity>
		</Modal>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		close: {
			alignSelf: 'flex-end',
			marginRight: 25,
			marginTop: Platform.select({ ios: 20, android: 10 }),
			padding: 10,
			paddingLeft: 20,
			alignItems: 'flex-end',
			justifyContent: 'flex-end',
		},
		flex: { flex: 1 },
		header: {
			backgroundColor: 'white',
			height: 80,
			paddingTop: 30,
		},
	})

export default AppWebView
