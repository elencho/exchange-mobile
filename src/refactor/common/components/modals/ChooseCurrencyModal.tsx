import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppModal from '@app/components/AppModal'
import ModalWithSearch from '@app/components/ModalWithSearch'
import { toggleCurrencyModal } from '@app/redux/modals/actions'
import { setCurrentBalanceObj } from '@app/redux/trade/actions'
import {
	currencyAction,
	fetchCurrencies,
} from '@app/redux/transactions/actions'
import {
	cryptoAddressesAction,
	saveCryptoAddress,
	setNetwork,
	setWalletTab,
	wireDepositAction,
} from '@app/redux/wallet/actions'
import { setCryptoFilter } from '@app/refactor/redux/transactions/transactionSlice'

function ChooseCurrencyModal({ wallet = false, isForTransactions }) {
	const navigation = useNavigation()

	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		transactions: {
			currencies,
			currenciesConstant,
			cryptoFilter,
			currency,
			code,
		},
		modals: { chooseCurrencyModalVisible },
		trade: { balance, fiatsArray, currentBalanceObj },
		wallet: { walletTab },
	} = state

	const [filteredData, setFilteredData] = useState(balance?.balances)

	useEffect(() => {
		filter('')
		dispatch(fetchCurrencies())
	}, [chooseCurrencyModalVisible])

	const filter = (text) => {
		const filteredArray =
			balance?.balances?.filter(
				(c) =>
					c.currencyCode.toLowerCase().includes(text.toLowerCase()) ||
					c.currencyName.toLowerCase().includes(text.toLowerCase())
			) ?? []
		setFilteredData(filteredArray)
	}
	const hide = () => dispatch(toggleCurrencyModal(false))
	const onModalHide = () => dispatch(fetchCurrencies())

	const fiats = fiatsArray.map((f) => f.code)

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

		dispatch(setNetwork(null))
		let network
		const m = 'depositMethods'
		balance?.balances?.forEach((b) => {
			if (currencyCode === b.currencyCode) {
				if (b[m].WALLET) network = b[m].WALLET[0].provider
				dispatch(setCurrentBalanceObj(b))
			}
		})

		if (wallet) {
			if (fiats.includes(currencyCode)) {
				dispatch(wireDepositAction(name, currencyCode, navigation))
				dispatch(saveCryptoAddress({}))
			} else {
				dispatch(cryptoAddressesAction(name, currencyCode, navigation, network))
			}

			if (
				(walletTab === 'Manage Cards' && !fiats.includes(currencyCode)) ||
				(walletTab === 'Whitelist' && fiats.includes(currencyCode)) ||
				currentBalanceObj?.depositMethods?.ECOMMERCE
			) {
				dispatch(setWalletTab('Deposit'))
			}
		} else {
			dispatch(currencyAction(name, currenciesConstant, currencyCode))
		}
		dispatch({ type: 'GET_WHITELIST_ACTION' })
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
			wallet={wallet}
		/>
	)

	return (
		<AppModal
			visible={chooseCurrencyModalVisible}
			hide={hide}
			children={children}
			onModalHide={onModalHide}
			fullScreen
		/>
	)
}

export default ChooseCurrencyModal
