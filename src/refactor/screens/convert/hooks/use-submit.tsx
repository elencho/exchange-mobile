import {
	fetchOffersApi,
	submitTrade,
} from '@app/refactor/screens/convert/api/convertNowApi'
import { formatScale } from '@app/refactor/screens/convert/util'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { setWebViewVisible } from '@store/redux/common/slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const ERROR_KEY_PRICE_CHANGE = 'gex.validate.instant_trade_price_change'

export const useSubmit = (props: ScreenProp<'ConfirmConvert'>) => {
	const { spentAmount, pair, tradeType, card } = props.route?.params

	const dispatch = useDispatch()

	const [changedPrice, setChangedPrice] = useState<string>()
	const [webViewState, setWebViewState] = useState<CardRedirectResponse>()
	const [generalError, setGeneralError] = useState<UiErrorData | null>(null)
	const [confirmModalStatus, setConfirmModalStatus] =
		useState<ConfirmModalStatus>()

	const onConfirmPressed = () => {
		const action = tradeType === 'Buy' ? 'BID' : 'ASK'
		const price = tradeType === 'Buy' ? pair.buyPrice : pair.sellPrice

		const params: SubmitTradeRequest = {
			pairCode: pair.code,
			amount: spentAmount,
			action,
			price: changedPrice || price,
			cardTransactionRequest: card && {
				currency: 'GEL',
				cardId: card.id,
				amount: spentAmount,
			},
		}
		submitTrade(params).then((data) => {
			if (!data) {
				setConfirmModalStatus('success')
			} else if ('errorKey' in data) {
				if (data.errorKey === ERROR_KEY_PRICE_CHANGE) {
					fetchChangedPrice(data)
				} else {
					setGeneralError(data)
					setConfirmModalStatus('error')
				}
			} else {
				// user payed with card
				dispatch(setWebViewVisible(true))
				setWebViewState(data)
			}
		})
	}

	const fetchChangedPrice = (errorData: UiErrorData) => {
		fetchOffersApi().then((offers) => {
			const coinPair = offers[pair.fiat.displayCcy].find(
				(coin) => coin.pair.baseCurrencyDisplayCode === pair.crypto.displayCcy
			)
			const changedPrice =
				tradeType === 'Buy' ? coinPair?.buyPrice : coinPair?.sellPrice

			setGeneralError({
				...errorData,
				errorMessage: 'cn_confirm_err_price_change',
			})
			setChangedPrice(changedPrice)
		})
	}

	return {
		changedPrice,
		onConfirmPressed,
		confirmModalStatus,
		setConfirmModalStatus,
		webViewState,
		generalError,
	}
}
