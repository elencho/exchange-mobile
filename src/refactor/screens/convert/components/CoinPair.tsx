import { Theme, useTheme } from '@theme/index'
import React, { memo, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import CoinInput from '@app/refactor/screens/convert/components/CoinInput'
import CoinInputArrow from '@assets/images/CoinInputArrow.svg'
import AppText from '@components/text'

type Props = {
	pair: CoinPair | undefined
	loading: boolean
	tradeType: TradeType
	balanceMultiplier: number | undefined
	handleDropDownClick: (type: CoinType) => void

	upCoin: Coin | undefined
	upAmount: string
	lowAmount: string
	lowCoin: Coin | undefined
	lastChanged: Position | null
	errorInputs: Position[]
	errorText: string | undefined

	setUpCoin: (coin: Coin) => void
	setLowCoin: (coin: Coin) => void
	setUpAmount: (amount: string) => void
	setLowAmount: (amount: string) => void
	setLastChanged: (pos: Position | null) => void
	setErrorInputs: (pos: Position[]) => void
	setErrorText: (txt: string | undefined) => void

	recalculateUp: (txt: string, scale?: number) => void
	recalculateLow: (txt: string, scale?: number) => void
}

const CoinPair = ({
	handleDropDownClick,
	loading,
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
	setErrorInputs,
	setErrorText,
	recalculateUp,
	recalculateLow,
}: Props) => {
	const { styles } = useTheme(_styles)

	const clearError = () => {
		setErrorText('')
		setErrorInputs([])
	}

	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>
				<CoinInput
					coin={upCoin}
					loading={loading}
					amount={upAmount}
					isActive={lastChanged === 'up'}
					onAmountChange={(txt, oldTxt) => {
						if (txt === '0' && oldTxt === '0.') {
							setUpAmount('')
						} else {
							setUpAmount(txt)
							recalculateLow(txt, lowCoin?.scale)
						}
						clearError()
					}}
					onDropdownClick={(type) => {
						handleDropDownClick(type)
					}}
					onFocus={() => {
						setLastChanged('up')
						clearError()
					}}
					error={errorInputs.includes('up')}
				/>
				<View style={{ height: 10 }} />
				<CoinInput
					coin={lowCoin}
					loading={loading}
					amount={lowAmount}
					isActive={lastChanged === 'low'}
					onAmountChange={(txt, oldTxt) => {
						if (txt === '0' && oldTxt === '0.') {
							setLowAmount('')
						} else {
							setLowAmount(txt)
							recalculateUp(txt, upCoin?.scale)
						}
						clearError()
					}}
					onDropdownClick={(type) => {
						handleDropDownClick(type)
					}}
					onFocus={() => {
						setLastChanged('low')
						clearError()
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
			{errorText?.length && !loading ? (
				<AppText variant="m" style={styles.errorText} noTranslate>
					{errorText}
				</AppText>
			) : null}
		</View>
	)
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
