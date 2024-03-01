import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { Image, StyleSheet, View } from 'react-native'
import ArrowRight from '@assets/images/Arrow_Right.svg'
import { hexOpacityPct } from '@app/refactor/screens/convert/util'
import { t } from 'i18next'

type Props = {
	pair: CoinPair
	tradeType: TradeType
}

const ConfirmCard = ({ pair, tradeType }: Props) => {
	const { styles } = useTheme(_styles)

	const CoinRow = () => {
		const iconStyle = { width: 40, height: 40 }
		const arrowStyle = { marginHorizontal: 10 }
		const fiatImage = (
			<Image
				style={iconStyle}
				source={{
					uri: pair.fiat.iconPngUrl,
				}}
			/>
		)
		const cryptoImage = (
			<Image
				style={iconStyle}
				source={{
					uri: pair.crypto.iconPngUrl,
				}}
			/>
		)

		return (
			<View style={styles.coinsContainer}>
				{tradeType === 'Buy' ? fiatImage : cryptoImage}
				<ArrowRight style={arrowStyle} />
				{tradeType === 'Sell' ? fiatImage : cryptoImage}
			</View>
		)
	}

	const baseCcy =
		tradeType === 'Buy' ? pair.fiat.displayCcy : pair.crypto.displayCcy
	const quoteCcy =
		tradeType === 'Sell' ? pair.fiat.displayCcy : pair.crypto.displayCcy

	return (
		<View style={styles.container}>
			<CoinRow />
			<AppText variant="title" style={styles.ccyText}>
				{baseCcy + ' to ' + quoteCcy}
			</AppText>
			<AppText variant="title" style={styles.confirmText}>
				cn_confirm_card_desc
			</AppText>
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			marginTop: 12,
			alignItems: 'center',
			backgroundColor: '#24243D',
			paddingVertical: 34,
			borderRadius: 6,
		},
		coinsContainer: {
			justifyContent: 'center',
			flexDirection: 'row',
			alignItems: 'center',
		},
		ccyText: {
			color: hexOpacityPct(theme.color.textThird, 60),
			marginTop: 15,
			marginBottom: 6,
		},
		confirmText: {
			color: theme.color.textThird,
		},
	})

export default ConfirmCard
