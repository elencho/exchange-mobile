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
	ScrollView,
} from 'react-native'
import Modal from 'react-native-modal'
import CloseIcon from '@components/close-button'
import { Theme, useTheme } from '@theme/index'

import { AppButton } from '@components/button'

type ModalContextType = {
	showModal: (content: ContentType) => void
	hideModal: () => void
}

interface ContentType {
	banner?: string
	callToAction?: string
	redirectUrl?: string
	title: string
	description: string
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isModalVisible, setModalVisible] = useState(false)
	const { styles } = useTheme(_styles)
	// TODO: remove, left for testing purpose
	const [modalContent, setModalContent] = useState<ContentType>({
		title: '',
		redirectUrl: '',
		callToAction: '',
		description: '',
		banner: '',
	})

	const showModal = (content: ContentType) => {
		setModalContent(content)
		setModalVisible(true)
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

	const onPress = () => {
		Linking.openURL(modalContent?.redirectUrl)
	}

	return (
		<ModalContext.Provider value={{ showModal, hideModal }}>
			{children}
			{modalContent && (
				<Modal
					propagateSwipe={true}
					useNativeDriver
					isVisible={isModalVisible}
					onDismiss={hideModal}
					coverScreen
					animationOutTiming={500}
					backdropTransitionInTiming={300}
					style={{ margin: 0, justifyContent: 'flex-end' }}>
					<View style={styles.scrollWrapper}>
						<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
						</ScrollView>
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
			backgroundColor: theme.color.backgroundPrimary,
		},
		contentWrapper: {
			marginTop: 24,
			marginHorizontal: 20,
			paddingBottom: 154,
			minHeight: WINDOW_HEIGHT / 2,
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
			backgroundColor: theme.color.backgroundPrimary,
			flex: 1,
		},
		button: {
			position: 'absolute',
			bottom: 44,
			width: '90%',

			alignSelf: 'center',
		},
	})
