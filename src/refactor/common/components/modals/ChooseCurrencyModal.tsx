import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppModal from '@app/refactor/common/components/modal'
import ModalWithSearch from '@components/modals/ModalWithSearch'
import { setCryptoFilter } from '@app/refactor/redux/transactions/transactionSlice'
import { fetchCurrencies } from '@app/utils/fetchTransactions'
import { RootState } from '@app/refactor/redux/rootReducer'
import { setCurrencyList } from '@store/redux/common/slice'

function ChooseCurrencyModal({
	isForTransactions,
	isCurrencyModalVisible,
	setIsCurrencyModalVisible,
	currencyFilterText,
	setCurrencyFilterText,
}) {
	const dispatch = useDispatch()

	const {
		transactions: { currenciesConstant, cryptoFilter, currency, code },
		common: { currencyList },
	} = useSelector((state: RootState) => state)

	const [filteredData, setFilteredData] = useState(currencyList)

	useEffect(() => {
		if (!currencyList?.length) {
			fetchCurrencies().then((res) =>
				dispatch(setCurrencyList(res as Currency[]))
			)
		}
	}, [])

	const filter = (text: string) => setCurrencyFilterText(text.toLowerCase())

	useEffect(() => {
		const filteredArray =
			currencyList?.filter(
				(currency) =>
					currency.displayCode?.toLowerCase()?.includes(currencyFilterText)
			) ?? []
		setFilteredData(filteredArray)
	}, [currencyFilterText])

	const hide = () => {
		setIsCurrencyModalVisible(false)
		filter('')
	}

	const choose = (name, currencyCode) => {
		if (isForTransactions) {
			dispatch(setCryptoFilter(currencyCode))
			hide()
			return
		}

		if (code === currencyCode) {
			hide()
			return
		}

		hide()
	}

	const children = (
		<ModalWithSearch
			array={filteredData}
			choose={choose}
			filter={filter}
			currentItem={isForTransactions ? cryptoFilter : currency}
			title="Choose Currency"
			isForTransactions={isForTransactions}
			filterText={currencyFilterText}
		/>
	)

	return (
		<AppModal
			visible={isCurrencyModalVisible}
			hide={hide}
			children={children}
			fullScreen
			delayedOpen
		/>
	)
}

export default ChooseCurrencyModal
