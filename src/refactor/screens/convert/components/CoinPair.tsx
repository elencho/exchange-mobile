import { Theme, useTheme } from '@theme/index'
import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CoinInput from '@app/refactor/screens/convert/components/CoinInput'
import CoinInputArrow from '@assets/images/CoinInputArrow.svg'
import AppText from '@components/text'
import { CoinError, coinError } from '@app/refactor/screens/convert/utilError'

type Props = {
	pair: CoinPair
	tradeType: TradeType
	balanceMultiplier: number | undefined
	buttonClicked: boolean | undefined
	handleButtonClick: (spentAmount?: string, receiveAmount?: string) => void
	handleDropDownClick: (type: CoinType) => void
	saveBaseAmount: (amount: string) => void

	upCoin: Coin | undefined
	upAmount: string
	lowAmount: string
	lowCoin: Coin | undefined
	lastChanged: Position | null
	lastClicked: Position | null
	errorInputs: Position[]
	errorText: string | undefined

	setUpCoin: (coin: Coin) => void
	setLowCoin: (coin: Coin) => void
	setUpAmount: (amount: string) => void
	setLowAmount: (amount: string) => void
	setLastChanged: (pos: Position | null) => void
	setLastClicked: (pos: Position | null) => void
	setErrorInputs: (pos: Position[]) => void
	setErrorText: (txt: string | undefined) => void
}

const CoinPair = ({
	pair,
	tradeType,
	balanceMultiplier,
	buttonClicked,
	handleButtonClick,
	handleDropDownClick,
	saveBaseAmount,
	upCoin,
	upAmount,
	lowAmount,
	lowCoin,
	lastChanged,
	lastClicked,
	errorInputs,
	errorText,
	setUpCoin,
	setLowCoin,
	setUpAmount,
	setLowAmount,
	setLastChanged,
	setLastClicked,
	setErrorInputs,
	setErrorText,
}: Props) => {
	const { styles } = useTheme(_styles)

	useEffect(() => {
		if (!buttonClicked) return

		const err = coinError(
			tradeType === 'Buy' ? upAmount : lowAmount,
			tradeType === 'Sell' ? upAmount : lowAmount,
			pair,
			tradeType
		)
		if (err === null) {
			handleButtonClick(upAmount, lowAmount)
		} else {
			handleButtonClick()
			handleError(err)
		}
	}, [buttonClicked])

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

	const clearError = () => {
		setErrorText('')
		setErrorInputs([])
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
		// balance multiplier
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
		<View style={styles.wrapper}>
			<View style={styles.container}>
				<CoinInput
					coin={upCoin}
					amount={upAmount}
					isActive={lastChanged === 'up'}
					onAmountChange={(txt) => {
						saveBaseAmount(txt)
						setLastChanged('up')
						setUpAmount(txt)
						recalculateLow(txt, lowCoin.scale)
						clearError()
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
					error={errorInputs.includes('up')}
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
						clearError()
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
					error={errorInputs.includes('low')}
				/>
				<CoinInputArrow
					width={36}
					height={36}
					style={{
						position: 'absolute',
					}}
				/>
			</View>
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
		wrapper: {
			marginTop: 24,
		},
		container: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		errorText: {
			marginLeft: 2,
			marginTop: 8,
			color: theme.color.error,
		},
	})

export default memo(CoinPair)
