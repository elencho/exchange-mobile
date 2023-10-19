import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Background from '@app/components/Background'
import TopRow from '@app/components/TransactionHistory/TopRow'
import { clearFiltersTrade } from '@app/redux/trade/actions'
import {
	chooseCurrency,
	clearFilters,
	setActiveTab,
} from '@app/redux/transactions/actions'
import SearchAndFilter from '@app/refactor/screens/transactions/components/SearchAndFilter'
import TabSwitcher from '@app/refactor/screens/transactions/components/TabSwitcher'
import TransactionModal from '@app/refactor/screens/transactions/components/TransactionModal'
import TradeList from './components/TradeList'
import TransactionList from './components/TransactionList'

function TransactionHistory({ navigation }) {
	const isFocused = useIsFocused()
	const dispatch = useDispatch()

	const {
		transactions: { currency, activeTab },
	} = useSelector((state) => state)

	const clearAllFilters = () => {
		dispatch(clearFiltersTrade())
		dispatch(clearFilters())
		dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' })
		dispatch(setActiveTab('Transfer'))
		Keyboard.dismiss()
	}

	useFocusEffect(
		useCallback(() => {
			dispatch(chooseCurrency(currency))
		}, [currency])
	)

	useEffect(() => {
		dispatch(chooseCurrency('Show All Currency'))
		dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' })
		Keyboard.dismiss()
	}, [navigation])

	useEffect(() => {
		return () => clearAllFilters()
	}, [])

	useEffect(() => {
		return () => {
			dispatch(clearFiltersTrade())
			dispatch(clearFilters())
			dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' })
			dispatch(setActiveTab('Transfer'))
			Keyboard.dismiss()
		}
	}, [])

	return (
		<Background>
			<TopRow clear={clearAllFilters} />
			<TabSwitcher />
			<SearchAndFilter
				navigation={navigation}
				isInstantTrade={activeTab === 'Instant trade'}
			/>

			{activeTab === 'Transfer' ? <TransactionList /> : <TradeList />}

			{isFocused && <TransactionModal transactions />}
		</Background>
	)
}

export default TransactionHistory
