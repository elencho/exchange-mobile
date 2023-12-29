import React, { useEffect, useRef, useState } from 'react'
import {
	Dimensions,
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'
import { setCard } from '../../redux/trade/actions'
import { setNetwork, setWalletTab } from '../../redux/wallet/actions'
import AppText from '../AppText'

const BUTTON_WIDTH = 120

export default function WalletSwitcher() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		wallet: { walletTab },
		trade: { currentBalanceObj, Balance_Card },
	} = state

	const cur = currentBalanceObj
	const array = ['Deposit', 'Withdrawal', 'Whitelist']
	const [switchers, setSwitchers] = useState(array)

	useEffect(() => {
		if (
			cur.type === 'FIAT' &&
			(cur.depositMethods.ECOMMERCE || cur.withdrawalMethods.ECOMMERCE)
		) {
			setSwitchers([...array, 'Manage Cards'])
		} else {
			setSwitchers(array)
		}
		dispatch({ type: 'METHOD_NETWORK_RESTRICTION' })
	}, [currentBalanceObj, walletTab])

	const handleWalletTab = (f) => {
		dispatch(setWalletTab(f))
		dispatch(setCard(null))

		const m = f === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods'

		const isFiat = cur.type === 'FIAT'
		if (isFiat) {
			if (cur[m]?.ECOMMERCE) {
				dispatch(setNetwork('ECOMMERCE'))
			} else {
				dispatch(setNetwork('SWIFT'))
			}
		}
	}

	const scrollViewRef = useRef()
	useEffect(() => {
		scrollViewRef?.current?.scrollTo &&
			scrollViewRef.current.scrollTo({ x: 0, y: 0 })
	}, [currentBalanceObj])

	useEffect(() => {
		if (walletTab === 'Manage Cards' && scrollViewRef?.current?.scrollTo) {
			scrollViewRef?.current?.scrollToEnd({ animated: true })
			console.log({ walletTab })
		}
	}, [walletTab, Balance_Card, currentBalanceObj])

	const buttonStyle = (f) => {
		return {
			backgroundColor:
				colors[f === walletTab ? 'PRIMARY_PURPLE' : 'BUTTON_DISABLED'],
			width: switchers.length === 3 ? '32%' : '48%',
		}
	}

	const textStyle = (f) => {
		if (f === walletTab) {
			return { color: colors.PRIMARY_TEXT }
		} else {
			return { color: '#C0C5E0' }
		}
	}

	return (
		<>
			{switchers.length > 3 ? (
				<View>
					<ScrollView
						ref={scrollViewRef}
						style={styles.scrollView}
						contentContainerStyle={{
							width:
								switchers.length > 3
									? BUTTON_WIDTH * switchers.length + 20
									: BUTTON_WIDTH * switchers.length,
							paddingRight: 5,
						}}
						horizontal
						scrollEnabled={switchers.length > 3}
						bounces={true}
						showsHorizontalScrollIndicator={false}>
						{switchers.map((f, i) => (
							<Pressable
								key={f}
								style={[styles.button, buttonStyle(f)]}
								onPress={() => handleWalletTab(f)}>
								<AppText body style={textStyle(f)}>
									{f}
								</AppText>
							</Pressable>
						))}
					</ScrollView>
				</View>
			) : (
				<View style={styles.row}>
					{switchers.map((f, i) => (
						<Pressable
							key={f}
							style={[styles.button, buttonStyle(f)]}
							onPress={() => handleWalletTab(f)}>
							<AppText body style={textStyle(f)}>
								{f}
							</AppText>
						</Pressable>
					))}
				</View>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	button: {
		height: 35,
		borderRadius: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 6,
		maxWidth: BUTTON_WIDTH,
	},
	scrollView: {
		marginTop: 22,
		marginBottom: 28,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 22,
		marginBottom: 28,
	},
})
