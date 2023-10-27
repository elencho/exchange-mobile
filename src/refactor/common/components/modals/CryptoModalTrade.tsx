import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppModal from '@app/components/AppModal'
import ModalWithSearch from '@app/components/ModalWithSearch'
import { toggleCryptoModal } from '@app/refactor/redux/modals/modalsSlice'
import {
	setCryptoCodeQuery,
	setTradesOffset,
} from '@app/refactor/redux/trade/tradeSlice'
import { setCryptoFilter } from '@app/refactor/redux/transactions/transactionSlice'
import useTrades from '@app/refactor/screens/transactions/hooks/useTrades'

interface Props {
	isInstantTrade: boolean
}

export default function CryptoModalTrade({ isInstantTrade }: Props) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const { fetchTrades, setTrades } = useTrades()

	const {
		modalState: { cryptoModalVisible },
		trades: { cryptoCodeQuery },
		trade: { offers, fiat, tradeType },
		transactions: { cryptoFilter: cryptoCodeTransactions },
	} = state

	const [filteredData, setFiletredData] = useState(offers?.[fiat])
	const arrayToPass =
		filteredData?.length > 0 ? [...filteredData] : offers?.[fiat]

	useEffect(() => {
		// dispatch(instantTradeTabAction())
		offers && setFiletredData(offers[fiat])
	}, [])
	useEffect(() => {
		filter('')
	}, [cryptoModalVisible])

	const filter = (text) => {
		const filteredArray = offers?.[fiat]?.filter(
			(c) =>
				(c?.pair?.baseCurrencyName &&
					c?.pair?.baseCurrencyName
						.toLowerCase()
						.includes(text.toLowerCase())) ||
				(c?.pair?.baseCurrency &&
					c?.pair?.baseCurrency.toLowerCase().includes(text.toLowerCase()))
		)
		setFiletredData(filteredArray)
	}

	const hide = () => dispatch(toggleCryptoModal(false))
	const onModalHide = () => {}

	const choose = (code) => {
		dispatch(isInstantTrade ? setCryptoCodeQuery(code) : setCryptoFilter(code))
		if (isInstantTrade) dispatch(setTradesOffset(0))
		setTrades([])
		fetchTrades()
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
		/>
	)

	return (
		filteredData && (
			<AppModal
				visible={cryptoModalVisible}
				hide={hide}
				children={children}
				onModalHide={onModalHide}
				fullScreen
			/>
		)
	)
}
