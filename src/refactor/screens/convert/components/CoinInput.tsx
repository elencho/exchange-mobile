import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { memo, useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native'
import Arrow from '@assets/images/Arrow.svg'
import { formatAmount, hexOpacityPct } from '@app/refactor/screens/convert/util'

type Props = {
	coin: Coin
	amount: string | undefined
	isActive: boolean
	onAmountChange: (txt: string) => void
	onDropdownClick: (type: CoinType) => void
	error?: boolean | string
}

const CoinInput = ({
	coin,
	amount,
	isActive,
	onAmountChange,
	onDropdownClick,
	error,
}: Props) => {
	const { styles, theme } = useTheme(_styles)

	const [formattedAmount, setFormattedAmount] = useState('')

	useEffect(() => {
		if (!amount) {
			setFormattedAmount('')
		} else {
			setFormattedAmount(formatAmount(amount, coin))
		}
	}, [amount, coin])

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
						: theme.color.textSecondary,
				},
			]}>
			<View style={styles.infoContainer}>
				<TextInput
					keyboardType="numeric"
					style={styles.input}
					value={formattedAmount}
					placeholder="Enter Amount"
					placeholderTextColor={hexOpacityPct(theme.color.textSecondary, 60)}
					onBlur={() => {}}
					onFocus={() => {}}
					onChangeText={(txt) => onAmountChange(txt)}
				/>
				<AppText style={styles.balanceText} variant="s">
					{'Balance: ' + coin.balance}
				</AppText>
			</View>
			<CoinButton />
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
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
