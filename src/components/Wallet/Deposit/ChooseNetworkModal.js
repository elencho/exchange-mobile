import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../../assets/images/Card.svg'
import Euro from '../../../assets/images/Euro.svg'
import Bank from '../../../assets/images/LocalBank.svg'
import colors from '../../../constants/colors'
import { toggleChooseNetworkModal } from '../../../redux/modals/actions'
import {
	cryptoAddressesAction,
	getWhitelistAction,
	setNetwork,
	wireDepositAction,
} from '../../../redux/wallet/actions'
import AppModal from '../../AppModal'
import AppText from '../../AppText'

export default function ChooseNetworkModal() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const [networks, setNetworks] = useState([])

	const {
		modals: { chooseNetworkModalVisible },
		wallet: { network, walletTab },
		trade: { currentBalanceObj },
		transactions: { code },
	} = state

	const fiat = currentBalanceObj?.type === 'FIAT'
	const crypto = currentBalanceObj?.type === 'CRYPTO'
	const deposit = walletTab === 'Deposit'
	const withdrawal = walletTab === 'Withdrawal'
	const isWhitelist = walletTab === 'Whitelist'

	const hide = () => dispatch(toggleChooseNetworkModal(false))
	const handlePress = (n) => {
		dispatch(setNetwork(n))

		if (fiat && network !== 'ECOMMERCE') {
			dispatch(wireDepositAction('', code))
			dispatch({ type: 'REFRESH_WALLET_AND_TRADES' })
			dispatch({ type: 'CLEAN_WALLET_INPUTS' })
		}
		if (crypto) {
			if (deposit) {
				dispatch(cryptoAddressesAction(null, code, null, n))
			}
			if (withdrawal) {
				dispatch(getWhitelistAction())
			}
		}
		hide()
	}

	useEffect(() => {
		let networksToDisplay = []
		const m = withdrawal || isWhitelist ? 'withdrawalMethods' : 'depositMethods'
		const n = currentBalanceObj[m]

		if (n?.WALLET) n?.WALLET?.forEach((n) => networksToDisplay.push(n))
		if (n?.WIRE) n?.WIRE?.forEach((n) => networksToDisplay.push(n))
		setNetworks(networksToDisplay)
		return () => setNetworks([])
	}, [code, walletTab])

	const background = (m) => {
		if (m === network) {
			return { backgroundColor: 'rgba(101, 130, 253, 0.1)' }
		}
	}

	const renderIcon = (network) => {
		if (network === 'ECOMMERCE') {
			return <Card />
		}
		if (network === 'SWIFT') {
			return <Bank />
		}
		if (network === 'SEPA') {
			return <Euro />
		}
		return null
	}

	const children = (
		<>
			{networks.map((n, i) => (
				<Pressable
					style={[
						styles.network,
						background(n.provider),
						i === 1 && { marginBottom: -10 },
					]}
					key={n.provider}
					onPress={() => handlePress(n.provider)}>
					<View>{renderIcon(n.provider)}</View>
					<View
						style={[styles.name, !renderIcon(n.provider) && { marginLeft: 0 }]}>
						<AppText medium body style={styles.primary}>
							{n?.displayName}
						</AppText>

						<AppText body style={styles.secondary}>
							{`(${n?.provider})`}
						</AppText>
					</View>
				</Pressable>
			))}
		</>
	)

	return (
		<AppModal
			visible={chooseNetworkModalVisible}
			hide={hide}
			title="Choose Network"
			bottom
			children={children}
		/>
	)
}

const styles = StyleSheet.create({
	name: {
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 6,
		flexDirection: 'row',
		marginLeft: 10,
	},
	network: {
		flexDirection: 'row',
		height: 50,
		alignItems: 'center',
		marginHorizontal: -5,
		paddingHorizontal: 15,
		borderRadius: 5,
	},
	primary: {
		color: colors.PRIMARY_TEXT,
		marginBottom: 1,
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
	},
})
