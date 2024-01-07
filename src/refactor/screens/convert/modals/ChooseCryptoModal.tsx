import AppModal from '@components/modal'
import AppText from '@components/text'
import AppInput from '@components/input/index'
import Search from '@assets/images/Search.svg'
import SearchActive from '@assets/images/Search_Active.svg'
import { Theme, useTheme } from '@theme/index'
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'

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

	const [search, setSearch] = useState<string>('')
	const [filteredCoins, setFilteredCoins] = useState<Coin[]>([])

	useEffect(() => {
		const searchLower = search.toLowerCase()
		const coins =
			searchLower.trim().length === 0
				? cryptos
				: cryptos.filter((coin) =>
						coin.name.toLowerCase().includes(searchLower)
				  )
		setFilteredCoins(coins)
	}, [search])

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

	const renderCoin = (item: Coin) => {
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
						{item.name}
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
				<AppInput
					style={styles.searchInput}
					placeholder="Search currency"
					rightComponent={<Search />}
					onFocusRightComponent={<SearchActive />}
					value={search}
					onChangeText={(text: string) => setSearch(text)}
					handleClear={() => setSearch('')}
				/>
				<FlatList
					style={styles.listContainer}
					data={filteredCoins}
					keyExtractor={(item) => item.displayCcy}
					renderItem={(coin) => renderCoin(coin.item)}
					showsVerticalScrollIndicator={false}
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
		listContainer: {
			marginTop: 30,
		},
		searchInput: {
			marginTop: -20,
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
