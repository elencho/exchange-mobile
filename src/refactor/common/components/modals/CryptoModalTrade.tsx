import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppModal from '@app/refactor/common/components/modal'
import ModalWithSearch from '@app/components/ModalWithSearch'
import {
	setCryptoCodeQuery,
	setTradesOffset,
} from '@app/refactor/redux/trade/tradeSlice'
import { setCryptoFilter } from '@app/refactor/redux/transactions/transactionSlice'
import { RootState } from '@app/refactor/redux/rootReducer'

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
		trade: { offers, fiat, tradeType },
		transactions: { cryptoFilter: cryptoCodeTransactions },
	} = state

	const [filteredData, setFiletredData] = useState(offers?.[fiat])

	const arrayToPass =
		filteredData?.length > 0 ? [...filteredData] : offers?.[fiat]

	useEffect(() => {
		offers && setFiletredData(offers[fiat])
	}, [])

	const filter = (text: string) => setCryptoFilterText(text.toLowerCase())

	useEffect(() => {
		const filteredArray = offers?.[fiat]?.filter(
			(c) =>
				(c?.pair?.baseCurrencyName &&
					c?.pair?.baseCurrencyName.toLowerCase().includes(cryptoFilterText)) ||
				(c?.pair?.baseCurrency &&
					c?.pair?.baseCurrency.toLowerCase().includes(cryptoFilterText))
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
