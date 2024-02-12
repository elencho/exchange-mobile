import { hexOpacityPct } from '@app/refactor/screens/convert/util'
import AppModal from '@components/modal'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { Image, Pressable, StyleSheet, View } from 'react-native'

interface Props {
	visible: boolean
	fiats: Coin[]
	chosenFiat: Coin
	onCoinSelected: (fiat: Coin) => void
	dismiss: () => void
}

const ChooseFiatModal = ({
	visible,
	chosenFiat,
	fiats,
	onCoinSelected,
	dismiss,
}: Props) => {
	const { styles, theme } = useTheme(_styles)

	const coinBackgroundColor = (coin: Coin) => {
		return coin.displayCcy === chosenFiat?.displayCcy
			? hexOpacityPct(theme.color.textSecondary, 18)
			: 'transparent'
	}

	const children = () => {
		return (
			<View style={styles.container}>
				{fiats.map((coin: Coin) => (
					<Pressable
						key={coin.ccy}
						style={[
							styles.rowContainer,
							{ backgroundColor: coinBackgroundColor(coin) },
						]}
						onPress={() => {
							onCoinSelected(coin)
						}}>
						<Image
							style={{ width: 34, height: 34 }}
							source={{
								uri: coin.iconPngUrl,
							}}
						/>
						<View style={styles.infoContainer}>
							<AppText variant="title" style={styles.ccyText}>
								{coin.displayCcy}
							</AppText>
							<AppText variant="l" style={styles.balanceText} noTranslate>
								Balance:
							</AppText>
						</View>

						<View style={{ flex: 1 }} />

						<AppText variant="l" style={styles.balanceAmountText}>
							{coin.balance + ' ' + coin.displayCcy}
						</AppText>
					</Pressable>
				))}
			</View>
		)
	}

	return (
		<AppModal
			title="Choose Coin"
			hide={dismiss}
			visible={visible}
			children={children()}
			bottom
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			marginTop: 20,
		},
		rowContainer: {
			borderRadius: 6,
			flexDirection: 'row',
			paddingHorizontal: 10,
			paddingVertical: 12,
		},
		infoContainer: {
			marginLeft: 14,
			justifyContent: 'space-between',
		},
		ccyText: {
			color: theme.color.textThird,
		},
		balanceText: {
			color: theme.color.textSecondary,
			alignSelf: 'flex-end',
		},
		balanceAmountText: {
			color: theme.color.textSecondary,
			alignSelf: 'flex-end',
		},
	})

export default ChooseFiatModal
