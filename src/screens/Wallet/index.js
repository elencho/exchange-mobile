import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import {
	StyleSheet,
	View,
	ScrollView,
	Keyboard,
	KeyboardAvoidingView,
	Pressable,
} from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import Background from '../../components/Background'
import CustomRefreshContol from '../../components/CustomRefreshContol'
import TopRow from '../../refactor/common/components/top_row'
import BalanceSearchBar from '../../components/Wallet/BalanceSearchBar'
import BalancesList from '../../components/Wallet/BalancesList'
import TotalBalance from '../../components/Wallet/TotalBalance'
import colors from '../../constants/colors'
import { fetchBalanceApi } from '@app/refactor/screens/convert/api/convertNowApi'

export default function Wallet() {
	const dispatch = useDispatch()
	const balanceLoadingSaga = useSelector((state) => state.trade.balanceLoading)
	// const balances = useSelector((state) => state.trade.balance.balances)

	const inputRef = useRef()
	const scrollViewRef = useRef()
	const [filteredBalances, setFilteredBalances] = useState([])
	const [showRefreshControl, setShowRefreshControl] = useState(false)
	const [value, setValue] = useState('')
	const [showZeroBalances, setShowZeroBalances] = useState(true)
	const [nonZeroBalances, setNonZeroBalances] = useState([])

	const [balanceLoading, setBalanceLoading] = useState(true)
	const [balances, setBalances] = useState([])

	// useEffect(() => {
	// 	fetchBalanceApi().then((res) => {
	// 		console.log({ res })
	// 		console.log({ balances })
	// 		setBalances(res.balances)
	// 		setBalanceLoading(false)
	// 	})
	// }, [])

	useFocusEffect(
		useCallback(() => {
			dispatch({ type: 'BALANCE_SAGA' })
			dispatch({ type: 'TOGGLE_BALANCE_LOADING', balanceLoading: true })
			scrollViewRef.current.scrollTo({ x: 0, y: 3, animated: true })
			hideButtonsHandler()
			const timer = setTimeout(() => {
				dispatch({ type: 'TOGGLE_BALANCE_LOADING', balanceLoading: false })
			}, 1500)

			fetchBalanceApi().then((res) => {
				setBalances(res.balances)
				setBalanceLoading(false)
			})

			return () => {
				onRefresh()
				clearTimeout(timer)
				setShowZeroBalances(true)
				setValue('')
				Keyboard.dismiss()
				setBalanceLoading(true)
			}
		}, [])
	)

	useEffect(() => {
		if (balances) type(value)
	}, [showZeroBalances])

	useEffect(() => {
		if (balances) {
			const nonZeroBalances = balances?.filter((b) => b?.total > 0)
			setNonZeroBalances(nonZeroBalances)
			setFilteredBalances(balances)
		}
	}, [balances])

	const type = (text) => {
		setValue(text)
		const array = showZeroBalances ? balances : nonZeroBalances
		const filteredArray = array?.filter((c) => {
			return (
				c.currencyCode.toLowerCase().includes(text.toLowerCase()) ||
				c.currencyName.toLowerCase().includes(text.toLowerCase()) ||
				c.displayCurrencyCode.toLowerCase().includes(text.toLowerCase())
			)
		})
		setFilteredBalances(filteredArray)
	}

	const onRefresh = () => {
		// setBalanceLoading(true)
		setShowRefreshControl(true)
		hideButtonsHandler()
		setValue('')
		setShowZeroBalances(true)
		dispatch({ type: 'REFRESH_WALLET_AND_TRADES' })
		setShowRefreshControl(false)

		// setTimeout(() => {
		// 	setBalanceLoading(false)
		// }, 500)
	}

	const animatedValue = useSharedValue(8)

	const showButtonsHandler = () => {
		animatedValue.value = withTiming(100, { duration: 400 })
		setShowZeroBalances(true)
		// inputRef.current?.focus();
	}
	const hideButtonsHandler = () => {
		type('')
		// inputRef.current?.blur();
		animatedValue.value = withTiming(8, { duration: 400 })
	}

	const dismissSearch = () => {
		if (!value) {
			hideButtonsHandler()
			Keyboard.dismiss()
		}
	}
	return (
		<Background>
			<Pressable onPress={dismissSearch}>
				<>
					<TopRow />
					<KeyboardAvoidingView behavior="padding">
						<ScrollView
							nestedScrollEnabled
							refreshControl={
								<CustomRefreshContol
									refreshing={
										(balanceLoading || balanceLoadingSaga) && showRefreshControl
									}
									onRefresh={onRefresh}
								/>
							}
							ref={scrollViewRef}
							showsVerticalScrollIndicator={false}
							stickyHeaderIndices={[1]}>
							<TotalBalance
								balanceLoading={balanceLoading || balanceLoadingSaga}
							/>
							<BalanceSearchBar
								animatedValue={animatedValue}
								showButtonsHandler={showButtonsHandler}
								hideButtonsHandler={hideButtonsHandler}
								setShowZeroBalances={setShowZeroBalances}
								value={value}
								type={type}
								showZeroBalances={showZeroBalances}
								ref={inputRef}
							/>
							<BalancesList
								balanceLoading={balanceLoading || balanceLoadingSaga}
								filteredBalances={filteredBalances}
							/>
							<View style={styles.footer} />
						</ScrollView>
					</KeyboardAvoidingView>
				</>
			</Pressable>
		</Background>
	)
}

const styles = StyleSheet.create({
	topRowStyle: {
		backgroundColor: colors.SECONDARY_BACKGROUND,
		marginBottom: 0,
		paddingHorizontal: 20,
		paddingBottom: 28,
	},
	footer: {
		height: 50,
		width: 100,
	},
})
