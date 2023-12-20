import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StyleSheet, View, Image, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CryptoModalTrade from '@components/modals/CryptoModalTrade'
import Search from '@assets/images/Search.svg'
import AppDropdown from '@app/components/AppDropdown'
import AppInput from '@app/refactor/common/components/input'
import { COINS_URL_PNG } from '@app/constants/api'
import colors from '@app/constants/colors'
import { setCryptoCodeQuery } from '@app/refactor/redux/trade/tradeSlice'
import {
	setTransactionsOffset,
	setTransactionsSearch,
} from '@app/refactor/redux/transactions/transactionSlice'
import DownloadIcon from '@app/refactor/screens/transactions/components/FilterComponents/DownloadIcon'
import FilterIcon from '@app/refactor/screens/transactions/components/FilterComponents/FilterIcon'
import TransactionFilter from '../../transactions_filter'
import { RootState } from '@app/refactor/redux/rootReducer'
import { FilterState } from '../../transactions_history'

interface Props {
	isInstantTrade: boolean
	isFilterVisible: FilterState
	setIsFilterVisible: Dispatch<SetStateAction<FilterState>>
}

const SearchAndFilter: React.FC<Props> = ({
	isInstantTrade,
	isFilterVisible,
	setIsFilterVisible,
}) => {
	const dispatch = useDispatch()
	const {
		trades: { cryptoCodeQuery },
		transactions: { cryptoFilter: cryptoCodeTransactions, txIdOrRecipient },
	} = useSelector((state: RootState) => state)

	const [searchValue, setSearchValue] = useState('')
	const [isCryptoModalVisible, setIsCryptoModalVisible] = useState(false)
	const [cryptoFilterText, setCryptoFilterText] = useState('')

	const openCryptoModal = () => setIsCryptoModalVisible(true)
	const seperateCurrencyName = (currency: string) => currency.split('(')[0]
	const clearCurrencyDropdown = () => {
		dispatch(setCryptoCodeQuery(null))
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
						cryptoCode &&
						cryptoCode?.length > 0 &&
						seperateCurrencyName(cryptoCode)
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
					activeLabel={undefined}
					notClearable={undefined}
					error={undefined}
					disabled={undefined}
					hideArrow={undefined}
					noTranslate={undefined}
					isOneMethod={undefined}
				/>
			) : (
				<AppInput
					style={styles.searchInput}
					placeholder="Search by TXID"
					rightComponent={<Search />}
					value={searchValue}
					onChangeText={(text: string) => setSearchValue(text)}
					handleClear={() => {
						setSearchValue('')
					}}
				/>
			)}

			<FilterIcon
				isInstantTrade={isInstantTrade}
				onPress={() => {
					setIsFilterVisible({ isVisible: true, shouldFilter: false })
					Keyboard.dismiss()
				}}
			/>
			<DownloadIcon isInstantTrade={isInstantTrade} />
			<CryptoModalTrade
				isInstantTrade={isInstantTrade}
				isCryptoModalVisible={isCryptoModalVisible}
				setIsCryptoModalVisible={setIsCryptoModalVisible}
				cryptoFilterText={cryptoFilterText}
				setCryptoFilterText={setCryptoFilterText}
			/>
			<TransactionFilter
				isOpen={isFilterVisible.isVisible}
				setIsFilterVisible={setIsFilterVisible}
				isInstantTrade={isInstantTrade}
				// isCryptoModalVisible={isCryptoModalVisible}
				// setIsCryptoModalVisible={setIsCryptoModalVisible}
				// cryptoFilterText={cryptoFilterText}
				// setCryptoFilterText={setCryptoFilterText}
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
