import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AppModal from '../components/AppModal'
import AppText from '../components/AppText'
import colors from '../constants/colors'
import { methods } from '../constants/filters'
import { toggleMethodsModal } from '../redux/modals/actions'
import { setMethodFilter } from '../redux/transactions/actions'

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
					style={[styles.row, selectedMethod === i && selectedStyle]}
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
		marginLeft: -15,
	},
	text: {
		color: colors.PRIMARY_TEXT,
		marginLeft: 26,
	},
})
