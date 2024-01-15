import { Theme, useTheme } from '@theme/index'
import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CoinInput from '@app/refactor/screens/convert/components/CoinInput'
import CoinInputArrow from '@assets/images/CoinInputArrow.svg'

type Props = {
	pair: CoinPair
	tradeType: TradeType
	balanceMultiplier: number | undefined
	handleDropDownClick: (type: CoinType) => void
}
type Position = 'up' | 'low'

const CoinPair = ({
	pair,
	tradeType,
	balanceMultiplier,
	handleDropDownClick,
}: Props) => {
	const { styles, theme } = useTheme(_styles)
	const [lastChanged, setLastChanged] = useState<Position | null>(null)

	const [upCoin, setUpCoin] = useState<Coin>()
	const [upAmount, setUpAmount] = useState('')

	const [lowCoin, setLowCoin] = useState<Coin>()
	const [lowAmount, setLowAmount] = useState('')

	useEffect(() => {
		console.log(pair, tradeType, balanceMultiplier, handleDropDownClick)
	}, [])

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
					setLastChanged('up')
					setUpAmount(txt)
					recalculateLow(txt, lowCoin.scale)
				}}
				onDropdownClick={handleDropDownClick}
			/>
			<View style={{ height: 10 }} />
			<CoinInput
				coin={lowCoin}
				amount={lowAmount}
				isActive={lastChanged === 'low'}
				onAmountChange={(txt) => {
					setLastChanged('low')
					setLowAmount(txt)
					recalculateUp(txt, upCoin.scale)
				}}
				onDropdownClick={handleDropDownClick}
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
		</View>
	) : (
		<View />
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {},
	})

export default memo(CoinPair)
