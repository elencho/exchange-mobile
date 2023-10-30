import { setTransactionsOffset } from '@app/refactor/redux/transactions/transactionSlice'
import { fetchTransactions as fetchTransactionsApi } from '@app/refactor/utils/transactionUtils'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const methodsMapping = {
	Ecommerce: ['ECOMMERCE'],
	Wire: ['WIRE'],
	'Crypto Transaction': ['WALLET', 'WALLET_INTERNAL'],
	Staking: ['STAKING'],
	B2C: ['B2C'],
	Transfer: ['TRANSFER'],
}

const useTransactions = () => {
	const [transactions, setTransactions] = useState([])
	const [transactionsLoading, setTransactionsLoading] = useState(false)
	const [totalTransactionsQty, setTotalTransactionsQty] = useState(0)

	const dispatch = useDispatch()
	const {
		typeFilter,
		method,
		status,
		cryptoFilter,
		fromDateTime,
		toDateTime,
		offset,
		txIdOrRecipient,
	} = useSelector((state: RootState) => state.transactions)

	const queryParams = {
		type: typeFilter?.length === 1 ? typeFilter[0] : null,
		methods: methodsMapping[method],
		statuses: status,
		currency: cryptoFilter?.length > 0 ? cryptoFilter : null,
		fromTime: fromDateTime,
		toTime: toDateTime,
		offset,
		limit: 10,
		txIdOrRecipient: txIdOrRecipient?.length > 0 ? txIdOrRecipient : null,
	}

	const fetchTransactions = async () => {
		setTransactionsLoading(true)

		try {
			const transactionsData = await fetchTransactionsApi({
				...queryParams,
				offset: 0,
			})
			const newTransactions = transactionsData?.data ?? []
			setTransactions([...newTransactions])
			setTotalTransactionsQty(transactionsData?.paging?.pageCount)

			console.log('fetch Transactions')
		} catch (error) {
			console.error('Error fetching transactions:', error)
		} finally {
			setTransactionsLoading(false)
		}
	}

	const refreshTransactions = async () => {
		setTransactionsLoading(true)

		try {
			console.log('refreshTransactions')
			dispatch(setTransactionsOffset(0))
			const transactionsData = await fetchTransactionsApi({
				...queryParams,
				offset: 0,
			})
			const newTransactions = transactionsData?.data
			setTransactions([...newTransactions])
		} catch (error) {
			console.error('Error refreshing transactions:', error)
		} finally {
			setTransactionsLoading(false)
		}
	}

	const reachScrollEnd = async () => {
		try {
			console.log('reachScrollEnd')

			if (transactions.length < totalTransactionsQty) {
				dispatch(setTransactionsOffset(offset + 1))
				queryParams.offset = offset + 1
				const transactionsData = await fetchTransactionsApi(queryParams)
				const newTransactions = transactionsData?.data ?? []

				setTransactions((prev) => [...prev, ...newTransactions])
			}
		} catch (error) {
			console.error('Error refreshing transactions:', error)
		}
	}

	return {
		transactions,
		transactionsLoading,
		fetchTransactions,
		reachScrollEnd,
		refreshTransactions,
		totalTransactionsQty,
	}
}

export default useTransactions
