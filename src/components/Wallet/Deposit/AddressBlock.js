import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Copy from '../../../assets/images/CopyLarge'
import QR from '../../../assets/images/QR'
import colors from '../../../constants/colors'
import { toggleQrAddressModal } from '../../../redux/modals/actions'
import useCopyToClipboard from '../../../utils/copyToClipboard'
import AppText from '../../AppText'
import AddressQrModal from './AddressQrModal'
import { useNavigation } from '@react-navigation/native'
import { fetchCryptoAddresses } from '@app/utils/walletUtils'
import { saveCryptoAddress } from '@app/redux/wallet/actions'

export default function AddressBlock() {
	const navigation = useNavigation()

	const { copyToClipboard } = useCopyToClipboard()
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		wallet: { cryptoAddress, network },
		transactionsOld: { code },
	} = state

	useEffect(() => {
		// dispatch(cryptoAddressesAction(name, code, navigation, network))
		console.log('add', cryptoAddress.address)
		if (!cryptoAddress.address)
			fetchCryptoAddresses(code, network).then((res) =>
				dispatch(saveCryptoAddress(res))
			)
	}, [])

	const copyAddress = () => copyToClipboard(cryptoAddress.address)
	const showQr = () => dispatch(toggleQrAddressModal(true))
	const copyTag = () => copyToClipboard(cryptoAddress.tag)

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<AppText style={styles.address}>{cryptoAddress.address}</AppText>

				<TouchableOpacity onPress={showQr} style={{ marginRight: 20 }}>
					<QR />
				</TouchableOpacity>
				<TouchableOpacity onPress={copyAddress}>
					<Copy />
				</TouchableOpacity>
			</View>

			{cryptoAddress.tag ? (
				<View style={[styles.row, { marginTop: 12 }]}>
					<AppText style={styles.address}>
						<AppText style={{ textTransform: 'capitalize' }}>Memo :</AppText>
						{cryptoAddress.tag}
					</AppText>

					<TouchableOpacity onPress={copyTag}>
						<Copy />
					</TouchableOpacity>
				</View>
			) : null}

			<AddressQrModal />
		</View>
	)
}

const styles = StyleSheet.create({
	address: {
		textTransform: 'uppercase',
		color: colors.SECONDARY_TEXT,
		flex: 1,
		marginRight: 30,
		lineHeight: 20,
	},
	bullet: {
		backgroundColor: '#FFC65C',
		width: 4,
		height: 4,
		marginRight: 15,
		marginTop: 7,
	},
	bullets: {
		backgroundColor: 'rgba(242, 223, 180, 0.04)',
		paddingHorizontal: 25,
		paddingVertical: 18,
		marginTop: 20,
	},
	container: {
		marginTop: 25,
	},
	light: {
		color: '#FFFBF3',
		flex: 1,
		lineHeight: 16,
	},
	light2: {
		color: '#F2DFB4',
	},
	qr: {
		height: 33,
		width: 33,
	},
	row: {
		flexDirection: 'row',
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
	},
})
