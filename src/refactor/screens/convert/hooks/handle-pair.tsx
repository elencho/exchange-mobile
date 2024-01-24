import { CoinError, coinError } from '@app/refactor/screens/convert/utilError'
import { useState, useEffect } from 'react'

type Props = {
	pair: CoinPair | undefined
	balanceMultiplier: number | undefined
	tradeType: TradeType
	onButtonSuccess: (spent: string, received: string) => void
}

export const handlePair = ({
	pair,
	balanceMultiplier,
	tradeType,
	onButtonSuccess,
}: Props) => {
	const [upCoin, setUpCoin] = useState<Coin>()
	const [upAmount, setUpAmount] = useState('')
	const [lowCoin, setLowCoin] = useState<Coin>()
	const [lowAmount, setLowAmount] = useState('')
	const [lastChanged, setLastChanged] = useState<Position | null>(null)
	const [lastClicked, setLastClicked] = useState<Position | null>(null)
	const [errorInputs, setErrorInputs] = useState<Position[]>([])
	const [errorText, setErrorText] = useState<string>()

	useEffect(() => {
		const upC = tradeType === 'Buy' ? pair?.fiat : pair?.crypto
		const lowC = tradeType === 'Buy' ? pair?.crypto : pair?.fiat
		setUpCoin(upC)
		setLowCoin(lowC)

		if (lastChanged === 'up') {
			setLowAmount(upAmount)
			recalculateUp(upAmount, upC?.scale)
			setLastChanged('low')
		} else if (lastChanged === 'low') {
			setUpAmount(lowAmount)
			recalculateLow(lowAmount, lowC?.scale)
			setLastChanged('up')
		}
	}, [tradeType])

	useEffect(() => {
		// balance multiplier
		const upC = tradeType === 'Buy' ? pair?.fiat : pair?.crypto
		const lowC = tradeType === 'Buy' ? pair?.crypto : pair?.fiat
		setUpCoin(upC)
		setLowCoin(lowC)

		if (lastClicked === 'up') {
			recalculateLow(upAmount, lowC?.scale)
		} else if (lastClicked === 'low') {
			recalculateUp(lowAmount, upC?.scale)
		}
		setLastClicked(null)
	}, [pair])

	useEffect(() => {
		if (balanceMultiplier) {
			const upBalance = Number(upCoin?.balance)
			const amount = balanceMultiplier
				? balanceMultiplier * upBalance
				: Number(upAmount)

			setUpAmount(amount.toString())
			recalculateLow(amount.toString(), lowCoin!.scale)
		}
	}, [balanceMultiplier])

	const onButtonClick = () => {
		const err = coinError(
			tradeType === 'Buy' ? upAmount : lowAmount,
			tradeType === 'Sell' ? upAmount : lowAmount,
			pair,
			tradeType
		)
		if (err === null) {
			onButtonSuccess(upAmount, lowAmount)
		} else {
			handleError(err)
		}
	}

	const handleError = (err: CoinError) => {
		setErrorText(err.err)
		if (err.type.length === 2) {
			setErrorInputs(['up', 'low'])
		} else if (err.type.length === 0) {
			setErrorInputs([])
		} else {
			if (
				(err.type[0] === 'Fiat' && tradeType === 'Buy') ||
				(err.type[0] === 'Crypto' && tradeType === 'Sell')
			) {
				setErrorInputs(['up'])
			} else {
				setErrorInputs(['low'])
			}
		}
	}

	const recalculateUp = (txt: string, scale?: number) => {
		const num = Number(txt)
		if (num === 0 || isNaN(num)) {
			return setUpAmount('')
		}

		const price = tradeType === 'Buy' ? pair?.buyPrice : pair?.sellPrice
		const mul = tradeType === 'Sell' ? 1 / Number(price) : Number(price)

		const newUp = mul * Number(txt)
		if (newUp === 0) {
			setUpAmount('')
			setLowAmount('')
		} else {
			setUpAmount(newUp.toFixed(scale))
		}
	}

	const recalculateLow = (txt: string, scale?: number) => {
		const num = Number(txt)
		if (num === 0 || isNaN(num)) {
			return setLowAmount('')
		}

		const price = tradeType === 'Buy' ? pair?.buyPrice : pair?.sellPrice
		const mul = tradeType === 'Buy' ? 1 / Number(price) : Number(price)

		const newLow = mul * Number(txt)
		if (newLow === 0) {
			setUpAmount('')
			setLowAmount('')
		} else {
			setLowAmount(newLow.toFixed(scale))
		}
	}

	return {
		upCoin,
		setUpCoin,
		upAmount,
		setUpAmount,
		lowCoin,
		setLowCoin,
		lowAmount,
		setLowAmount,
		lastChanged,
		setLastChanged,
		lastClicked,
		setLastClicked,
		errorInputs,
		setErrorInputs,
		errorText,
		setErrorText,
		onButtonClick,
		recalculateUp,
		recalculateLow,
	}
}
