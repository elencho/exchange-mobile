import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Dimensions,
} from 'react-native'
import React, { FC, PropsWithChildren } from 'react'
import CloseIcon from '@components/close-button'
import colors from '@app/constants/colors'
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import AppText from '@components/text'

const WINDOW_HEIGHT = Dimensions.get('window').height

const modalContent = {}

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

	const BackgroundWrapper: FC<PropsWithChildren> = ({ children }) => {
		return true ? (
			<View style={styles.imageBckWrapper}>
				<ImageBackground
					imageStyle={styles.imageFillStyle}
					resizeMode="cover"
					style={styles.imageStyle}
					source={require('@assets/images/TolCoins1.png')}>
					<CloseIcon
						style={{ marginTop: 60, marginRight: 30 }}
						onPress={hideModal}
					/>

					<View style={styles.bannerTextContainer}>
						<AppText variant="headline" style={styles.bannerText}>
							tolcoins_modal_text_on_banner
						</AppText>
					</View>
				</ImageBackground>

				{children}
			</View>
		) : (
			<View style={styles.imageBckWrapper}>
				<CloseIcon
					style={{ marginTop: 60, marginRight: 30 }}
					onPress={hideModal}
				/>
				{children}
			</View>
		)
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
				<BackgroundWrapper>
					<View
						style={
							modalContent?.banner
								? styles.contentWrapper
								: styles.contentWrapperWithoutBanner
						}>
						<AppText style={styles.title}>tolcoins_modal_header</AppText>
						<AppText style={styles.descr}>tolcoins_modal_text_1</AppText>
						<AppText style={styles.descr}>tolcoins_modal_text_2</AppText>
					</View>
				</BackgroundWrapper>
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

		// minHeight: WINDOW_HEIGHT / 3,
	},
	contentWrapperWithoutBanner: {
		marginTop: 24,
		marginHorizontal: 20,
		minHeight: WINDOW_HEIGHT - 154,
	},
	title: {
		fontSize: 24,
		lineHeight: 28,
		// fontFamily: theme.font.medium,
		color: '#FFFFFF',
	},
	descr: {
		fontSize: 14,
		lineHeight: 18,
		marginTop: 16,
		// fontFamily: theme.font.medium,
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
})
