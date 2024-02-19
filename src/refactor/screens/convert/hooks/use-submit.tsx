import { submitTrade } from '@app/refactor/screens/convert/api/convertNowApi'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { setWebViewVisible } from '@store/redux/common/slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const useSubmit = (props: ScreenProp<'ConfirmConvert'>) => {
	const { spentAmount, pair, tradeType, card } = props.route?.params

	const dispatch = useDispatch()

	const [changedPrice, setChangedPrice] = useState<string>()
	const [webViewState, setWebViewState] = useState<CardRedirectResponse>()
	const [generalError, setGeneralError] = useState<UiErrorData | null>(null)
	const [confirmModalStatus, setConfirmModalStatus] =
		useState<ConfirmModalStatus>()

	const onConfirmPressed = () => {
		const amount = Number(spentAmount).toFixed(
			tradeType === 'Buy' ? pair.fiat.scale : pair.crypto.scale
		)
		const params: SubmitTradeRequest = {
			pairCode: pair.code,
			action: tradeType === 'Buy' ? 'BID' : 'ASK',
			amount: (Number(amount) * -2).toString(), // Todo amount
			cardTransactionRequest: card && {
				currency: 'GEL',
				cardId: card.id,
				amount,
			},
		}
		submitTrade(params).then((data) => {
			if (!data) {
				setConfirmModalStatus('success')
			} else if ('errorKey' in data) {
				setConfirmModalStatus('error')
				console.log(data.errorKey)
				// if errorKey === price changed: own logic
				setGeneralError(data)
				return
			} else {
				dispatch(setWebViewVisible(true))
				setWebViewState(data)
			}
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
