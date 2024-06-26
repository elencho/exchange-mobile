import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Image, StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import ChooseCurrencyModal from '@app/refactor/common/components/modals/ChooseCurrencyModal'
import DatePickerModal from '@app/refactor/common/components/modals/DatePickerModal/DatePickerModal'
import ChooseMethodsModal from '@app/refactor/common/components/modals/ChooseMethodsModal'
import AppDropdown from '@app/components/AppDropdown'
import AppText from '@app/refactor/common/components/text'
import Headline from '@app/components/TransactionHistory/Headline'
import { COINS_URL_PNG } from '@app/constants/api'
import colors from '@app/constants/colors'
import {
	types,
	statuses,
	currencies,
	transactionTypes,
} from '@app/constants/filters'
import { toggleMethodsModal } from '@app/refactor/redux/modals/modalsSlice'
import CryptoModalTrade from '@app/refactor/common/components/modals/CryptoModalTrade'
import {
	setPreviousTradeFilter,
	setCryptoCodeQuery,
} from '@app/refactor/redux/trade/tradeSlice'
import {
	setCryptoFilter,
	setMethodFilter,
	setPreviousTransactionsFilter,
} from '@app/refactor/redux/transactions/transactionSlice'
import AppModal from '@app/refactor/common/components/modal'
import { RootState } from '../../../redux/rootReducer'
import {
	TransactionFilterBottom,
	FilterRow,
	DatePicker,
} from '@app/refactor/screens/transactions/components/FilterComponents'
import { FilterState } from '../transactions_history'

const WINDOW_HEIGHT = Dimensions.get('window').height

interface Props {
	isOpen: boolean
	isInstantTrade: boolean
	setIsFilterVisible: Dispatch<SetStateAction<FilterState>>
}

export default function TransactionFilter({
	isOpen,
	setIsFilterVisible,
	isInstantTrade,
}: Props) {
	const dispatch = useDispatch()
	const { top, bottom } = useSafeAreaInsets()

	const [prevFilterState, setPrevFilterState] = useState({})

	const {
		transactions: {
			cryptoFilter: cryptoTransactions,
			method: selectedMethod,
			typeFilter,
			fromDateTime,
			toDateTime,
			status,
		},
		trades: {
			fiatCodesQuery,
			statusQuery,
			cryptoCodeQuery,
			actionQuery,
			fromDateTimeQuery,
			toDateTimeQuery,
		},
		common: { currencyList },
	} = useSelector((state: RootState) => state)

	const initialStateTrade = {
		fiatCodesQuery,
		statusQuery,
		cryptoCodeQuery,
		actionQuery,
		fromDateTimeQuery,
		toDateTimeQuery,
	}
	const initialStateTransactions = {
		cryptoFilter: cryptoTransactions,
		method: selectedMethod,
		typeFilter,
		fromDateTime,
		toDateTime,
		status,
	}

	const savePrevFilters = async () => {
		isInstantTrade
			? dispatch(setPreviousTradeFilter(prevFilterState))
			: dispatch(setPreviousTransactionsFilter(prevFilterState))
	}

	const seperateCurrencyName = (currency: string) => currency.split('(')[0]
	const onClosePressed = () => {
		savePrevFilters()
		setIsFilterVisible({ isVisible: false, shouldFilter: false })
	}

	const [isCurrencyModalVisible, setIsCurrencyModalVisible] = useState(false)
	const [currencyFilterText, setCurrencyFilterText] = useState('')

	const [isCryptoModalVisible, setIsCryptoModalVisible] = useState(false)
	const [cryptoFilterText, setCryptoFilterText] = useState('')

	const openModal = () =>
		isInstantTrade
			? setIsCryptoModalVisible(true)
			: setIsCurrencyModalVisible(true)
	const handleMethodsDropdown = () => dispatch(toggleMethodsModal(true))
	const clearMethodsDropdown = () => dispatch(setMethodFilter('None'))
	const clearCurrencyDropdown = () =>
		isInstantTrade
			? dispatch(setCryptoCodeQuery(null))
			: dispatch(setCryptoFilter(null))

	const selectedCrypto = isInstantTrade ? cryptoCodeQuery : cryptoTransactions
	const selectedCryptoDisplayCode = currencyList.filter(
		(i) => i.code === selectedCrypto
	)?.[0]?.displayCode

	useEffect(() => {
		isInstantTrade
			? setPrevFilterState(initialStateTrade)
			: setPrevFilterState(initialStateTransactions)
	}, [isInstantTrade, isOpen])

	const children = (
		<>
			<View style={styles.headingContainer}>
				<Headline title="Transaction Filter" />
			</View>
			<ScrollView
				style={styles.container}
				bounces={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					styles.contentContainer,
					{ minHeight: WINDOW_HEIGHT - bottom - top - 85 },
				]}>
				<View>
					{isInstantTrade ? (
						<View style={styles.marginBottom20}>
							<AppText style={styles.text}>Choose currency / Pair</AppText>
							<FilterRow array={currencies} filterType="currency" />
						</View>
					) : (
						<View style={styles.type}>
							<AppText style={styles.text}>Choose Type:</AppText>
							<FilterRow array={types} filterType="type" />
						</View>
					)}

					<AppDropdown
						selectedText={
							selectedCrypto &&
							selectedCrypto?.length > 0 &&
							seperateCurrencyName(selectedCryptoDisplayCode)
						}
						label={isInstantTrade ? 'Choose Crypto' : 'Choose Currency'}
						handleClear={clearCurrencyDropdown}
						icon={
							selectedCrypto &&
							selectedCrypto !== 'Show all currency' && (
								<Image
									source={{
										uri: `${COINS_URL_PNG}/${selectedCryptoDisplayCode?.toLowerCase()}.png`,
									}}
									style={styles.coin}
								/>
							)
						}
						handlePress={openModal}
						style={!isInstantTrade && { marginVertical: 24 }}
						activeLabel={undefined}
						notClearable={undefined}
						error={undefined}
						disabled={undefined}
						hideArrow={undefined}
						noTranslate={undefined}
						isOneMethod={undefined}
					/>

					{isInstantTrade && (
						<View style={styles.marginBottom30}>
							<AppText style={styles.text}>Transaction Type:</AppText>
							<FilterRow array={transactionTypes} filterType="tradeAction" />
						</View>
					)}

					<DatePicker from isInstantTrade={isInstantTrade} />
					<DatePicker to isInstantTrade={isInstantTrade} />

					{!isInstantTrade && (
						<AppDropdown
							label="Choose Methods:"
							handlePress={handleMethodsDropdown}
							handleClear={clearMethodsDropdown}
							selectedText={selectedMethod === 'None' ? null : selectedMethod}
							style={undefined}
							icon={undefined}
							activeLabel={undefined}
							notClearable={undefined}
							error={undefined}
							disabled={undefined}
							hideArrow={undefined}
							noTranslate={undefined}
							isOneMethod={undefined}
						/>
					)}

					<AppText style={[styles.text, isInstantTrade && styles.status]}>
						Choose Status:
					</AppText>
					<FilterRow
						array={statuses}
						filterType={`status${isInstantTrade ? 'Trade' : 'Transaction'}`}
					/>
				</View>

				<View
					style={{
						marginTop: 50,
					}}>
					<TransactionFilterBottom
						handleClose={() => {
							setIsFilterVisible({ isVisible: false, shouldFilter: true })
						}}
						isInstantTrade={isInstantTrade}
					/>
				</View>
			</ScrollView>

			<CryptoModalTrade
				isInstantTrade={isInstantTrade}
				isCryptoModalVisible={isCryptoModalVisible}
				setIsCryptoModalVisible={setIsCryptoModalVisible}
				cryptoFilterText={cryptoFilterText}
				setCryptoFilterText={setCryptoFilterText}
			/>
			<ChooseCurrencyModal
				isForTransactions
				isCurrencyModalVisible={isCurrencyModalVisible}
				setIsCurrencyModalVisible={setIsCurrencyModalVisible}
				currencyFilterText={currencyFilterText}
				setCurrencyFilterText={setCurrencyFilterText}
			/>

			<DatePickerModal isInstantTrade={isInstantTrade} from />
			<DatePickerModal isInstantTrade={isInstantTrade} to />
			<ChooseMethodsModal />
		</>
	)

	return (
		<AppModal
			visible={isOpen}
			title=""
			hide={onClosePressed}
			children={children}
			fullScreen
			bottom={undefined}
			custom={undefined}
			onModalHide={undefined}
			onDismiss={undefined}
			modalStyle={undefined} // onModalHide={savePrevFilters}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
		marginTop: -44,
		paddingBottom: 140,
	},
	coin: {
		width: 24,
		height: 24,
	},
	purple: {
		fontSize: 15,
		lineHeight: 19,
		marginHorizontal: 5,
	},
	headingContainer: {
		backgroundColor: colors.PRIMARY_BACKGROUND,
		paddingBottom: 10,
		marginTop: -5,
		zIndex: 10,
	},
	marginBottom30: {
		marginBottom: 30,
	},
	marginBottom20: {
		marginVertical: 20,
	},
	text: {
		fontSize: 14,
		lineHeight: 17,
		color: '#c0c5e0',
		marginTop: 28,
		marginBottom: 12,
	},
	status: {
		marginTop: 6,
	},
	bigText: {
		color: colors.PRIMARY_TEXT,
		flex: 1,
	},
	closeButton: {
		marginTop: -40,
	},
	type: { marginTop: 20, marginBottom: 6 },
	heading: {
		color: colors.PRIMARY_TEXT,
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: 'space-between',
	},
})
