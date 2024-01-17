import { submitTrade } from '@app/refactor/screens/convert/api/convertNowApi'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { useState } from 'react'

export const useSubmit = (props: ScreenProp<'ConfirmConvert'>) => {
	const { spentAmount, pair, tradeType, card } = props.route?.params

	const [generalError, setGeneralError] = useState<UiErrorData | null>(null)
	const [confirmModalStatus, setConfirmModalStatus] =
		useState<ConfirmModalStatus>()

	const onConfirmPressed = () => {
		const params: SubmitTradeRequest = {
			pairCode: pair.code,
			action: tradeType === 'Buy' ? 'BID' : 'ASK',
			amount: spentAmount,
			cardTransactionRequest: card && {
				currency: 'GEL',
				cardId: card.id,
				amount: spentAmount,
			},
		}
		submitTrade(params).then((data) => {
			if (data === null) {
				setConfirmModalStatus('success')
			} else if ('errorKey' in data) {
				setConfirmModalStatus('error')
				// if errorKey === price changed: own logic
				setGeneralError(data)
			} else {
				// redirect to webview
			}
			return
		})
	}

	return {
		onConfirmPressed,
		confirmModalStatus,
		setConfirmModalStatus,
		generalError,
		setGeneralError,
	}
}
