import { BarCodeScanner } from 'expo-barcode-scanner'
import Constants from 'expo-constants'
import { useEffect } from 'react'
import { StyleSheet, View, Pressable, Dimensions, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Close from '../assets/images/Close.svg'
import colors from '../constants/colors'
import { IS_IOS } from '../constants/system'
import { toggleQrScannerModal } from '../redux/modals/actions'
import AppModal from './AppModal'
import AppText from './AppText'

const WINDOW_WIDTH = Dimensions.get('window').width

const QrScanner = ({ setAddress }) => {
	const hasPermission = useSelector((state) => state.modals.hasCameraPermission)

	const dispatch = useDispatch()
	const closeQrScannerModal = () => dispatch(toggleQrScannerModal(false))

	const isModalVisible = useSelector(
		(state) => state.modals.qrScannerModalVisible
	)

	const handleBarCodeScanned = ({ type, data }) => {
		setAddress(data)
		closeQrScannerModal()
	}

	const children = () => (
		<View style={styles.container}>
			<Pressable hitSlop={200} style={styles.btn} onPress={closeQrScannerModal}>
				<Close />
			</Pressable>
			<View style={styles.barCodeBox}>
				<BarCodeScanner
					onBarCodeScanned={handleBarCodeScanned}
					style={styles.camera}>
					<View style={styles.topLeftMarker} />
					<View style={styles.bottomLeftMarker} />
					<View style={styles.topRightMarker} />
					<View style={styles.bottomRightMarker} />
				</BarCodeScanner>
				<AppText subtext style={styles.text}>
					Align QR code within frame
				</AppText>
			</View>
		</View>
	)

	return (
		<AppModal
			visible={hasPermission && isModalVisible}
			hide={closeQrScannerModal}
			children={children()}
			title="QR Scanner"
			custom
			modalStyle={hasPermission && isModalVisible && styles.modalStyle}
		/>
	)
}

export default QrScanner

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		height: 300,
		width: IS_IOS ? 300 : WINDOW_WIDTH * 0.62,
		alignSelf: 'center',
	},
	barCodeBox: {
		flex: 1,
		width: '100%',
		marginTop: '23%',
		alignItems: 'center',
	},
	btn: {
		alignSelf: 'flex-end',
		marginRight: 25,
		marginTop: Platform.select({
			ios: Constants.statusBarHeight + 10,
			android: 20,
		}),
	},
	text: {
		color: '#969CBF',
		marginTop: 30,
	},
	topLeftMarker: {
		position: 'absolute',
		left: -4,
		top: -4,
		width: 34,
		height: 34,
		borderColor: '#25d8d1',
		borderLeftWidth: 3,
		borderTopWidth: 3,
	},
	bottomLeftMarker: {
		position: 'absolute',
		left: -4,
		bottom: -4,
		width: 34,
		height: 34,
		borderColor: '#25d8d1',
		borderLeftWidth: 3,
		borderBottomWidth: 3,
	},
	topRightMarker: {
		position: 'absolute',
		right: -4,
		top: -4,
		width: 34,
		height: 34,
		borderColor: '#25d8d1',
		borderRightWidth: 3,
		borderTopWidth: 3,
	},
	bottomRightMarker: {
		position: 'absolute',
		right: -4,
		bottom: -4,
		width: 34,
		height: 34,
		borderColor: '#25d8d1',
		borderRightWidth: 3,
		borderBottomWidth: 3,
	},
	modalStyle: { backgroundColor: colors.PRIMARY_BACKGROUND },
})
