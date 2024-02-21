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
import Skeleton from '@components/skeleton'

type Props = {
	coin?: Coin
	loading: boolean
	amount: string | undefined
	isActive: boolean
	error?: boolean | string
	onAmountChange: (txt: string) => void
	onFocus: () => void
	onDropdownClick: (type: CoinType) => void
}

const CoinInput = ({
	coin,
	loading,
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
				onPress={() => {
					coin && onDropdownClick(coin.type)
				}}>
				<Image
					style={{ width: 22, height: 22, marginHorizontal: 8 }}
					source={{
						uri: coin?.iconPngUrl,
					}}
				/>
				<AppText variant="l" style={styles.coinButtonText}>
					{coin?.displayCcy}
				</AppText>
				<Arrow style={{ marginLeft: 8, marginRight: 14 }} />
			</Pressable>
		)
	}

	const CoinButtonLoading = () => {
		return (
			<View style={styles.coinButtonCointainer}>
				<Skeleton
					width={22}
					height={22}
					style={{ marginHorizontal: 8, borderRadius: 100 }}
				/>
				<Skeleton width={36} height={6} />
				<Arrow style={{ marginLeft: 8, marginRight: 14 }} />
			</View>
		)
	}

	const placeholderText = '0.' + '0'.repeat(loading || !coin ? 2 : coin.scale)

	const balanceText =
		'Balance: ' + (loading ? '' : formatScale(coin?.balance, coin?.scale))

	const borderColor = () => {
		const def = hexOpacityPct(theme.color.textSecondary, 50)
		return loading
			? def
			: error
			? theme.color.error
			: isActive
			? theme.color.brandSecondary
			: def
	}

	return (
		<View
			style={[
				styles.container,
				{
					borderColor: borderColor(),
				},
			]}>
			<View style={styles.infoContainer}>
				{loading ? (
					<Skeleton width={36} height={10} />
				) : (
					<TextInput
						ref={inputRef}
						keyboardType="numeric"
						style={styles.input}
						value={formattedAmount}
						placeholder={placeholderText}
						placeholderTextColor={hexOpacityPct(theme.color.textSecondary, 60)}
						onFocus={onFocus}
						onChangeText={(txt) => {
							if (isActive) onAmountChange(txt)
						}}
					/>
				)}
				{loading ? (
					<Skeleton width={60} height={6} style={{ marginTop: 12 }} />
				) : (
					<AppText style={styles.balanceText} variant="s">
						{balanceText}
					</AppText>
				)}
			</View>
			{loading ? <CoinButtonLoading /> : <CoinButton />}
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
			minHeight: 50,
			justifyContent: 'center',
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
