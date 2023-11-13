import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'
import Background from '@app/refactor/common/components/background'
import TopRow from '@components/top_row'
import { clearTransactionFilters } from '@app/refactor/redux/transactions/transactionSlice'
import { clearTradeFilters } from '@app/refactor/redux/trade/tradeSlice'
import {
	TransactionList,
	TradeList,
	TabSwitcher,
	SearchAndFilter,
} from '@app/refactor/screens/transactions/components/ListComponents'
import { TransactionModal } from '@app/refactor/screens/transactions/components/FilterComponents'

export interface FilterState {
	isVisible: boolean
	shouldFilter: boolean
}

function TransactionHistory() {
	const isFocused = useIsFocused()
	const dispatch = useDispatch()

	const [isFilterVisible, setIsFilterVisible] = useState<FilterState>({
		isVisible: false,
		shouldFilter: true,
	})
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
			<TabSwitcher
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				setIsFilterVisible={setIsFilterVisible}
			/>
			<SearchAndFilter
				isInstantTrade={isInstantTrade}
				isFilterVisible={isFilterVisible}
				setIsFilterVisible={setIsFilterVisible}
			/>

			{isInstantTrade ? (
				<TradeList
					isInstantTrade={isInstantTrade}
					isFilterVisible={isFilterVisible}
				/>
			) : (
				<TransactionList
					isInstantTrade={isInstantTrade}
					isFilterVisible={isFilterVisible}
				/>
			)}

			{isFocused && (
				<TransactionModal transactions isInstantTrade={isInstantTrade} />
			)}
		</Background>
	)
}

export default TransactionHistory
