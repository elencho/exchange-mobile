import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	FC,
	PropsWithChildren,
} from 'react'
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Linking,
	Dimensions,
	Alert,
} from 'react-native'
import Modal from 'react-native-modal'
import CloseIcon from '@components/close-button'
import { Theme, useTheme } from '@theme/index'

import { AppButton } from '@components/button'
import { useNetInfoInstance } from '@react-native-community/netinfo'
import { useDispatch } from 'react-redux'

type ModalContextType = {
	showModal: (content: ContentType) => void
	hideModal: () => void
	setIsBiometricScreenOpenedForModal: (v: boolean) => void
	setModalContent: (content: ContentType | null) => void
	modalContent: ContentType | null
	setModalVisible: (v: boolean) => void
	isBiometricScreenOpenedForModal: boolean
	isModalVisible?: boolean
}

interface ContentType {
	banner?: string
	callToAction?: string
	redirectUrl?: string
	title?: string
	description?: string
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isModalVisible, setModalSmallVisible] = useState(false)
	const [isBiometricScreenOpenedForModal, setIsBiometricScreenOpenedForModal] =
		useState(true)
	const [modalContent, setModalContent] = useState<ContentType | null>(null)

	const { styles } = useTheme(_styles)
	const {
		netInfo: { isConnected },
	} = useNetInfoInstance()

	const showModal = (content: ContentType) => {
		setModalContent(content)
		if (content?.title && content?.description) {
			setModalVisible('showModal')
			setIsBiometricScreenOpenedForModal(false)
		}
	}

	// TODO: remove when tested
	const setModalVisible = (visible) => {
		if (modalContent) {
			Alert.alert('setModalVisible is from', visible)
			setModalSmallVisible(visible)
		}
	}

	const hideModal = () => {
		setModalContent(null)
		setModalVisible(false)
	}

	const BackgroundWrapper: FC<PropsWithChildren> = ({ children }) => {
		return modalContent?.banner ? (
			<View style={styles.imageBckWrapper}>
				<ImageBackground
					imageStyle={styles.imageFillStyle}
					resizeMode="cover"
					style={styles.imageStyle}
					source={{
						uri: modalContent?.banner,
					}}>
					<CloseIcon
						style={{ marginTop: 60, marginRight: 30 }}
						onPress={hideModal}
					/>
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
	const onModalHide = () => {
		setModalContent(null)
	}

	const onPress = () => {
		modalContent?.redirectUrl && Linking.openURL(modalContent?.redirectUrl)
	}

	// Alert.alert(
	// 	`${modalContent?.title} ${isBiometricScreenOpenedForModal} ${isModalVisible}`
	// )

	return (
		<ModalContext.Provider
			value={{
				showModal,
				hideModal,
				setIsBiometricScreenOpenedForModal,
				setModalContent,
				modalContent,
				setModalVisible,
				isBiometricScreenOpenedForModal,
				isModalVisible,
			}}>
			{children}
			{modalContent && !isBiometricScreenOpenedForModal && (
				<Modal
					propagateSwipe={true}
					useNativeDriver
					useNativeDriverForBackdrop
					isVisible={isModalVisible}
					onModalHide={onModalHide}
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
								<Text style={styles.title}>{modalContent.title}</Text>
								<Text style={styles.descr}>{modalContent.description}</Text>
							</View>
							{modalContent?.callToAction && modalContent?.redirectUrl && (
								<AppButton
									variant="primary"
									text={modalContent.callToAction}
									onPress={onPress}
									style={styles.button}
								/>
							)}
						</BackgroundWrapper>
					</View>
				</Modal>
			)}
		</ModalContext.Provider>
	)
}

export const useModal = (): ModalContextType => {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}

const WINDOW_HEIGHT = Dimensions.get('window').height

const _styles = (theme: Theme) =>
	StyleSheet.create({
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

			backgroundColor: theme.color.backgroundPrimary,
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
			fontFamily: theme.font.medium,
			color: '#FFFFFF',
		},
		descr: {
			fontSize: 14,
			lineHeight: 18,
			marginTop: 16,
			fontFamily: theme.font.medium,
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
