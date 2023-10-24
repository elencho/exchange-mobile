import React, { memo, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Background from '../../components/Background'
import CustomRefreshContol from '../../components/CustomRefreshContol'
import PurpleText from '../../components/PurpleText'
import ChooseCurrencyModal from '../../components/TransactionFilter/ChooseCurrencyModal'
import Headline from '../../components/TransactionHistory/Headline'
import ChooseNetworkModal from '../../components/Wallet/Deposit/ChooseNetworkModal'
import WalletSwitcher from '../../components/Wallet/WalletSwitcher'
import { IS_ANDROID } from '../../constants/system'
import { setCard, setDepositProvider } from '../../redux/trade/actions'
import {
	setShouldRefreshOnScroll,
	setWalletTab,
} from '../../redux/wallet/actions'
import Deposit from './Deposit'
import ManageCards from './ManageCards'
import Whitelist from './Whitelist'
import Withdrawal from './Withdrawal'

function Balance({ navigation }) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		wallet: { walletTab, network, shouldRefreshOnScroll },
		trade: { cardsLoading },
		transactionsOld: { tabNavigationRef, loading },
	} = state

	const onRefresh = () => {
		if (shouldRefreshOnScroll || IS_ANDROID) {
			dispatch(setCard(null))
			dispatch({ type: 'REFRESH_WALLET_AND_TRADES' })
			walletTab !== 'Whitelist' && dispatch({ type: 'CLEAN_WALLET_INPUTS' })
			if (network !== 'SWIFT') {
				dispatch(setDepositProvider(null))
			}
			dispatch(setShouldRefreshOnScroll(false))
		}
	}

	useEffect(() => {
		dispatch(setShouldRefreshOnScroll(true))
	}, [walletTab])

	const back = () => {
		dispatch(setWalletTab('Deposit'))
		navigation.navigate('Main', { screen: 'Wallet' })
	}

	useEffect(() => {
		onRefresh()
		return () => dispatch(setCard(null))
	}, [walletTab, network, shouldRefreshOnScroll])

	const refreshControl = () => {
		const props = { onRefresh, refreshing: loading || cardsLoading }

		return <CustomRefreshContol {...props} />
	}

	const disabled = loading || cardsLoading

	return (
		<Background>
			<TouchableOpacity onPress={back} style={styles.back} disabled={disabled}>
				<PurpleText text="Back to Wallet" style={styles.purpleText} />
			</TouchableOpacity>

			<Headline title="My Wallet" />

			<WalletSwitcher />

			{walletTab === 'Deposit' && <Deposit refreshControl={refreshControl()} />}
			{walletTab === 'Withdrawal' && (
				<Withdrawal refreshControl={refreshControl()} />
			)}
			{walletTab === 'Whitelist' && (
				<Whitelist refreshControl={refreshControl()} />
			)}
			{walletTab === 'Manage Cards' && (
				<ManageCards refreshControl={refreshControl()} />
			)}

			<ChooseCurrencyModal wallet />
			<ChooseNetworkModal />
		</Background>
	)
}
export default memo(Balance)

const styles = StyleSheet.create({
	back: {
		flexDirection: 'row',
		alignItems: 'center',

		width: '45%',

		paddingVertical: 30,
	},
	flexGrow: {
		flexGrow: 1,
	},
	flex: {
		flex: 1,
	},
})
