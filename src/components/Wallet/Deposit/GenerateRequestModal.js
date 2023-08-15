import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { toggleGenerateRequestModal } from '../../../redux/modals/actions'
import colors from '../../../constants/colors'
import InfoMark from '../../InstantTrade/InfoMark'
import Headline from '../../TransactionHistory/Headline'
import PurpleText from '../../PurpleText'
import AppText from '../../AppText'
import AppModal from '../../AppModal'

export default function GenerateRequestModal() {
	const dispatch = useDispatch()
	const generateRequestModalVisible = useSelector(
		(state) => state.modals.generateRequestModalVisible
	)

	const hide = () => {
		dispatch(toggleGenerateRequestModal(false))
	}

	const children = (
		<View style={styles.block}>
			<View style={{ transform: [{ scale: 1.8 }] }}>
				<InfoMark inner="i" color={colors.PRIMARY_TEXT} />
			</View>
			<Headline title="Generate Request" />
			<AppText body style={styles.text}>
				Contact <PurpleText text="support@cryptal.com" /> to generate addresses
				for ERC20 tokens
			</AppText>
		</View>
	)

	return (
		<AppModal
			visible={generateRequestModalVisible}
			hide={hide}
			bottom
			children={children}
		/>
	)
}

const styles = StyleSheet.create({
	block: {
		alignItems: 'center',
	},
	text: {
		color: colors.SECONDARY_TEXT,
		marginHorizontal: 25,
		textAlign: 'center',
		lineHeight: 25,
	},
})
