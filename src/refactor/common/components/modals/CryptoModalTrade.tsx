import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppModal from '@app/refactor/common/components/modal'
import ModalWithSearch from '@components/modals/ModalWithSearch'
import {
	setCryptoCodeQuery,
	setTradesOffset,
} from '@app/refactor/redux/trade/tradeSlice'
import { setCryptoFilter } from '@app/refactor/redux/transactions/transactionSlice'
import { RootState } from '@app/refactor/redux/rootReducer'
import { fetchCurrencies } from '@app/utils/fetchTransactions'

interface Props {
	isInstantTrade: boolean
	isCryptoModalVisible: boolean
	setIsCryptoModalVisible: Dispatch<SetStateAction<boolean>>
	cryptoFilterText: string
	setCryptoFilterText: Dispatch<SetStateAction<string>>
}

export default function CryptoModalTrade({
	isInstantTrade,
	isCryptoModalVisible,
	setIsCryptoModalVisible,
	cryptoFilterText,
	setCryptoFilterText,
}: Props) {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)

	const {
		trades: { cryptoCodeQuery },
		trade: { tradeType },
		transactions: { cryptoFilter: cryptoCodeTransactions },
	} = state

	const [currencyList, setCurrencyList] = useState([])
	const [filteredData, setFiletredData] = useState(currencyList)

	const arrayToPass =
		filteredData?.length > 0 ? [...filteredData] : currencyList

	useEffect(() => {
		fetchCurrencies().then((res) => {
			setCurrencyList(res.filter((i) => i.type !== 'FIAT'))
		})
	}, [])

	const filter = (text: string) => setCryptoFilterText(text.toLowerCase())

	useEffect(() => {
		const filteredArray = currencyList?.filter(
			(c) =>
				c?.displayCode.toLowerCase().includes(cryptoFilterText) ||
				c?.displayName.toLowerCase().includes(cryptoFilterText)
		)
		setFiletredData(filteredArray)
	}, [cryptoFilterText])

	const hide = () => {
		setIsCryptoModalVisible(false)
		filter('')
	}

	const choose = (code) => {
		dispatch(isInstantTrade ? setCryptoCodeQuery(code) : setCryptoFilter(code))
		if (isInstantTrade) dispatch(setTradesOffset(0))
		hide()
	}

	const children = (
		<ModalWithSearch
			array={arrayToPass}
			choose={choose}
			filter={filter}
			currentItem={isInstantTrade ? cryptoCodeQuery : cryptoCodeTransactions}
			crypto
			tradeType={tradeType}
			title="Choose Currency"
			isForTransactions
			filterText={cryptoFilterText}
		/>
	)

	return (
		filteredData && (
			<AppModal
				visible={isCryptoModalVisible}
				hide={hide}
				children={children}
				delayedOpen
				fullScreen
			/>
		)
	)
}
