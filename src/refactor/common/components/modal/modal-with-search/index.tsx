import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import AppInput from '@components/input'
import AppText from '@components/text'
import Search from '@app/assets/images/Search.svg'
import SearchActive from '@app/assets/images/Search_Active.svg'
import WithKeyboard from '@app/components/WithKeyboard'
import { TradeTypesEnum } from '@app/refactor/types/enums'
import { ModalSearchItem } from '../modal-parts'
import { useModalWithSearch } from './use-modal-with-search'

interface ModalWIthSearchProps {
	array: any[]
	filter: (val: string) => void
	choose: (name?: string, code?: string) => void
	currentItem: any
	crypto: boolean
	title: string
	phoneCountry: string
	countryDrop: any
	citizenshipDrop: any
	tradeType: TradeTypesEnum.BUY | TradeTypesEnum.SELL
	isForTransactions: boolean
	wallet: boolean
}

export const ModalWithSearch = (props: ModalWIthSearchProps) => {
	const {
		array,
		filter,
		choose,
		currentItem,
		crypto = false,
		title,
		phoneCountry,
		countryDrop,
		citizenshipDrop,
		tradeType,
		isForTransactions,
		wallet,
	} = props

	const { getUri, handlePress, usdBtcSwitch } = useModalWithSearch({
		choose,
		crypto,
		title,
	})
	const { styles } = useTheme(_styles)
	// TODO: FIX ANY TYPE AFTER STATE
	const searchItem = ({ item }: any) => {
		const name =
			item?.name ||
			item?.pair?.baseCurrencyName ||
			(isForTransactions && `${item.currencyName} (${item.currencyCode})`) ||
			`${item?.available} ${item?.currencyCode}`

		const code = item?.code || item?.pair?.baseCurrency || item?.currencyCode
		const totalPrice = tradeType === 'Buy' ? item?.buyPrice : item?.sellPrice
		const currency = item?.pair?.quoteCurrency
		const isInstantTrade = item?.pair?.baseCurrency.length > 0

		const totalTradePrice =
			item?.pair?.baseCurrencyName && `${totalPrice} ${currency}`
		const totalAvailablePrice =
			item?.valueUSD && usdBtcSwitch === 'USD'
				? `Total: ${item?.total} ≈ ${item?.valueUSD} USD`
				: !item?.valueUSD
				? ''
				: `Total: ${item?.total} ≈ ${item?.valueBTC} BTC`

		return (
			<ModalSearchItem
				name={name}
				code={code}
				phoneCode={item?.phoneCode}
				currentItem={currentItem}
				canShowCode={
					(!wallet && !!item?.currencyCode?.length) || isInstantTrade
				}
				onPress={() => handlePress(name, code)}
				uri={getUri(code)}
				phoneCountry={phoneCountry}
				countryDrop={countryDrop}
				citizenshipDrop={citizenshipDrop}
				total={totalTradePrice || totalAvailablePrice}
				isForTransactions={isForTransactions}
			/>
		)
	}
	return (
		<View style={styles.container}>
			<AppText variant="l" style={styles.headline}>
				{title}
			</AppText>

			<AppInput
				placeholder={title.replace('Choose', 'Search')}
				placeholderTextColor="rgba(105, 111, 142, 0.5)"
				onChangeText={filter}
				rightComponent={<Search />}
				onFocusRightComponent={<SearchActive />}
				style={styles.searchInput}
			/>

			<WithKeyboard padding flexGrow modal>
				<FlashList
					data={array}
					renderItem={searchItem}
					keyExtractor={(item, index) =>
						item?.code + index ||
						item?.pair?.baseCurrency + index ||
						item?.currencyCode + index
					}
					scrollEventThrottle={1000}
					initialNumToRender={25}
					estimatedItemSize={50}
				/>
			</WithKeyboard>
		</View>
	)
}

export const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			width: '100%',
			backgroundColor: theme.color.backgroundPrimary,
		},
		headline: {
			color: theme.color.textPrimary,
			marginBottom: -10,
			marginHorizontal: 10,
		},
		searchInput: {
			marginVertical: 20,
			marginHorizontal: 10,
		},
		background: { backgroundColor: 'rgba(101, 130, 253, 0.1 )' },
	})
