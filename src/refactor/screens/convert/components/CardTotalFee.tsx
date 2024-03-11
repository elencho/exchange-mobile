import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Fee from '@assets/images/Fee.svg'
import { hexOpacityPct } from '@app/refactor/screens/convert/util'
import Skeleton from '@components/skeleton'
import { t } from 'i18next'

type Props = {
	fiat: Coin | undefined
	card: Card
	loading: boolean
	totalFee: TotalFee | undefined
}

const ConfirmTradeCard = ({ fiat, card, loading, totalFee }: Props) => {
	const { styles } = useTheme(_styles)

	const [totalTxt, setTotalTxt] = useState('')
	const [feeTxt, setFeeTxt] = useState('')

	useEffect(() => {
		const pct = card.feePct ? card.feePct / 100 : 0
		formatTotal(totalFee?.total)
		formatFee(totalFee?.fee, pct)
	}, [totalFee])

	const formatTotal = (total: string | undefined) => {
		setTotalTxt(t('cn_total') + ' ' + (total || '0') + ' ' + fiat?.displayCcy)
	}

	const formatFee = (fee: string | undefined, pct: number) => {
		setFeeTxt(
			t('cn_fee') +
				' ' +
				(fee || '0') +
				' ' +
				fiat?.displayCcy +
				' (' +
				networkTxt(card.network) +
				' ' +
				pct * 100 +
				'%)'
		)
	}

	const networkTxt = (net: string) => {
		if (net === 'AMEX') return t('cn_card_amex')
		if (net === 'MASTERCARD') return t('cn_card_mastercard')
		if (net === 'VISA') return t('cn_card_visa')
		return net
	}

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
