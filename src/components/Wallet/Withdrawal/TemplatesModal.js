import React, { useEffect } from 'react'
import { Pressable, StyleSheet, View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Add from '../../../assets/images/Wallet/Add.svg'
import Delete from '../../../assets/images/Wallet/Delete.svg'
import colors from '../../../constants/colors'
import {
	setDeleteModalInfo,
	toggleTemplatesModal,
} from '../../../redux/modals/actions'
import {
	chooseTemplate,
	setIban,
	setWithdrawalBank,
} from '../../../redux/wallet/actions'
import AppModal from '../../AppModal'
import AppText from '../../AppText'
import PurpleText from '../../PurpleText'
import DeleteModal from '../ManageCards/DeleteModal'

export default function TemplatesModal() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		modals: { templatesModalVisible },
		wallet: { templates, currentTemplate },
	} = state

	useEffect(() => {
		dispatch(setWithdrawalBank({}))
	}, [currentTemplate])

	const hide = () => dispatch(toggleTemplatesModal(false))

	const deleteTemplate = (id) => {
		dispatch(setDeleteModalInfo({ id, visible: true }))
	}

	const choose = (t) => {
		dispatch(chooseTemplate(t))
		dispatch(setIban(t.iban))
		hide()
	}

	const background = (t) => {
		if (t.templateName === currentTemplate.templateName) {
			return { backgroundColor: 'rgba(101, 130, 253, 0.1)' }
		}
	}

	const children = (
		<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
			{templates?.map((t) => (
				<View style={[styles.template, background(t)]} key={t.id}>
					<Pressable style={styles.flex} onPress={() => choose(t)}>
						<Text numberOfLines={1} style={styles.white}>
							{t.templateName}
						</Text>
						<AppText numberOfLines={1} subtext style={styles.subtext}>
							{t.iban}
						</AppText>
					</Pressable>

					<Pressable onPress={() => deleteTemplate(t.id)} style={styles.icon}>
						<Delete />
					</Pressable>
				</View>
			))}

			<View
				style={[styles.template, background({ templateName: 'New Template' })]}>
				<Pressable
					style={styles.addNew}
					onPress={() => choose({ templateName: 'New Template' })}>
					<View>
						<PurpleText text="Add New Bank" />
						<AppText subtext style={styles.subtext}>
							Other Provider
						</AppText>
					</View>

					<View style={styles.icon}>
						<Add />
					</View>
				</Pressable>
			</View>

			<DeleteModal type="template" />
		</ScrollView>
	)

	return (
		<AppModal
			children={children}
			hide={hide}
			bottom
			visible={templatesModalVisible}
			title="Choose or Add"
		/>
	)
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		height: 37,
	},
	addNew: {
		flex: 1,
		height: 37,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	icon: {
		width: 18,
		alignItems: 'center',
	},
	template: {
		height: 60,
		flexDirection: 'row',
		paddingHorizontal: 10,
		borderRadius: 5,
		alignItems: 'center',
		gap: 6,
	},
	subtext: {
		color: colors.SECONDARY_TEXT,
		marginTop: 5,
	},
	white: {
		color: colors.PRIMARY_TEXT,
		fontFamily: 'Ubuntu_Medium',
		fontSize: 14,
		lineHeight: 18,
	},
	scrollView: {
		maxHeight: 150,
	},
})
