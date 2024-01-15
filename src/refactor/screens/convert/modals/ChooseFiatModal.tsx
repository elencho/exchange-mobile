import AppModal from '@components/modal'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { Image, Pressable, StyleSheet, View } from 'react-native'

interface Props {
	visible: boolean
	fiats: Coin[]
	onCoinSelected: (fiat: Coin) => void
	dismiss: () => void
}

const ChooseFiatModal = ({
	visible,
	fiats,
	onCoinSelected,
	dismiss,
}: Props) => {
	const { styles, theme } = useTheme(_styles)

	const children = () => {
		return (
			<View style={styles.container}>
				{fiats.map((coin: Coin) => (
					<Pressable
						key={coin.ccy}
						style={styles.rowContainer}
						onPress={() => {
							onCoinSelected(coin)
						}}>
						<Image
							style={{ width: 34, height: 34, marginLeft: 6 }}
							source={{
								uri: coin.iconPngUrl,
							}}
						/>
						<View style={styles.infoContainer}>
							<AppText variant="title" style={styles.ccyText}>
								{coin.displayCcy}
							</AppText>
							{/* TODO: Ask elene why : doesn't work */}
							<AppText variant="l" style={styles.balanceText}>
								Balance :
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
			flexDirection: 'row',
			marginBottom: 30,
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
