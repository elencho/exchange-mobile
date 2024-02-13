import { Theme, useTheme } from '@theme/index'
import React, { memo, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import CoinInput from '@app/refactor/screens/convert/components/CoinInput'
import CoinInputArrow from '@assets/images/CoinInputArrow.svg'
import AppText from '@components/text'

type Props = {
	pair: CoinPair
	tradeType: TradeType
	balanceMultiplier: number | undefined
	handleDropDownClick: (type: CoinType) => void
	saveBaseAmount: (amount: string) => void
	onTextChanged: () => void

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

	recalculateUp: (txt: string, scale?: number) => void
	recalculateLow: (txt: string, scale?: number) => void
}

const CoinPair = ({
	handleDropDownClick,
	saveBaseAmount,
	upCoin,
	upAmount,
	lowAmount,
	lowCoin,
	lastChanged,
	errorInputs,
	errorText,
	setUpAmount,
	setLowAmount,
	setLastChanged,
	setLastClicked,
	setErrorInputs,
	setErrorText,
	recalculateUp,
	recalculateLow,
	onTextChanged,
}: Props) => {
	const { styles } = useTheme(_styles)

	const clearError = () => {
		setErrorText('')
		setErrorInputs([])
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
						onTextChanged()
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
						onTextChanged()
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
