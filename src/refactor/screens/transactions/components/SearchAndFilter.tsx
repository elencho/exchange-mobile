import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ChooseCurrencyModal from '@components/modals/ChooseCurrencyModal'
import CryptoModalTrade from '@components/modals/CryptoModalTrade'
import Search from '@app/assets/images/Search'
import AppDropdown from '@app/components/AppDropdown'
import AppInput from '@app/components/AppInput'
import { COINS_URL_PNG } from '@app/constants/api'
import colors from '@app/constants/colors'
import { toggleCryptoModal } from '@app/redux/modals/actions'
import {
	setCryptoCodeQuery,
	setTrades,
} from '@app/refactor/redux/trade/tradeSlice'
import { fetchTradesThunk } from '@app/refactor/redux/trade/tradeThunks'
import {
	setTransactions,
	setTransactionsOffset,
	setTransactionsSearch,
} from '@app/refactor/redux/transactions/transactionSlice'
import { fetchTransactionsThunk } from '@app/refactor/redux/transactions/transactionThunks'
import DownloadIcon from '@app/refactor/screens/transactions/components/DownloadIcon'
import FilterIcon from '@app/refactor/screens/transactions/components/FilterIcon'

const SearchAndFilter = ({ isInstantTrade, navigation }) => {
	const dispatch = useDispatch()
	const { cryptoCodeQuery } = useSelector((state) => state.trades)
	const { cryptoCodeTransactions, txIdOrRecipient } = useSelector(
		(state) => state.transactions
	)
	const [searchValue, setSearchValue] = useState('')
	const openModal = () => dispatch(toggleCryptoModal(true))
	const seperateCurrencyName = (currency) => currency.split('(')[0]
	const clearCurrencyDropdown = () => {
		dispatch(setCryptoCodeQuery(null))
		dispatch(setTrades([]))
		dispatch(fetchTradesThunk())
	}

	//debounce
	useEffect(() => {
		const getSearchedData = setTimeout(() => {
			dispatch(setTransactionsOffset(0))
			dispatch(setTransactions([]))
			dispatch(setTransactionsSearch(searchValue))
			dispatch(fetchTransactionsThunk())
		}, 1000)

		return () => clearTimeout(getSearchedData)
	}, [searchValue])

	useEffect(() => {
		if (!txIdOrRecipient) setSearchValue('')
	}, [txIdOrRecipient])

	const cryptoCode = isInstantTrade ? cryptoCodeQuery : cryptoCodeTransactions
	return (
		<View style={styles.container}>
			{isInstantTrade ? (
				<AppDropdown
					handlePress={openModal}
					handleClear={clearCurrencyDropdown}
					style={styles.dropdown}
					selectedText={
						cryptoCode?.length > 0 && seperateCurrencyName(cryptoCode)
					}
					label="Choose Crypto"
					icon={
						cryptoCode &&
						cryptoCode !== 'Show all currency' && (
							<Image
								source={{
									uri: `${COINS_URL_PNG}/${cryptoCode?.toLowerCase()}.png`,
								}}
								style={styles.coin}
							/>
						)
					}
				/>
			) : (
				<AppInput
					style={styles.searchInput}
					placeholder="Search by TXID"
					right={<Search />}
					value={searchValue}
					isSearch
					onChangeText={(text) => setSearchValue(text)}
					labelBackgroundColor={colors.PRIMARY_BACKGROUND}
					handleClear={() => {
						setSearchValue('')
					}}
				/>
			)}

			<FilterIcon
				isInstantTrade={isInstantTrade}
				onPress={() => {
					navigation.navigate('TransactionFilter', { isInstantTrade })
					Keyboard.dismiss()
				}}
			/>
			<DownloadIcon />
			<ChooseCurrencyModal isForTransactions />
			<CryptoModalTrade />
		</View>
	)
}

export default SearchAndFilter

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	dropdown: {
		marginTop: 10,
		flex: 1,
	},
	searchInput: {
		flex: 1,
	},
	dropdownText: {
		color: colors.PRIMARY_TEXT,
		flex: 1,
	},
	coin: {
		width: 24,
		height: 24,
	},
})
