import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native'
import Arrow from '@assets/images/Arrow.svg'
import {
	formatAmount,
	formatScale,
	hexOpacityPct,
} from '@app/refactor/screens/convert/util'

type Props = {
	coin: Coin
	amount: string | undefined
	isActive: boolean
	error?: boolean | string
	onAmountChange: (txt: string) => void
	onFocus: () => void
	onDropdownClick: (type: CoinType) => void
}

const CoinInput = ({
	coin,
	amount,
	isActive,
	error,
	onAmountChange,
	onDropdownClick,
	onFocus,
}: Props) => {
	const { styles, theme } = useTheme(_styles)

	const [formattedAmount, setFormattedAmount] = useState('')
	const inputRef = useRef<TextInput | null>(null)

	useEffect(() => {
		if (!amount) {
			setFormattedAmount('')
		} else {
			setFormattedAmount(formatAmount(amount, coin))
		}
	}, [amount, coin])

	useEffect(() => {
		isActive && inputRef?.current?.focus()
	}, [isActive])

	const CoinButton = () => {
		return (
			<Pressable
				style={styles.coinButtonCointainer}
				onPress={() => onDropdownClick(coin.type)}>
				<Image
					style={{ width: 22, height: 22, marginHorizontal: 8 }}
					source={{
						uri: coin.iconPngUrl,
					}}
				/>
				<AppText variant="l" style={styles.coinButtonText}>
					{coin.displayCcy}
				</AppText>
				<Arrow style={{ marginLeft: 8, marginRight: 14 }} />
			</Pressable>
		)
	}

	return (
		<View
			style={[
				styles.container,
				{
					borderColor: error
						? theme.color.error
						: isActive
						? theme.color.brandSecondary
						: hexOpacityPct(theme.color.textSecondary, 50),
				},
			]}>
			<View style={styles.infoContainer}>
				<TextInput
					ref={inputRef}
					keyboardType="numeric"
					style={styles.input}
					value={formattedAmount}
					placeholder={'0.' + '0'.repeat(coin.scale)}
					placeholderTextColor={hexOpacityPct(theme.color.textSecondary, 60)}
					onFocus={onFocus}
					onChangeText={(txt) => {
						if (isActive) onAmountChange(txt)
					}}
				/>
				<AppText style={styles.balanceText} variant="s">
					{'Balance: ' + formatScale(coin.balance, coin.scale)}
				</AppText>
			</View>
			<CoinButton />
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			width: '100%',
			justifyContent: 'space-between',
			alignItems: 'center',
			flexDirection: 'row',
			borderRadius: 8,
			borderWidth: 1,
		},
		input: {
			fontSize: 20,
			fontFamily: theme.font.medium,
			color: theme.color.textThird,
		},
		infoContainer: {
			marginVertical: 18,
			marginLeft: 20,
			flexDirection: 'column',
		},
		balanceText: {
			marginTop: 4,
			color: hexOpacityPct(theme.color.textSecondary, 80),
		},
		coinButtonCointainer: {
			marginVertical: 18,
			marginEnd: 20,
			width: 110,
			height: 40,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			borderRadius: 24,
			backgroundColor: theme.color.backgroundSecondary,
		},
		coinButtonText: {
			textAlign: 'center',
			color: theme.color.textThird,
		},
	})

export default memo(CoinInput)
