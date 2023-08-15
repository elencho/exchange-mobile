import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import AppModal from '../AppModal'
import AppText from '../AppText'
import { toggleInfoModal } from '../../redux/modals/actions'
import colors from '../../constants/colors'

export default function InfoModal() {
	const dispatch = useDispatch()
	const infoVisible = useSelector((state) => state.modals.infoVisible)

	const hide = () => {
		dispatch(toggleInfoModal(false))
	}

	const children = (
		<ScrollView style={{ marginTop: 30, paddingHorizontal: 13 }}>
			<TouchableOpacity activeOpacity={0.99}>
				<AppText header style={styles.header}>
					What is Instant Trade
				</AppText>

				<AppText body style={styles.text}>
					instant trade paragraph 1
				</AppText>

				<AppText header style={[styles.header, { marginTop: 40 }]}>
					How Does it Work?
				</AppText>
				<AppText body style={styles.text}>
					instant trade paragraph 2
				</AppText>
				<AppText body style={styles.text}>
					instant trade paragraph 3
				</AppText>
				<AppText body style={styles.text}>
					instant trade paragraph 4
				</AppText>
			</TouchableOpacity>
		</ScrollView>
	)

	return (
		<AppModal
			hide={hide}
			visible={infoVisible}
			fullScreen
			children={children}
		/>
	)
}

const styles = StyleSheet.create({
	header: {
		color: '#C0C5E0',
	},
	text: {
		color: colors.SECONDARY_TEXT,
		textAlign: 'justify',
		marginTop: 15,
	},
})
