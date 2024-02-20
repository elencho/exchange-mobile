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
import { ScreenProp } from '@app/refactor/setup/nav/nav'

export interface FilterState {
	isVisible: boolean
	shouldFilter: boolean
}

function TransactionHistory({ navigation, route }: ScreenProp<'Transactions'>) {
	const dispatch = useDispatch()

	const [isFilterVisible, setIsFilterVisible] = useState<FilterState>({
		isVisible: false,
		shouldFilter: true,
	})

	const initialTab = route.params?.initialTab
	const [activeTab, setActiveTab] = useState<TabName>(initialTab || 'Transfer')
	const isInstantTrade = activeTab === 'Instant trade'

	const clearAllFilters = () => {
		setTimeout(() => {
			dispatch(clearTransactionFilters())
			dispatch(clearTradeFilters())
			setActiveTab('Transfer')
		}, 1000)
		setIsFilterVisible({ isVisible: false, shouldFilter: true })
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
		</Background>
	)
}

export default TransactionHistory
