import AppModal from '@components/modal'
import AppText from '@components/text'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { Theme, useTheme } from '@theme/index'
import { Image, Pressable, StyleSheet, View } from 'react-native'

interface Props {
	visible: boolean
	cryptos: Coin[]
	onCoinSelected: (crypto: Coin) => void
	dismiss: () => void
}

const ChooseCryptoModal = ({
	visible,
	cryptos,
	onCoinSelected,
	dismiss,
}: Props) => {
	const { styles, theme } = useTheme(_styles)

	const CoinItemInfo = ({ desc, value }: { desc: string; value: string }) => {
		return (
			<View style={styles.coinInfoContainer}>
				<AppText variant="l" style={styles.coinInfoDesc}>
					{desc}
				</AppText>
				<AppText variant="l" style={styles.coinInfoValue}>
					{value}
				</AppText>
			</View>
		)
	}

	const coinItem = ({ item }: ListRenderItemInfo<Coin>) => {
		return (
			<Pressable
				key={item.ccy}
				style={styles.rowContainer}
				onPress={() => {
					onCoinSelected(item)
					dismiss()
				}}>
				<Image
					style={{ width: 34, height: 34, marginLeft: 6 }}
					source={{
						uri: item.iconPngUrl,
					}}
				/>
				<View style={styles.infoContainer}>
					<AppText variant="title" style={styles.ccyText}>
						{item.displayCcy}
					</AppText>
					<CoinItemInfo
						desc="Balance :"
						value={item.balance + ' ' + item.displayCcy}
					/>
					<CoinItemInfo
						desc="Market price:"
						value={item.balance + ' ' + item.displayCcy}
					/>
				</View>
			</Pressable>
		)
	}

	const children = () => {
		return (
			<View style={styles.container}>
				<FlashList
					data={cryptos}
					keyExtractor={(item) => item.ccy}
					renderItem={coinItem}
					scrollEventThrottle={1000}
					estimatedItemSize={100}
				/>
			</View>
		)
	}

	return (
		<AppModal
			title="Choose Coin"
			hide={dismiss}
			visible={visible}
			children={children()}
			fullScreen
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			marginTop: 20,
		},
		rowContainer: {
			flexDirection: 'row',
			marginBottom: 30,
		},
		ccyText: {
			color: theme.color.textThird,
		},
		infoContainer: {
			marginLeft: 14,
		},
		coinInfoContainer: {
			marginTop: 4,
			width: 330, //TODO
			justifyContent: 'space-between',
			flexDirection: 'row',
		},
		coinInfoDesc: {
			color: theme.color.textSecondary,
		},
		coinInfoValue: {
			color: theme.color.textSecondary,
			alignSelf: 'flex-end',
		},
	})

export default ChooseCryptoModal
