import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef } from 'react'
import { Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Background from '@app/components/Background'
import TopRow from '@app/components/TransactionHistory/TopRow'
import TransactionModal from '@app/components/TransactionHistory/TransactionModal'
import { clearFiltersTrade } from '@app/redux/trade/actions'
import {
	chooseCurrency,
	clearFilters,
	setActiveTab,
} from '@app/redux/transactions/actions'
import SearchAndFilter from '@app/refactor/screens/transactions/components/SearchAndFilter'
import TabSwitcher from '@app/refactor/screens/transactions/components/TabSwitcher'
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

	//Loader for Convert
	const numOfRender = useRef(0)
	useEffect(() => {
		numOfRender.current++
	}, [activeTab])

	return (
		<Background>
			<TopRow clear={clearAllFilters} />
			<TabSwitcher />
			<SearchAndFilter
				navigation={navigation}
				isInstantTrade={activeTab === 'Instant trade'}
			/>

			{activeTab === 'Transfer' ? (
				<TransactionList />
			) : (
				<TradeList isFirstRender={numOfRender.current === 1} />
			)}

			{isFocused && <TransactionModal transactions />}
		</Background>
	)
}

export default TransactionHistory

// const styles = StyleSheet.create({
// 	empty: {
// 		flex: 1,
// 		marginTop: '35%',
// 		alignItems: 'center',
// 	},
// 	loader: {
// 		flex: 1,
// 	},
// 	transactions: {
// 		flex: 1,
// 		marginTop: 30,
// 	},
// 	filter: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'space-between',
// 	},
// 	subtext: {
// 		color: colors.SECONDARY_TEXT,
// 		marginTop: 17,
// 	},
// })
