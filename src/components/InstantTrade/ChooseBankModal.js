import React, { useEffect } from 'react'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ICONS_URL_PNG } from '../../constants/api'
import colors from '../../constants/colors'
import { toggleChooseBankModal } from '../../redux/modals/actions'
import { setCard, setDepositProvider } from '../../redux/trade/actions'
import AppModal from '../AppModal'
import AppText from '../AppText'

export default function ChooseBankModal({ selectedProvider }) {
	const dispatch = useDispatch()

	const {
		trade: { depositProvider, depositProviders, currentBalanceObj },
		transactionsOld: { tabRoute },
		wallet: { wireDepositProviders, walletTab, network },
		modals: { chooseBankModalVisible },
	} = useSelector((state) => state)

	useEffect(() => {
		selectedProvider ? null : dispatch(setDepositProvider(null))
		dispatch({ type: 'SET_WIRE_DEPOSIT_PROVIDER', wireDepositProvider: null })
	}, [])

	const array = () => {
		const wallet = tabRoute === 'Wallet'
		const trade = tabRoute === 'Trade'
		// const manageCards = walletTab === 'Manage Cards';
		// const deposit = walletTab === 'Deposit';
		// const withdrawal = walletTab === 'Withdrawal';
		const ecommerce = network === 'ECOMMERCE'

		// if ((wallet && manageCards) || trade) return depositProviders;
		// if (wallet && deposit) {
		//   if (ecommerce) return depositProviders;
		//   if (!ecommerce) return wireDepositProviders;
		// }
		const m =
			walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods'

		if (trade) return depositProviders
		if (wallet) return currentBalanceObj[m]?.ECOMMERCE
		if (!ecommerce) return wireDepositProviders
	}

	const hide = () => dispatch(toggleChooseBankModal(false))

	const choose = (b) => {
		dispatch(setDepositProvider(b))
		dispatch(setCard(null))
		hide()
	}

	const children = () => {
		return array()?.map((b, i, a) => (
			<View key={i}>
				<Pressable
					key={b.displayName}
					style={[
						styles.row,
						b.provider === depositProvider && {
							backgroundColor: 'rgba(101, 130, 253, 0.16)',
						},
					]}
					onPress={() => choose(b.provider)}>
					<Image
						source={{ uri: `${ICONS_URL_PNG}/${b.provider}.png` }}
						style={styles.image}
					/>
					<AppText body style={styles.text}>
						{b.displayName}
					</AppText>
				</Pressable>
				{i < a.length - 1 && <View style={styles.margin} />}
			</View>
		))
	}

	return (
		<AppModal
			visible={chooseBankModalVisible}
			hide={hide}
			title="Choose Bank"
			bottom
			children={children()}
		/>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 24,
		height: 20,
		resizeMode: 'contain',
	},
	margin: {
		marginBottom: 5,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 13,
		paddingVertical: 10,
		borderRadius: 5,
		marginHorizontal: -5,
	},
	text: {
		color: colors.PRIMARY_TEXT,
		marginLeft: 15,
	},
})
