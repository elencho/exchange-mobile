import AsyncStorage from '@react-native-async-storage/async-storage'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Linking, Pressable, StyleSheet, View, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CheckEmpty from '../../../assets/images/Check_Empty.svg'
import CheckFull from '../../../assets/images/Check_Full.svg'
import CheckRed from '../../../assets/images/Check_Red.svg'
import { ICONS_URL_PNG } from '../../../constants/api'
import colors from '../../../constants/colors'
import { IS_ANDROID } from '../../../constants/system'
import {
	setStatusModalInfo,
	toggleAddCardModal,
	toggleBankFeesModal,
	toggleChooseBankModal,
} from '../../../redux/modals/actions'
import { cardsSagaAction } from '../../../redux/trade/actions'
import { addCard } from '../../../utils/walletUtils'
import AppButton from '../../AppButton'
import AppDropdown from '../../AppDropdown'
import AppInfoBlock from '../../AppInfoBlock'
import AppModal from '../../AppModal'
import AppText from '../../AppText'
import AppWebView from '../../AppWebView'
import BankFeesModal from '../../InstantTrade/BankFeesModal'
import ChooseBankModal from '../../InstantTrade/ChooseBankModal'
import PurpleText from '../../PurpleText'

export default function AddCardModal() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		modals: {
			addCardModalVisible,
			statusModalInfo,
			webViewObj,
			webViewVisible,
		},
		trade: { depositProvider, depositProviders },
		transactionsOld: { code },
	} = state

	const [saveCardAgreeTerms, setSaveCardAgreeTerms] = useState(false)
	const [statusObj, setStatusObj] = useState(null)
	const [error, setError] = useState(false)
	const [selectedProvider, setSelectedProvider] = useState(depositProvider)

	useEffect(() => {
		error && setError(false)
	}, [saveCardAgreeTerms, depositProvider])

	useEffect(() => {
		setSaveCardAgreeTerms(depositProvider !== 'BOG')
		setSelectedProvider(depositProvider)
	}, [depositProvider])

	console.log('saveCardAgreeTerms', saveCardAgreeTerms)

	const hide = () => {
		dispatch(toggleAddCardModal(false))
		setSelectedProvider(null)
		if (webViewVisible) {
			if (statusObj) dispatch(setStatusModalInfo(statusObj))
			setSaveCardAgreeTerms(false)
			setStatusObj(null)
		}
	}

	const image = () => {
		let result
		switch (true) {
			case !saveCardAgreeTerms && error:
				result = <CheckRed />
				break
			case saveCardAgreeTerms:
				result = <CheckFull />
				break
			default:
				result = <CheckEmpty />
				break
		}
		return result
	}

	const showBanks = () => dispatch(toggleChooseBankModal(true))
	const toggle = () => setSaveCardAgreeTerms(!saveCardAgreeTerms)
	const showFees = () => dispatch(toggleBankFeesModal(true))
	const multipleBanks = () => depositProviders?.length > 1

	const handleAddCard = async () => {
		if (!depositProvider || !saveCardAgreeTerms) {
			setError(true)
		} else {
			const params = {
				currency: code,
				redirectUri: 'cryptal.com',
				provider: depositProvider,
			}
			const webViewObj = await addCard(params)
			dispatch({ type: 'SET_APP_WEBVIEW_OBJ', webViewObj })
		}
	}

	const onNavigationStateChange = async (state) => {
		const urlArray = state.url.split('=')
		const ending = urlArray[urlArray.length - 1]
		if (ending === 'false' || ending === 'true') {
			dispatch({ type: 'RESET_APP_WEBVIEW_OBJ' })
			await AsyncStorage.removeItem('webViewVisible')
			setStatusObj({ success: ending, visible: true })
			dispatch(cardsSagaAction())
			hide()
		}
	}

	const handleHide = () => {
		if (webViewVisible) {
			if (statusObj) dispatch(setStatusModalInfo(statusObj))
			setSaveCardAgreeTerms(false)
			setStatusObj(null)
		}
	}

	const urlEncodedData = () => {
		const data = new URLSearchParams(webViewObj?.data)
		return data.toString()
	}

	const displayName = () => {
		let displayName = null

		depositProviders?.forEach((provider) => {
			if (depositProvider === provider.provider)
				displayName = provider.displayName
		})

		return displayName
	}

	const goToTerms = () =>
		Linking.openURL(
			'https://support.cryptal.com/hc/en-us/articles/4402770737682-Privacy-Policy'
		)

	const termsColor = !saveCardAgreeTerms && error ? '#F45E8C' : '#c0c5e0'

	useEffect(() => {
		if (statusObj && IS_ANDROID) dispatch(setStatusModalInfo(statusObj))
	}, [statusObj])

	const children = (
		<>
			<>
				<AppDropdown
					handlePress={showBanks}
					style={styles.dropdown}
					selectedText={displayName()}
					label="Payment Service Provider"
					withLabel
					notClearable
					error={!depositProvider && error}
					icon={
						depositProvider && (
							<Image
								source={{ uri: `${ICONS_URL_PNG}/${depositProvider}.png` }}
								style={styles.imageSmall}
							/>
						)
					}
				/>
			</>

			<AppInfoBlock content={['Add Card Info']} info />

			{depositProvider === 'BOG' && (
				<View style={styles.row}>
					<Pressable style={styles.image} onPress={toggle}>
						{image()}
					</Pressable>
					<AppText style={[styles.grey, { color: termsColor }]}>
						{t('Save Card & Agree')}{' '}
						<PurpleText text="Terms" onPress={goToTerms} />
					</AppText>
				</View>
			)}

			<AppButton text="Next" style={styles.button} onPress={handleAddCard} />

			<ChooseBankModal selectedProvider={selectedProvider} />
			<BankFeesModal />

			{webViewObj?.actionMethod === 'POST' && (
				<AppWebView
					cardsAdd
					onNavigationStateChange={onNavigationStateChange}
					source={{
						uri: webViewObj?.actionUrl,
						method: 'POST',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						body: urlEncodedData(),
					}}
				/>
			)}

			{webViewObj?.actionMethod === 'GET' && (
				<AppWebView
					cardsAdd
					onNavigationStateChange={onNavigationStateChange}
					source={{ uri: webViewObj?.actionUrl }}
				/>
			)}
		</>
	)

	return (
		<AppModal
			children={children}
			title="Add Card"
			fullScreen
			visible={addCardModalVisible}
			hide={hide}
			// onModalHide={handleHide}
		/>
	)
}

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		bottom: 55,
		left: 15,
		right: 15,
	},
	dropdown: {
		marginTop: 22,
	},
	grey: {
		color: '#B7BFDB',
		lineHeight: 18,
		textAlign: 'justify',
		marginLeft: 15,
	},
	image: {
		// width: 40,
		// height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	subText: {
		color: colors.SECONDARY_TEXT,
		marginTop: 10,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 30,
		marginTop: 22,
	},
	text: {
		color: colors.PRIMARY_TEXT,
		flex: 1,
	},
	imageSmall: {
		width: 24,
		height: 20,
		resizeMode: 'contain',
	},
})
