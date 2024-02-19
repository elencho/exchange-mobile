import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Fee from '@assets/images/Fee.svg'
import { formatScale, hexOpacityPct } from '@app/refactor/screens/convert/util'

type Props = {
	fiat: Coin
	card: Card
	amount: string
}

const ConfirmTradeCard = ({ fiat, card, amount }: Props) => {
	const { styles } = useTheme(_styles)

	const feeNum = Number(amount) * (card.feePct ? card.feePct / 100 : 0)
	const totalNum = Number(amount) + feeNum
	const totalTxt =
		'Total: ' + formatScale(totalNum, fiat.scale) + ' ' + fiat.displayCcy
	const feeTxt =
		'Fee: ' +
		formatScale(feeNum, fiat.scale) +
		' ' +
		fiat.displayCcy +
		' (' +
		card.network +
		' ' +
		(card.feePct || 0) +
		'%)'

	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Fee />
			</View>
			<View style={styles.textContainer}>
				<AppText variant="l" style={styles.total}>
					{totalTxt}
				</AppText>
				<AppText variant="l" style={styles.fee}>
					{feeTxt}
				</AppText>
			</View>
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			marginTop: 20,
			width: '100%',
			flexDirection: 'row',
		},
		iconContainer: {
			borderRadius: 100,
			padding: 10,
			backgroundColor: theme.color.tabTagHint,
		},
		textContainer: {
			justifyContent: 'space-between',
			marginLeft: 10,
		},
		total: {
			color: hexOpacityPct(theme.color.textThird, 80),
		},
		fee: {
			color: theme.color.textSecondary,
		},
	})

export default ConfirmTradeCard
