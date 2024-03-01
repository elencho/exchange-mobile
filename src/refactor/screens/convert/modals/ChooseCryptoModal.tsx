import AppModal from '@components/modal'
import AppText from '@components/text'
import AppInput from '@components/input/index'
import Search from '@assets/images/Search.svg'
import SearchActive from '@assets/images/Search_Active.svg'
import { Theme, useTheme } from '@theme/index'
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { hexOpacityPct } from '@app/refactor/screens/convert/util'
import { t } from 'i18next'

interface Props {
	visible: boolean
	cryptos: Coin[]
	pair: CoinPair | undefined
	tradeType: TradeType
	onCoinSelected: (crypto: Coin) => void
	dismiss: () => void
}

const ChooseCryptoModal = ({
	visible,
	cryptos,
	pair,
	tradeType,
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
				: cryptos.filter(
						(coin) =>
							coin.name.toLowerCase().includes(searchLower) ||
							coin.displayCcy.toLowerCase().includes(searchLower)
				  )
		setFilteredCoins(coins)
	}, [search, cryptos])

	useEffect(() => {
		setTimeout(() => {
			setSearch('')
		}, 500)
	}, [visible])

	const CoinItemInfo = ({ desc, value }: { desc: string; value: string }) => {
		return (
			<View style={styles.coinInfoContainer}>
				<AppText variant="l" style={styles.coinInfoDesc}>
					{desc}
				</AppText>
				<View style={{ flex: 1 }} />
				<AppText variant="l" style={styles.coinInfoValue}>
					{value}
				</AppText>
			</View>
		)
	}

	const renderCoin = (item: Coin) => {
		const coinBackgroundColor = () => {
			return item.displayCcy === pair?.crypto.displayCcy
				? hexOpacityPct(theme.color.textSecondary, 18)
				: 'transparent'
		}

		const formatMarketPrice = () => {
			const price =
				tradeType === 'Buy' ? item.marketPrice?.buy : item.marketPrice?.sell
			return price + ' ' + pair?.fiat.displayCcy
		}

		return (
			<Pressable
				key={item.ccy}
				style={[
					styles.rowContainer,
					{ backgroundColor: coinBackgroundColor() },
				]}
				onPress={() => {
					onCoinSelected(item)
					dismiss()
				}}>
				<Image
					style={{ width: 34, height: 34 }}
					source={{
						uri: item.iconPngUrl,
					}}
				/>
				<View style={styles.infoContainer}>
					<AppText variant="title" style={styles.ccyText}>
						{item.name}
					</AppText>
					<CoinItemInfo
						desc="cn_balance"
						value={item.balance + ' ' + item.displayCcy}
					/>
					<CoinItemInfo desc="cn_market_price" value={formatMarketPrice()} />
				</View>
			</Pressable>
		)
	}

	const children = () => {
		return (
			<View style={styles.container}>
				<AppInput
					style={styles.searchInput}
					placeholder={t('cn_choose_coin_search_ph').toString()}
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
					initialNumToRender={50}
				/>
			</View>
		)
	}

	return (
		<AppModal
			title="cn_choose_coin_title"
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
			marginTop: 15,
			margin: -10,
		},
		searchInput: {
			marginTop: -20,
		},
		rowContainer: {
			flexDirection: 'row',
			paddingHorizontal: 10,
			paddingVertical: 12,
			borderRadius: 6,
		},
		ccyText: {
			color: theme.color.textThird,
		},
		infoContainer: {
			flex: 1,
			marginLeft: 14,
		},
		coinInfoContainer: {
			marginTop: 4,
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
