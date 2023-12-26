import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Arrow from '../../../assets/images/Arrow'
import Card from '../../../assets/images/Card.svg'
import Euro from '../../../assets/images/Euro.svg'
import Bank from '../../../assets/images/LocalBank.svg'
import BlockChain from '@assets/images/BlockChainDark.svg'

import { ICONS_URL_PNG } from '../../../constants/api'
import colors from '../../../constants/colors'
import { toggleTransferMethodModal } from '../../../redux/modals/actions'
import AppDropdown from '../../AppDropdown'
import AppText from '../../AppText'

export default function TransferMethodDropdown() {
	const dispatch = useDispatch()
	const wallet = useSelector((state) => state.wallet)
	const { network, walletTab, methodsToDisplay } = wallet

	const show = () => dispatch(toggleTransferMethodModal(true))

	const isOneMethod = methodsToDisplay?.length < 2
	const dropdownStyle = {
		backgroundColor: isOneMethod ? 'rgba(149, 164, 247, 0.04)' : null,
		borderWidth: isOneMethod ? 0 : 1,
	}
	const renderIcon = (network) => {
		let logo
		if (network === 'ECOMMERCE') {
			logo = <Card />
		}
		if (network === 'SWIFT') {
			logo = <Bank />
		}
		if (network === 'SEPA') {
			logo = <Euro />
		}
		if (network === 'BEP20') {
			return <BlockChain />
		}
		return <View style={{ marginRight: -4 }}>{logo}</View>
	}

	return (
		<AppDropdown
			style={[styles.dropdown, dropdownStyle]}
			notClearable
			label={isOneMethod ? null : 'Choose provider'}
			withLabel={!isOneMethod}
			disabled={isOneMethod}
			icon={renderIcon(network)}
			selectedText={network}
			handlePress={show}
			hideArrow={isOneMethod}
			isOneMethod={isOneMethod}
		/>
	)
}

const styles = StyleSheet.create({
	dropdownText: {
		flex: 1,
		marginHorizontal: 12,
		color: colors.PRIMARY_TEXT,
	},
	dropdown: {
		marginTop: 22,
	},
	image: {
		marginLeft: 5,
	},
})
