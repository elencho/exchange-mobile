import React, { useEffect, useState } from 'react'
import {
	TouchableOpacity,
	Modal,
	StyleSheet,
	View,
	StatusBar,
	Platform,
} from 'react-native'
import WebView from 'react-native-webview'
import { useDispatch, useSelector } from 'react-redux'
import Close from '../assets/images/Close.svg'
import { toggleAddCardModal, toggleBuySellModal } from '../redux/modals/actions'
import {
	cardsSagaAction,
	setCard,
	setDepositProvider,
	setFee,
} from '../redux/trade/actions'
import KV from '@store/kv/regular'
import { useModal } from '@components/modal/global_modal'

export default function AppWebView(props) {
	const { verifyCards, trade, deposit, cardsAdd, onClose } = props

	const { isModalVisible: isGlobalModalVisible } = useModal()

	const dispatch = useDispatch()
	const webViewObj = useSelector((state) => state.modals.webViewObj)

	const closeWebView = async () => {
		KV.del('webViewVisible')
		dispatch({ type: 'RESET_APP_WEBVIEW_OBJ' })
		if (verifyCards) {
			dispatch(cardsSagaAction())
			dispatch({
				type: 'SET_CARD_VERIFICATION_STATUS',
				cardBeingVerified: false,
			})
		}

		if (cardsAdd) {
			dispatch(toggleAddCardModal(false))
			dispatch(cardsSagaAction())
		}

		if (trade) {
			dispatch(toggleBuySellModal(false))
			dispatch({ type: 'REFRESH_WALLET_AND_TRADES' })
		}

		if (deposit) {
			dispatch(setDepositProvider(null))
			dispatch(setCard(null))
			dispatch(setFee(null))
			dispatch({ type: 'SET_DEPOSIT_AMOUNT', depositAmount: null })
			dispatch({ type: 'BALANCE_SAGA' })
		}
		onClose && onClose()
		setDelayedOpen(false)
	}

	const handleOnShow = async () => {
		KV.set('webViewVisible', true)
	}

	const handleOnRequestClose = async () => {
		KV.del('webViewVisible')
	}

	// Necessary for Push notification banner to show in proper order
	const [delayedOpen, setDelayedOpen] = useState(false)
	useEffect(() => {
		!!webViewObj &&
			setTimeout(() => {
				setDelayedOpen(true)
			}, 100)
	}, [!!webViewObj])

	const isVisible = cardsAdd
		? !!webViewObj && delayedOpen
		: !!webViewObj && delayedOpen && !isGlobalModalVisible

	return (
		<Modal
			statusBarTranslucent={true}
			// presentationStyle="fade"
			visible={isVisible}
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
					{...props}
				/>
			</TouchableOpacity>
		</Modal>
	)
}

const styles = StyleSheet.create({
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
