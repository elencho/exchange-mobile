import { CoinError, coinError } from '@app/refactor/screens/convert/utilError'
import { useState, useEffect } from 'react'

type Props = {
	pair: CoinPair | undefined
	balanceMultiplier: number | undefined
	tradeType: TradeType
	buyWithCard: boolean
	onButtonSuccess: (spent: string, received: string) => void
}

export const handlePair = ({
	pair,
	balanceMultiplier,
	tradeType,
	buyWithCard,
	onButtonSuccess,
}: Props) => {
	const [upCoin, setUpCoin] = useState<Coin>()
	const [upAmount, setUpAmount] = useState('')
	const [lowCoin, setLowCoin] = useState<Coin>()
	const [lowAmount, setLowAmount] = useState('')
	const [lastChanged, setLastChanged] = useState<Position | null>(null)
	const [errorInputs, setErrorInputs] = useState<Position[]>([])
	const [errorText, setErrorText] = useState<string>()

	useEffect(() => {
		const { upC, lowC } = sortCoins()

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
		const { upC, lowC } = sortCoins()

		if (lastChanged === 'up') {
			recalculateLow(upAmount, lowC?.scale)
		} else if (lastChanged === 'low') {
			recalculateUp(lowAmount, upC?.scale)
		}
	}, [pair])

	useEffect(() => {
		if (!balanceMultiplier) return
		const { upC, lowC } = sortCoins()

		const amount = (balanceMultiplier * Number(upC?.balance)).toString()
		setUpAmount(amount)
		recalculateLow(amount, lowC?.scale)

		setLastChanged('up')
	}, [balanceMultiplier])

	const handleButtonClick = () => {
		const coinErr = coinError(
			tradeType === 'Buy' ? upAmount : lowAmount,
			tradeType === 'Sell' ? upAmount : lowAmount,
			pair,
			tradeType,
			buyWithCard
		)
		if (coinErr === null) {
			onButtonSuccess(upAmount, lowAmount)
		} else {
			handleError(coinErr)
		}
	}

	const handleError = (err: CoinError) => {
		err.err && setErrorText(err.err)
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

	const recalculateUp = (low: string, scale?: number) => {
		const num = Number(low)
		if (num === 0 || isNaN(num)) {
			return setUpAmount('')
		}

		const price = tradeType === 'Buy' ? pair?.buyPrice : pair?.sellPrice
		const mul = tradeType === 'Sell' ? 1 / Number(price) : Number(price)

		const newUp = mul * Number(low)
		if (newUp === 0) {
			setUpAmount('')
			setLowAmount('')
		} else {
			setUpAmount(newUp.toFixed(scale))
		}
	}

	const recalculateLow = (up: string, scale?: number) => {
		const num = Number(up)
		if (num === 0 || isNaN(num)) {
			return setLowAmount('')
		}

		const price = tradeType === 'Buy' ? pair?.buyPrice : pair?.sellPrice
		const mul = tradeType === 'Buy' ? 1 / Number(price) : Number(price)

		const newLow = mul * Number(up)
		if (newLow === 0) {
			setUpAmount('')
			setLowAmount('')
		} else {
			setLowAmount(newLow.toFixed(scale))
		}
	}

	const sortCoins = () => {
		const upC = tradeType === 'Buy' ? pair?.fiat : pair?.crypto
		const lowC = tradeType === 'Buy' ? pair?.crypto : pair?.fiat
		setUpCoin(upC)
		setLowCoin(lowC)
		return { upC, lowC }
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
		errorInputs,
		setErrorInputs,
		errorText,
		setErrorText,
		handleButtonClick,
		recalculateUp,
		recalculateLow,
	}
}
