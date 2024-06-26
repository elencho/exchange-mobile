import React from 'react'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ICONS_URL_PNG } from '../../../constants/api'
import colors from '../../../constants/colors'
import { toggleWireBanksModal } from '../../../redux/modals/actions'
import AppModal from '../../AppModal'
import AppText from '../../AppText'

export default function WireBanksModal({ setInfo }) {
	const dispatch = useDispatch()
	const wireBanksModalVisible = useSelector(
		(state) => state.modals.wireBanksModalVisible
	)
	const state = useSelector((state) => state)
	const {
		wallet: { wireDepositProviders, wireDepositProvider, wireDepositInfo },
		common: { language },
	} = state

	const hide = () => dispatch(toggleWireBanksModal(false))

	const choose = (b) => {
		const obj = wireDepositInfo[language]?.find((o) => {
			if (o.iconName.split('.')[0] === b) return o
		})

		setInfo({
			country: obj?.receiverBankCountry,
			swift: obj?.receiverBankSwift,
			address: obj?.receiverBankAddress,
			iban: obj?.receiverIBAN,
			description: obj?.transferDescription,
			name: obj?.receiverName,

			intName: obj?.intermediateBankName,
			intCountry: obj?.intermediateCountry,
			intSwift: obj?.intermediateBankSwift,
			intAddress: obj?.intermediateAddress,
		})
		dispatch({ type: 'SET_WIRE_DEPOSIT_PROVIDER', wireDepositProvider: b })
		hide()
	}

	const children = () => {
		const abbr = (b) => b.iconName.split('.')[0]
		return wireDepositProviders?.map((b, i) => (
			<View key={b.receiverBankName}>
				<Pressable
					style={[
						styles.row,
						wireDepositProvider === abbr(b) && {
							backgroundColor: 'rgba(101, 130, 253, 0.16)',
						},
					]}
					onPress={() => choose(abbr(b))}>
					<Image
						source={{ uri: `${ICONS_URL_PNG}/${abbr(b)}.png` }}
						style={styles.icon}
					/>
					<AppText body style={styles.text}>
						{b.receiverBankName}
					</AppText>
				</Pressable>
				{i < wireDepositProviders?.length - 1 && <View style={styles.margin} />}
			</View>
		))
	}

	return (
		<AppModal
			visible={wireBanksModalVisible}
			hide={hide}
			title="Choose Bank"
			bottom
			children={children()}
		/>
	)
}

const styles = StyleSheet.create({
	icon: {
		width: 25,
		height: 20,
		resizeMode: 'contain',
	},
	margin: {
		marginBottom: 5,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 5,
		marginHorizontal: -5,
	},
	text: {
		color: colors.PRIMARY_TEXT,
		marginLeft: 15,
		textTransform: 'capitalize',
	},
})
