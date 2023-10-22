import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppModal from '@app/components/AppModal'
import AppText from '@app/components/AppText'
import colors from '@app/constants/colors'
import { methods } from '@app/constants/filters'
import { toggleMethodsModal } from '@app/redux/modals/actions'
import { setMethodFilter } from '@app/refactor/redux/transactions/transactionSlice'

const ChooseMethodsModal = () => {
	const dispatch = useDispatch()
	const chooseMethodsModalVisible = useSelector(
		(state) => state.modals.chooseMethodsModalVisible
	)
	const selectedMethod = useSelector((state) => state.transactions.method)

	const hideModal = () => dispatch(toggleMethodsModal(false))
	const selectedStyle = { backgroundColor: 'rgba(101, 130, 253, 0.16)' }

	const children = () => {
		return methods.map((i) => (
			<View key={i}>
				<Pressable
					style={[styles.row, selectedMethod[0] === i && selectedStyle]}
					onPress={() => {
						dispatch(setMethodFilter([i]))
						hideModal()
					}}>
					<AppText calendarDay style={styles.text}>
						{i}
					</AppText>
				</Pressable>
			</View>
		))
	}

	return (
		<AppModal
			visible={chooseMethodsModalVisible}
			hide={hideModal}
			title="Choose Methods"
			bottom
			children={children()}
		/>
	)
}

export default ChooseMethodsModal

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		borderRadius: 5,
	},
	text: {
		color: colors.PRIMARY_TEXT,
		marginLeft: 11,
	},
})
