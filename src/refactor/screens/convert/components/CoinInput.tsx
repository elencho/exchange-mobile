import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { useRef, useState } from 'react'
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native'
import Arrow from '@assets/images/Arrow.svg'

type Props = {
	coin: Coin
	onDropdownClick: (coinType: CoinType) => void
	error?: boolean | string
}

const CoinInput = ({ coin, onDropdownClick, error }: Props) => {
	const { styles, theme } = useTheme(_styles)

	const [amount, setAmount] = useState<string>('0.0')
	const isFocused = useRef(false)

	const borderColor = error
		? theme.color.error
		: isFocused.current
		? theme.color.brandSecondary
		: theme.color.textSecondary

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
		<View style={[styles.container, { borderColor }]}>
			<View style={styles.infoContainer}>
				<TextInput
					keyboardType="decimal-pad"
					style={styles.input}
					value={amount}
					onBlur={() => (isFocused.current = false)}
					onFocus={() => (isFocused.current = true)}
					onChangeText={setAmount}
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
			color: theme.color.textSecondary,
		},
		coinButtonCointainer: {
			marginVertical: 18,
			marginEnd: 20,
			height: 40,
			flexDirection: 'row',
			alignItems: 'center',
			borderRadius: 24,
			backgroundColor: theme.color.backgroundSecondary,
		},
		coinButtonText: {
			color: theme.color.textThird,
		},
	})

export { CoinInput }
