import { Theme, useTheme } from '@theme/index'
import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CoinInput from '@app/refactor/screens/convert/components/CoinInput'
import CoinInputArrow from '@assets/images/CoinInputArrow.svg'
import AppText from '@components/text'
import { coinError } from '@app/refactor/screens/convert/utilError'

type Props = {
	pair: CoinPair
	tradeType: TradeType
	balanceMultiplier: number | undefined
	buttonClicked: boolean | undefined
	handleButtonClick: (success: boolean) => void
	handleDropDownClick: (type: CoinType) => void
}
type Position = 'up' | 'low'

const CoinPair = ({
	pair,
	tradeType,
	balanceMultiplier,
	buttonClicked,
	handleButtonClick,
	handleDropDownClick,
}: Props) => {
	const { styles, theme } = useTheme(_styles)

	const [upCoin, setUpCoin] = useState<Coin>()
	const [upAmount, setUpAmount] = useState('')

	const [lowCoin, setLowCoin] = useState<Coin>()
	const [lowAmount, setLowAmount] = useState('')

	const [lastChanged, setLastChanged] = useState<Position | null>(null)
	const [lastClicked, setLastClicked] = useState<Position | null>(null)

	const [errorInput, setErrorInput] = useState<Position[]>([])
	const [errorText, setErrorText] = useState<string>()

	useEffect(() => {
		if (!buttonClicked) return

		const err = coinError(
			tradeType === 'Buy' ? upAmount : lowAmount,
			tradeType === 'Sell' ? upAmount : lowAmount,
			pair,
			tradeType
		)
		if (err) {
			setErrorText(err.err)
			if (err.type.length === 2) {
				setErrorInput(['up', 'low'])
			} else if (err.type.length === 0) {
				setErrorInput([])
			} else {
				if (
					(err.type[0] === 'Fiat' && tradeType === 'Buy') ||
					(err.type[0] === 'Crypto' && tradeType === 'Sell')
				) {
					setErrorInput(['up'])
				} else {
					setErrorInput(['low'])
				}
			}
		}
		handleButtonClick(err === null)
	}, [buttonClicked])

	const clearError = () => {
		setErrorText('')
		setErrorInput([])
	}

	useEffect(() => {
		const upC = tradeType === 'Buy' ? pair.fiat : pair.crypto
		const lowC = tradeType === 'Buy' ? pair.crypto : pair.fiat
		setUpCoin(upC)
		setLowCoin(lowC)

		if (lastChanged === 'up') {
			setLowAmount(upAmount)
			recalculateUp(upAmount, upC.scale)
			setLastChanged('low')
		} else if (lastChanged === 'low') {
			setUpAmount(lowAmount)
			recalculateLow(lowAmount, lowC.scale)
			setLastChanged('up')
		}
	}, [tradeType])

	useEffect(() => {
		const upC = tradeType === 'Buy' ? pair.fiat : pair.crypto
		const lowC = tradeType === 'Buy' ? pair.crypto : pair.fiat
		setUpCoin(upC)
		setLowCoin(lowC)

		if (lastClicked === 'up') {
			recalculateLow(upAmount, lowC.scale)
		} else if (lastClicked === 'low') {
			recalculateUp(lowAmount, upC.scale)
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

	const recalculateUp = (txt: string, scale: number) => {
		const num = Number(txt)
		if (num === 0 || isNaN(num)) {
			return setUpAmount('')
		}

		const price = tradeType === 'Buy' ? pair.buyPrice : pair.sellPrice
		const mul = tradeType === 'Sell' ? 1 / Number(price) : Number(price)

		const newUp = mul * Number(txt)
		if (newUp === 0) {
			setUpAmount('')
			setLowAmount('')
		} else {
			setUpAmount(newUp.toFixed(scale))
		}
	}

	const recalculateLow = (txt: string, scale: number) => {
		const num = Number(txt)
		if (num === 0 || isNaN(num)) {
			return setLowAmount('')
		}

		const price = tradeType === 'Buy' ? pair.buyPrice : pair.sellPrice
		const mul = tradeType === 'Buy' ? 1 / Number(price) : Number(price)

		const newLow = mul * Number(txt)
		if (newLow === 0) {
			setUpAmount('')
			setLowAmount('')
		} else {
			setLowAmount(newLow.toFixed(scale))
		}
	}

	return upCoin && lowCoin ? (
		<View style={{ marginTop: 24 }}>
			<CoinInput
				coin={upCoin}
				amount={upAmount}
				isActive={lastChanged === 'up'}
				onAmountChange={(txt) => {
					setUpAmount(txt)
					recalculateLow(txt, lowCoin.scale)
				}}
				onDropdownClick={(type) => {
					setLastClicked('up')
					handleDropDownClick(type)
				}}
				onFocus={() => {
					setLastChanged('up')
					clearError()
				}}
				onBlur={() => {
					setLastChanged(null)
				}}
				error={errorInput.includes('up')}
			/>
			<View style={{ height: 10 }} />
			<CoinInput
				coin={lowCoin}
				amount={lowAmount}
				isActive={lastChanged === 'low'}
				onAmountChange={(txt) => {
					setLowAmount(txt)
					recalculateUp(txt, upCoin.scale)
				}}
				onDropdownClick={(type) => {
					setLastClicked('low')
					handleDropDownClick(type)
				}}
				onFocus={() => {
					setLastChanged('low')
					clearError()
				}}
				onBlur={() => {
					setLastChanged(null)
				}}
				error={errorInput.includes('low')}
			/>
			<CoinInputArrow
				width={36}
				height={36}
				style={{
					position: 'absolute',
					top: '40%',
					left: '45%',
				}}
			/>
			{errorText?.length ? (
				<AppText variant="m" style={styles.errorText}>
					{errorText}
				</AppText>
			) : null}
		</View>
	) : null
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {},
		errorText: {
			marginLeft: 2,
			marginTop: 8,
			color: theme.color.error,
		},
	})

export default CoinPair
