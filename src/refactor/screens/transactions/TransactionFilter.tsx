import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
	Image,
	StyleSheet,
	TouchableOpacity,
	View,
	ScrollView,
	Dimensions,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import ChooseCurrencyModal from '@components/modals/ChooseCurrencyModal'
import ChooseMethodsModal from '@components/modals/ChooseMethodsModal'
import DatePickerModal from '@components/modals/DatePickerModal/DatePickerModal'
import Close from '@app/assets/images/Close.svg'
import AppDropdown from '@app/components/AppDropdown'
import AppText from '@app/components/AppText'
import Background from '@app/components/Background'
import DatePicker from '@app/components/TransactionFilter/DatePicker'
import Headline from '@app/components/TransactionHistory/Headline'
import { COINS_URL_PNG } from '@app/constants/api'
import colors from '@app/constants/colors'
import {
	types,
	statuses,
	currencies,
	transactionTypes,
} from '@app/constants/filters'
import {
	toggleCryptoModal,
	toggleCurrencyModal,
	toggleMethodsModal,
} from '@app/redux/modals/actions'
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
import FilterRow from '@app/refactor/screens/transactions/components/FilterRow'
import TransactionFilterBottom from './components/TransactionFilterBottom'

const WINDOW_HEIGHT = Dimensions.get('window').height

export default function TransactionFilter({ navigation, route }) {
	const dispatch = useDispatch()
	const { top, bottom } = useSafeAreaInsets()
	const {
		params: { isInstantTrade },
	} = route
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
	} = useSelector((state) => state)

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

	const close = async () => {
		isInstantTrade
			? dispatch(setPreviousTradeFilter(prevFilterState))
			: dispatch(setPreviousTransactionsFilter(prevFilterState))
		navigation.navigate('Main', { screen: 'Transactions' })
	}

	const seperateCurrencyName = (currency) => currency.split('(')[0]

	const openModal = () =>
		isInstantTrade
			? dispatch(toggleCryptoModal(true))
			: dispatch(toggleCurrencyModal(true))
	const handleMethodsDropdown = () => dispatch(toggleMethodsModal(true))
	const clearMethodsDropdown = () => dispatch(setMethodFilter([]))
	const clearCurrencyDropdown = () =>
		isInstantTrade
			? dispatch(setCryptoCodeQuery(null))
			: dispatch(setCryptoFilter(null))

	const selectedCrypto = isInstantTrade ? cryptoCodeQuery : cryptoTransactions

	useEffect(() => {
		isInstantTrade
			? setPrevFilterState(initialStateTrade)
			: setPrevFilterState(initialStateTransactions)
	}, [])

	return (
		<Background>
			<View style={styles.closeContainer}>
				<Headline title="Transaction Filter" />
				<TouchableOpacity
					onPress={close}
					hitSlop={50}
					style={styles.closeButton}>
					<Close />
				</TouchableOpacity>
			</View>
			<ScrollView
				style={styles.container}
				bounces={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'space-between',
					minHeight: WINDOW_HEIGHT - bottom - top - 85,
				}}>
				<View>
					{isInstantTrade ? (
						<View style={styles.marginBottom20}>
							<AppText body style={styles.text}>
								Choose currency / Pair
							</AppText>
							<FilterRow array={currencies} filterType="currency" />
						</View>
					) : (
						<View style={styles.type}>
							<AppText body style={styles.text}>
								Choose Type:
							</AppText>
							<FilterRow array={types} filterType="type" />
						</View>
					)}

					<AppDropdown
						selectedText={
							selectedCrypto?.length > 0 && seperateCurrencyName(selectedCrypto)
						}
						label={isInstantTrade ? 'Choose Crypto' : 'Choose Currency'}
						handleClear={clearCurrencyDropdown}
						icon={
							selectedCrypto &&
							selectedCrypto !== 'Show all currency' && (
								<Image
									source={{
										uri: `${COINS_URL_PNG}/${selectedCrypto?.toLowerCase()}.png`,
									}}
									style={styles.coin}
								/>
							)
						}
						handlePress={openModal}
						style={!isInstantTrade && { marginVertical: 24 }}
					/>

					{isInstantTrade && (
						<View style={styles.marginBottom30}>
							<AppText body style={styles.text}>
								Transaction Type:
							</AppText>
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
							selectedText={selectedMethod?.[0] ?? null}
						/>
					)}

					<AppText body style={[styles.text, isInstantTrade && styles.status]}>
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
						navigation={navigation}
						isInstantTrade={isInstantTrade}
					/>
				</View>
			</ScrollView>

			<CryptoModalTrade />
			<ChooseCurrencyModal isForTransactions />

			<DatePickerModal isInstantTrade={isInstantTrade} from />
			<DatePickerModal isInstantTrade={isInstantTrade} to />
			<ChooseMethodsModal />
		</Background>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
		marginTop: -34,
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
	closeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 36,
		backgroundColor: colors.PRIMARY_BACKGROUND,
		zIndex: 10,
		paddingBottom: 10,
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
})
