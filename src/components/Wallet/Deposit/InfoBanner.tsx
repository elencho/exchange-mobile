import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Dimensions,
} from 'react-native'
import React from 'react'
import AppModal from '@components/modal'
import { TurboModuleRegistry } from 'react-native'
import CloseIcon from '@components/close-button'
import colors from '@app/constants/colors'

const WINDOW_HEIGHT = Dimensions.get('window').height

const modalContent = {}

const InfoBanner = () => {
	const BackgroundWrapper: FC<PropsWithChildren> = ({ children }) => {
		return true ? (
			<View style={styles.imageBckWrapper}>
				<ImageBackground
					imageStyle={styles.imageFillStyle}
					resizeMode="cover"
					style={styles.imageStyle}
					source={{
						uri: '@assets/images/TolCoins1.png',
					}}>
					<CloseIcon
						style={{ marginTop: 60, marginRight: 30 }}
						// onPress={hideModal}
					/>
					{/* 
					{modalContent?.bannerText?.length > 0 && (
						<View style={styles.bannerTextContainer}>
							<AppText variant="headline" style={styles.bannerText}>
								{modalContent.bannerText}
							</AppText>
						</View>
					)} */}
				</ImageBackground>

				{children}
			</View>
		) : (
			<View style={styles.imageBckWrapper}>
				<CloseIcon
					style={{ marginTop: 60, marginRight: 30 }}
					// onPress={hideModal}
				/>
				{children}
			</View>
		)
	}

	const children = (
		<BackgroundWrapper>
			<View style={styles.contentWrapper}>
				<Text style={styles.title}>blablabla</Text>
				<Text style={styles.descr}>blibliblis</Text>
			</View>
			{/* {modalContent?.callToAction && modalContent?.redirectUrl && (
				<AppButton
					variant="primary"
					text={modalContent.callToAction}
					onPress={onPress}
					style={styles.button}
				/>
			)} */}
		</BackgroundWrapper>
	)

	return (
		<AppModal
			visible={true}
			// hide={hide}
			fullScreen
			// title={t(tradeType) + ' ' + crypto}
			children={children}
		/>
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
