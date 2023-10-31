import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CryptoModalTrade from '@components/modals/CryptoModalTrade'
import Search from '@assets/images/Search.svg'
import AppDropdown from '@app/components/AppDropdown'
import AppInput from '@app/components/AppInput'
import { COINS_URL_PNG } from '@app/constants/api'
import colors from '@app/constants/colors'
import {
	toggleCryptoModal,
	toggleTransactionFiltersModal,
} from '@app/refactor/redux/modals/modalsSlice'

import {
	setCryptoCodeQuery,
	setTrades,
} from '@app/refactor/redux/trade/tradeSlice'
import {
	setTransactionsOffset,
	setTransactionsSearch,
} from '@app/refactor/redux/transactions/transactionSlice'
import DownloadIcon from '@app/refactor/screens/transactions/components/DownloadIcon'
import FilterIcon from '@app/refactor/screens/transactions/components/FilterIcon'
import TransactionFilter from '../TransactionFilter'
import { RootState } from '@app/refactor/redux/rootReducer'

const SearchAndFilter = ({ isInstantTrade }) => {
	const dispatch = useDispatch()
	const {
		trades: { cryptoCodeQuery },
		transactions: { cryptoCodeTransactions, txIdOrRecipient },
		modalState: { transactionFiltersModalVisible },
	} = useSelector((state: RootState) => state)

	const [searchValue, setSearchValue] = useState('')
	const openCryptoModal = () => dispatch(toggleCryptoModal(true))
	const seperateCurrencyName = (currency) => currency.split('(')[0]
	const clearCurrencyDropdown = () => {
		dispatch(setCryptoCodeQuery(null))
		dispatch(setTrades([]))
	}

	//debounce
	useEffect(() => {
		const getSearchedData = setTimeout(() => {
			dispatch(setTransactionsOffset(0))
			dispatch(setTransactionsSearch(searchValue))
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
					handlePress={openCryptoModal}
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
					dispatch(toggleTransactionFiltersModal(true))
					Keyboard.dismiss()
				}}
			/>
			<DownloadIcon isInstantTrade={isInstantTrade} />
			<CryptoModalTrade isInstantTrade={isInstantTrade} />
			<TransactionFilter
				isOpen={transactionFiltersModalVisible}
				handleClose={() => dispatch(toggleTransactionFiltersModal(false))}
				isInstantTrade={isInstantTrade}
			/>
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
