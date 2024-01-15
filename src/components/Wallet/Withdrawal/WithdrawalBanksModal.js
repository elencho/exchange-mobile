import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../../constants/colors'
import { toggleChooseBankModal } from '../../../redux/modals/actions'
import { setWithdrawalBank } from '../../../redux/wallet/actions'
import AppModal from '../../AppModal'
import AppText from '../../AppText'

export default function WithdrawalBanksModal() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		modals: { chooseBankModalVisible },
		wallet: { banks, withdrawalBank },
	} = state

	const hide = () => dispatch(toggleChooseBankModal(false))
	const choose = (b) => {
		dispatch(setWithdrawalBank(b))
		hide()
	}

	const children = (
		<ScrollView style={{ padding: 0 }} bounces={false}>
			{[{ bankName: 'Other', id: null }, ...banks].map((b) => (
				<View key={b.id}>
					<Pressable
						style={[
							styles.row,
							b.bankName === withdrawalBank.bankName && {
								backgroundColor: 'rgba(101, 130, 253, 0.16)',
							},
						]}
						onPress={() => choose(b)}>
						<AppText body style={styles.text}>
							{b.bankName}
						</AppText>
					</Pressable>
				</View>
			))}
		</ScrollView>
	)

	return (
		<AppModal
			children={children}
			hide={hide}
			fullScreen
			// bottom
			visible={chooseBankModalVisible}
			title="Choose Bank"
		/>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 13,
		paddingVertical: 10,
		borderRadius: 5,
		marginHorizontal: -5,
		height: 50,
	},
	text: {
		color: colors.PRIMARY_TEXT,
	},
})
