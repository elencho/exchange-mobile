import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'
import Background from '@app/components/Background'
import TopRow from '@app/components/TransactionHistory/TopRow'

import SearchAndFilter from '@app/refactor/screens/transactions/components/SearchAndFilter'
import TabSwitcher from '@app/refactor/screens/transactions/components/TabSwitcher'
import TransactionModal from '@app/refactor/screens/transactions/components/TransactionModal'
import TradeList from './components/TradeList'
import TransactionList from './components/TransactionList'
import { clearTransactionFilters } from '@app/refactor/redux/transactions/transactionSlice'
import { clearTradeFilters } from '@app/refactor/redux/trade/tradeSlice'

function TransactionHistory({ navigation }) {
	const isFocused = useIsFocused()
	const dispatch = useDispatch()

	const [activeTab, setActiveTab] = useState<TabName>('Transfer')
	const isInstantTrade = activeTab === 'Instant trade'

	const clearAllFilters = () => {
		dispatch(clearTransactionFilters())
		dispatch(clearTradeFilters())
		setTimeout(() => {
			setActiveTab('Transfer')
		}, 1000)
		Keyboard.dismiss()
	}

	useEffect(() => {
		return () => clearAllFilters()
	}, [])

	return (
		<Background>
			<TopRow clear={clearAllFilters} />
			<TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
			<SearchAndFilter
				navigation={navigation}
				isInstantTrade={isInstantTrade}
			/>

			{isInstantTrade ? (
				<TradeList isInstantTrade={isInstantTrade} />
			) : (
				<TransactionList isInstantTrade={isInstantTrade} />
			)}

			{isFocused && (
				<TransactionModal transactions isInstantTrade={isInstantTrade} />
			)}
		</Background>
	)
}

export default TransactionHistory
