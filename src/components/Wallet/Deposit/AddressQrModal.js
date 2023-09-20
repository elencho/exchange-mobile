import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Copy from '../../../assets/images/Copy'
import { toggleQrAddressModal } from '../../../redux/modals/actions'
import useCopyToClipboard from '../../../utils/copyToClipboard'
import AppModal from '../../AppModal'
import AppText from '../../AppText'
import QrCode from '../../QrCode'

export default function AddressQrModal() {
	const { copyToClipboard } = useCopyToClipboard()
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		modals: { qrAddressModalVisible },
		wallet: { cryptoAddress },
	} = state

	const hide = () => dispatch(toggleQrAddressModal(false))
	const copy = () => copyToClipboard(cryptoAddress.address)

	const children = (
		<View style={styles.container}>
			<View style={styles.qr}>
				<QrCode value={cryptoAddress.address} size={125} />
			</View>

			<AppText subtext style={styles.secondary}>
				Scan QR Code
			</AppText>
			<AppText subtext style={styles.address}>
				{cryptoAddress.address}
			</AppText>

			<TouchableOpacity style={styles.copy} onPress={copy}>
				<Copy />
			</TouchableOpacity>
		</View>
	)

	return (
		<AppModal
			visible={qrAddressModalVisible}
			hide={hide}
			children={children}
			bottom
		/>
	)
}

const styles = StyleSheet.create({
	address: {
		color: '#C0C5E0',
		textAlign: 'center',
		lineHeight: 18,
		marginBottom: 18,
		textTransform: 'uppercase',
	},
	container: {
		alignItems: 'center',
	},
	copy: {
		width: 35,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: -5,
	},
	qr: {
		backgroundColor: 'white',
		width: 140,
		height: 140,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	secondary: {
		color: '#C0C5E0',
		marginVertical: 14,
	},
})
