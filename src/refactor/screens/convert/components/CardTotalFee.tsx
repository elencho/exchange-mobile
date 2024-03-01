import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Fee from '@assets/images/Fee.svg'
import { formatScale, hexOpacityPct } from '@app/refactor/screens/convert/util'
import Skeleton from '@components/skeleton'
import { t } from 'i18next'

type Props = {
	fiat: Coin | undefined
	card: Card
	amount: string
	loading: boolean
}

const ConfirmTradeCard = ({ fiat, card, amount, loading }: Props) => {
	const { styles } = useTheme(_styles)

	const feeNum = Number(amount) * (card.feePct ? card.feePct / 100 : 0)
	const totalNum = Number(amount) + feeNum

	const networkTxt = (net: string) => {
		if (net === 'AMEX') return t('cn_card_amex')
		if (net === 'MASTERCARD') return t('cn_card_mastercard')
		if (net === 'VISA') return t('cn_card_visa')
		return net
	}

	const totalTxt =
		t('cn_total') +
		' ' +
		formatScale(totalNum, fiat?.scale) +
		' ' +
		fiat?.displayCcy

	const feeTxt =
		t('cn_fee') +
		' ' +
		formatScale(feeNum, fiat?.scale) +
		' ' +
		fiat?.displayCcy +
		' (' +
		networkTxt(card.network) +
		' ' +
		(card.feePct || 0) +
		'%)'

	const CardFeeSkeleton = () => {
		return (
			<View style={styles.container}>
				<Skeleton
					width={42}
					height={42}
					style={{
						borderRadius: 100,
					}}
				/>
				<View style={styles.textContainer}>
					<Skeleton width={140} height={6} style={{ marginTop: 8 }} />
					<Skeleton width={182} height={6} style={{ marginBottom: 8 }} />
				</View>
			</View>
		)
	}

	return loading ? (
		<CardFeeSkeleton />
	) : (
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
