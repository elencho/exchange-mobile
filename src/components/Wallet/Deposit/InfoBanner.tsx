import {
	StyleSheet,
	View,
	ImageBackground,
	Dimensions,
	Platform,
	Text,
	Linking,
} from 'react-native'
import React, { FC, PropsWithChildren } from 'react'
import CloseIcon from '@components/close-button'
import colors from '@app/constants/colors'
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import AppText from '@components/text'
import { StatusBar } from 'react-native'
import Constants from 'expo-constants'
import { AppButton } from '@components/button'

const WINDOW_HEIGHT = Dimensions.get('window').height

const InfoBanner = ({
	isModalVisible,
	hideModal,
}: {
	isModalVisible: boolean
	hideModal: (v: boolean) => void
}) => {
	const { isBiometricScreenOpened, isInternetScreenOpened } = useSelector(
		(state: RootState) => state.common
	)
	const globalScreenOpened = isBiometricScreenOpened || isInternetScreenOpened

	const onPress = (coin: string) => {
		switch (coin) {
			case 'ToGEL':
				Linking.openURL(
					'https://bscscan.com/address/0x536475131db68e96179d00e7531b7af880857995'
				)
				break
			case 'ToUSD':
				Linking.openURL(
					'https://bscscan.com/address/0x8035733976e642b81c6ddf83abf68106fea3968f'
				)
				break
			case 'ToEUR':
				Linking.openURL(
					'https://bscscan.com/address/0x0d56f7c944637f2d7edcde3d04ae9fcdde8d79b2'
				)
				break
			default:
				break
		}
	}
	return (
		<Modal
			propagateSwipe={true}
			useNativeDriver
			useNativeDriverForBackdrop
			isVisible={!globalScreenOpened && isModalVisible}
			coverScreen
			backdropTransitionOutTiming={0}
			animationOutTiming={500}
			backdropTransitionInTiming={300}
			style={{ margin: 0, justifyContent: 'flex-end' }}>
			<View style={styles.scrollWrapper}>
				<View style={styles.imageBckWrapper}>
					<ImageBackground
						imageStyle={styles.imageFillStyle}
						resizeMode="cover"
						style={styles.imageStyle}
						source={require('@assets/images/TolCoins1.png')}>
						<CloseIcon style={styles.closeIcon} onPress={hideModal} />

						<View style={styles.bannerTextContainer}>
							<AppText variant="headline" style={styles.bannerText}>
								tolcoins_modal_text_on_banner
							</AppText>
						</View>
					</ImageBackground>

					<View style={styles.contentWrapperWithoutBanner}>
						<AppText style={styles.title}>tolcoins_modal_header</AppText>
						<AppText style={styles.descr}>tolcoins_modal_text_1</AppText>
						<Text style={{ flexDirection: 'row' }}>
							<AppText style={styles.descr}>tolcoins_modal_text_2</AppText>
							<AppButton
								onPress={() => onPress('ToGEL')}
								text="TOGEL, "
								variant="text"
								style={styles.descr2}
							/>

							<AppButton
								onPress={() => onPress('ToUSD')}
								text="TOUSD, "
								variant="text"
								style={styles.descr2}
							/>

							<AppButton
								onPress={() => onPress('ToEUR')}
								text="TOEUR "
								variant="text"
								style={styles.descr2}
							/>
						</Text>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default InfoBanner

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		elevation: 5,
	},
	imageStyle: {
		height: WINDOW_HEIGHT / 2,
		width: '100%',
	},
	container: {},
	imageFillStyle: {
		height: '100%',
	},
	imageBckWrapper: {
		flex: 1,

		backgroundColor: colors.PRIMARY_BACKGROUND,
	},
	contentWrapper: {
		marginTop: 24,
		marginHorizontal: 20,
		paddingBottom: 154,
	},
	contentWrapperWithoutBanner: {
		marginTop: 24,
		marginHorizontal: 20,
		minHeight: WINDOW_HEIGHT - 154,
	},
	title: {
		fontSize: 24,
		lineHeight: 28,
		color: '#FFFFFF',
	},
	descr: {
		fontSize: 14,
		lineHeight: 18,
		marginTop: 16,
		color: '#ccd9dd',
	},
	scrollWrapper: {
		backgroundColor: 'red',
		flex: 1,
	},
	button: {
		position: 'absolute',
		bottom: 44,
		width: '90%',

		alignSelf: 'center',
	},
	bannerTextContainer: {
		position: 'absolute',
		bottom: 28,
		left: 21,
	},
	bannerText: {
		color: '#BEC2DD',
	},
	closeIcon: {
		marginTop: Platform.select({
			ios: Constants.statusBarHeight + 10,
			android: (StatusBar.currentHeight || 0) + 10,
		}),
		marginRight: 20,
	},
	descr2: {
		fontSize: 14,
		lineHeight: 18,
		marginTop: 16,
		marginLeft: 5,
	},
})
