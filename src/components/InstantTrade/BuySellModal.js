import AsyncStorage from '@react-native-async-storage/async-storage'
import { t } from 'i18next'
import React, { useEffect, useState, memo } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'
import { toggleBuySellModal } from '../../redux/modals/actions'
import {
	fetchFee,
	fetchTrades,
	saveTrades,
	setCard,
	setCurrentTrade,
	setDepositProvider,
	setFee,
	setTradeOffset,
	submitTrade,
	switchBalanceCard,
} from '../../redux/trade/actions'
import { errorHappenedHere, validateAmount } from '../../utils/appUtils'
import { validateScale } from '../../utils/formUtils'
import AppButton from '../AppButton'
import AppInput from '../AppInput'
import AppModal from '../AppModal'
import AppText from '../AppText'
import AppWebView from '../AppWebView'
import GeneralError from '../GeneralError'
import WithKeyboard from '../WithKeyboard'
import BalanceCardSwitcher from './BalanceCardSwitcher'
import BankFeesModal from './BankFeesModal'
import CardSection from './CardSection'
import ChooseBankModal from './ChooseBankModal'
import ChooseCardModal from './ChooseCardModal'
import CryptoModal from './CryptoModal'
import CurrencyDropdowns from './CurrencyDropdowns'
import FiatModal from './FiatModal'

const BuySellModal = () => {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		modals: { buySellModalVisible, webViewObj },
		trade: {
			Balance_Card,
			tradeType,
			crypto,
			fiat,
			pairObject,
			balance,
			currentTrade,
			depositProvider,
			card,
			isTradesButtonLoading,
		},
	} = state

	const [error, setError] = useState(false)

	//TODO: refactor
	const [maxLength, setMaxLength] = useState(13)
	const [focusedInput, setFocusedInput] = useState(null)
	useEffect(() => {
		error && setError(false)
	}, [
		currentTrade,
		depositProvider,
		card,
		Balance_Card,
		fiat,
		crypto,
		buySellModalVisible,
	])

	useEffect(() => {
		handleChangeText(price, 'crypto')
		dispatch(saveTrades([]))
		dispatch(fetchTrades())
	}, [pairObject])

	useEffect(() => {
		dispatch(setCurrentTrade({ price: '', size: '' }))
	}, [fiat, crypto])

	useEffect(() => {
		if (card) handleChangeText(price, 'crypto')
	}, [card])

	const baseScale = pairObject?.pair?.baseScale
	const quoteScale = pairObject?.pair?.quoteScale
	const size = currentTrade?.size
	const price = currentTrade?.price
	const balances = balance?.balances

	const inputValidation = (scale) => {
		if (scale == 0) {
			return /^[0-9]{1,13}$/
		} else {
			return new RegExp(`^[0-9]{1,13}(\.|\\.[0-9]{1,${scale}})?$`)
		}
	}

	const quoteValidation = inputValidation(pairObject?.pair?.quoteScale)
	const baseValidation = inputValidation(pairObject?.pair?.baseScale)

	const hide = () => {
		dispatch(toggleBuySellModal(false))
		dispatch(setCurrentTrade({ price: '', size: '' }))
		dispatch(setFee(null))
	}

	const onDismiss = () => {
		dispatch(setDepositProvider(null))
		dispatch(setCard(null))
		dispatch(switchBalanceCard('balance'))
	}

	const handleSubmit = () => {
		const balanceCondition = !validateAmount(price) || !validateAmount(size)
		const cardCondition = balanceCondition || !depositProvider || !card

		if (
			(Balance_Card === 'balance' && balanceCondition) ||
			(Balance_Card === 'card' && cardCondition)
		) {
			setError(true)
		} else dispatch(submitTrade())
	}

	const setTrade = (price, size) => {
		dispatch(setCurrentTrade({ price, size }))
		card && dispatch(fetchFee())
	}

	//TODO: refactor
	const handleChangeText = (text, type) => {
		const replacedAmount = text ? text.replace(',', '.') : 0
		const rate =
			tradeType === 'Buy' ? pairObject.buyPrice : pairObject.sellPrice

		if (text === '') {
			return setTrade('', '')
		}

		const parts = replacedAmount?.split('.')
		const startsWithZeroNoDecimal =
			replacedAmount[1] &&
			replacedAmount[0] === '0' &&
			replacedAmount[1] !== '.'
		if (type === 'crypto' && validateScale(replacedAmount, quoteScale)) {
			if (text && !quoteValidation?.test(text) && focusedInput === 'crypto') {
				return
			}

			if (parts.length === 2) {
				let cryptoAmount = (replacedAmount / rate).toFixed(baseScale)
				// getMaxLength(replacedAmount, quoteScale, setMaxLengthQuote);
				setTrade(
					replacedAmount ? parts[0].substr(0, 14) + '.' + parts[1] : 0,
					cryptoAmount
				)
			} else if (startsWithZeroNoDecimal) {
				setMaxLength(2)
			} else {
				let cryptoAmount = (parts[0].substr(0, 13) / rate).toFixed(baseScale)
				// setMaxLengthQuote(14);
				//getMaxLength(replacedAmount, baseScale, setMaxLengthBase);
				setTrade(replacedAmount ? parts[0].substr(0, 13) : 0, cryptoAmount)
			}
		}
		if (type === 'fiat' && validateScale(replacedAmount, baseScale)) {
			let fiatAmount = (replacedAmount * rate).toFixed(quoteScale)

			if (text && !baseValidation?.test(text) && focusedInput === 'fiat') {
				return
			}
			if (parts.length === 2 && baseScale == 0) {
				setTrade(fiatAmount, parts[0].substr(0, 14))
			} else if (parts.length === 2) {
				setTrade(
					fiatAmount,
					replacedAmount ? parts[0].substr(0, 14) + '.' + parts[1] : 0
				)
			} else if (startsWithZeroNoDecimal) {
				setMaxLength(2)
			} else {
				let fiatAmount = (parts[0].substr(0, 13) * rate).toFixed(quoteScale)
				// setMaxLengthBase(14);
				// getMaxLength(replacedAmount, quoteScale, setMaxLengthQuote);
				setTrade(fiatAmount, replacedAmount ? parts[0].substr(0, 13) : 0)
			}
		}
	}
	const myBalance = () => {
		const currency = tradeType === 'Buy' ? fiat : crypto
		const fix = currency === fiat ? quoteScale : baseScale

		let available
		balances?.forEach((b) => {
			if (b.currencyCode === currency) available = b.available
		})
		return Number(available).toFixed(fix)
	}

	const hasEcommerce = () => {
		let hasEcommerce
		balances?.forEach((b) => {
			if (b.currencyCode === fiat) hasEcommerce = b.depositMethods.ECOMMERCE
		})
		return hasEcommerce
	}

	const onNavigationStateChange = async (state) => {
		const urlArray = state.url.split('=')
		const ending = urlArray[urlArray.length - 1]
		if (ending === 'false' || ending === 'true') {
			dispatch({ type: 'RESET_APP_WEBVIEW_OBJ' })
			await AsyncStorage.removeItem('webViewVisible')
			dispatch({ type: 'BALANCE_SAGA' })
			dispatch(saveTrades([]))
			dispatch(setTradeOffset(0))
			dispatch(fetchTrades())
			dispatch(toggleBuySellModal(false))
		}
	}

	const children = (
		<WithKeyboard padding flexGrow modal>
			<View style={styles.flex}>
				<AppText subtext body style={styles.balance}>
					{t('My Balance:')} {myBalance()} {tradeType === 'Buy' ? fiat : crypto}
				</AppText>

				{tradeType === 'Buy' && hasEcommerce() && <BalanceCardSwitcher />}

				<GeneralError
					style={styles.error}
					show={errorHappenedHere('BuySellModal')}
				/>

				<TouchableOpacity
					activeOpacity={0.99}
					style={{ marginBottom: 30, flex: 1 }}>
					<CurrencyDropdowns style={styles.dropdowns} />

					<AppInput
						onChangeText={(t) => handleChangeText(t, 'crypto')}
						keyboardType="decimal-pad"
						value={price ? price.trim() : ''}
						onFocus={() => setFocusedInput('fiat')}
						// maxLength={maxLength}
						right={
							<AppText body style={styles.code}>
								{fiat}
							</AppText>
						}
						style={{ marginTop: 20 }}
						error={error && !validateAmount(price)}
					/>
					<AppInput
						onChangeText={(t) => handleChangeText(t, 'fiat')}
						keyboardType="decimal-pad"
						// maxLength={maxLength}
						onFocus={() => setFocusedInput('crypto')}
						value={size ? size.trim() : ''}
						right={
							<AppText body style={styles.code}>
								{crypto}
							</AppText>
						}
						style={{ marginTop: 20 }}
						error={error && !validateAmount(size)}
					/>

					{Balance_Card === 'card' && tradeType === 'Buy' && (
						<CardSection error={error} />
					)}

					<CryptoModal />
					<FiatModal />
					<ChooseBankModal />
					<ChooseCardModal />
					<BankFeesModal />
				</TouchableOpacity>
				<AppButton
					onPress={handleSubmit}
					backgroundColor={tradeType === 'Buy' ? '#0CCBB5' : '#F83974'}
					text={tradeType}
					loading={isTradesButtonLoading}
					style={{ marginBottom: 20 }}
				/>
			</View>

			<AppWebView
				onNavigationStateChange={onNavigationStateChange}
				source={{ uri: webViewObj?.actionUrl }}
				trade
			/>
		</WithKeyboard>
	)
	return (
		<AppModal
			visible={buySellModalVisible}
			hide={hide}
			fullScreen
			title={t(tradeType) + ' ' + crypto}
			children={children}
			onModalHide={onDismiss}
		/>
	)
}
export default memo(BuySellModal)

const styles = StyleSheet.create({
	balance: {
		color: colors.SECONDARY_TEXT,
	},
	code: {
		color: '#42475D',
	},
	container: {
		backgroundColor: colors.PRIMARY_BACKGROUND,
	},
	dropdowns: {
		// marginVertical: 20,
	},
	error: {
		marginTop: 16,
	},
	flex: {
		flex: 1,
	},
})
