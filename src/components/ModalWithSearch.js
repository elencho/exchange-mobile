import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import Search from '../assets/images/Search'
import SearchActive from '../assets/images/Search_Active'
import { COINS_URL_PNG, COUNTRIES_URL_PNG } from '../constants/api'
import colors from '../constants/colors'
import AppInput from './AppInput'
import AppText from './AppText'
import ModalSearchItem from './ModalSearchItem'
import WithKeyboard from './WithKeyboard'
import { t } from 'i18next'

export default function ModalWithSearch({
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
	filterText,
}) {
	const usdBtcSwitch = useSelector((state) => state.wallet.usdBtcSwitch)
	const handlePress = (name, code) => {
		crypto ? choose(code) : choose(name, code)
	}

	const uri = (code) => {
		return title === 'Choose Currency'
			? `${COINS_URL_PNG}/${code?.toLowerCase()}.png`
			: `${COUNTRIES_URL_PNG}/${code}.png`
	}

	const searchItem = ({ item }) => {
		const nameRegular = `${item?.available} ${item?.displayCurrencyCode}`

		const nameCountry =
			item?.name ||
			item?.pair?.baseCurrencyName ||
			(isForTransactions && `${item.currencyName} (${item.currencyCode})`) ||
			`${item?.available} ${item?.currencyCode}`

		const name = countryDrop || crypto ? nameCountry : nameRegular

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

		const displayCurrencyCode = item?.displayCurrencyCode

		return (
			<ModalSearchItem
				name={name}
				code={code}
				phoneCode={item?.phoneCode}
				currentItem={currentItem}
				canShowCode={
					(!wallet && !!item?.currencyCode?.length) ||
					isInstantTrade ||
					isForTransactions
				}
				onPress={() => handlePress(name, code)}
				uri={uri(wallet || crypto || countryDrop ? code : displayCurrencyCode)}
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
			<AppText header style={styles.headline}>
				{title}
			</AppText>

			<AppInput
				placeholder={t(title.replace('Choose', 'Search'))}
				placeholderTextColor="rgba(105, 111, 142, 0.5)"
				onChangeText={filter}
				right={<Search />}
				activeRight={<SearchActive />}
				style={styles.searchInput}
				value={filterText}
			/>

			<WithKeyboard padding flexGrow modal noRefresh>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '105%',
		marginLeft: -10,
		backgroundColor: colors.PRIMARY_BACKGROUND,
	},
	headline: {
		color: colors.PRIMARY_TEXT,
		marginBottom: -10,
		marginHorizontal: 10,
	},
	searchInput: {
		marginTop: 34,
		marginBottom: 18,
		marginHorizontal: 10,
	},
})
