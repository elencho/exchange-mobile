import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../../assets/images/Card.svg'
import Euro from '../../../assets/images/Euro.svg'
import Bank from '../../../assets/images/LocalBank.svg'
import BlockChain from '@assets/images/BlockChainDark.svg'
import colors from '../../../constants/colors'
import { toggleTransferMethodModal } from '../../../redux/modals/actions'
import { setNetwork } from '../../../redux/wallet/actions'
import AppModal from '../../AppModal'
import AppText from '../../AppText'
import { fetchFee } from '@app/redux/trade/actions'

export default function TransferMethodModal() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		modals: { transferMethodModalVisible },
		transactionsOld: { code },
		wallet: { network, methodsToDisplay, walletTab },
		trade: {
			balance: { balances },
		},
	} = state

	useEffect(() => {
		let methodsToDisplay = []
		const m =
			walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods'
		balances.forEach((b) => {
			if (code === b.currencyCode) {
				if (b[m]?.ECOMMERCE)
					methodsToDisplay.push({
						displayName: 'Payment Card',
						provider: 'ECOMMERCE',
					})
				if (b[m]?.WIRE) {
					b[m]?.WIRE.reduce((_, m) => methodsToDisplay.push(m), 0)
				}
				if (b[m]?.WALLET) {
					b[m]?.WALLET.forEach((m) => methodsToDisplay.push(m))
				}
				dispatch({ type: 'SET_METHODS_TO_DISPLAY', methodsToDisplay })
			}
		})

		// console.log({ methodsToDisplay, network })

		return () =>
			dispatch({ type: 'SET_METHODS_TO_DISPLAY', methodsToDisplay: [] })
	}, [code])

	const hide = () => dispatch(toggleTransferMethodModal(false))

	const handlePress = (m) => {
		dispatch(setNetwork(m))
		dispatch(fetchFee('withdrawal'))

		dispatch({ type: 'REFRESH_WALLET_AND_TRADES' })
		// Card Needs to be checked
		hide()
	}

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
		if (network === 'BEP20') {
			return <BlockChain />
		}
	}
	const children = (
		<>
			{methodsToDisplay.map((m) => (
				<Pressable
					style={[styles.pressable, background(m.provider)]}
					key={m.displayName}
					onPress={() => handlePress(m.provider)}>
					{renderIcon(m.provider)}
					<AppText body style={styles.primary}>
						{m.provider}
					</AppText>
				</Pressable>
			))}
		</>
	)

	return (
		<AppModal
			children={children}
			hide={hide}
			bottom
			visible={transferMethodModalVisible}
			title="Payment Method"
		/>
	)
}

const styles = StyleSheet.create({
	pressable: {
		flexDirection: 'row',
		height: 44,
		paddingHorizontal: 13,
		marginVertical: 2,
		marginHorizontal: -5,
		alignItems: 'center',
		borderRadius: 5,
	},
	primary: {
		color: colors.PRIMARY_TEXT,
		marginLeft: 20,
	},
	image: {
		width: 60,
		height: 12,
	},
})
