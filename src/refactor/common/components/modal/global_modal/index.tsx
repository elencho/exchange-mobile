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
	TouchableOpacity,
	Text,
	StyleSheet,
	ImageBackground,
} from 'react-native'
import Modal from 'react-native-modal'
import CloseIcon from '@components/close-button'

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
	const [modalContent, setModalContent] = useState<ContentType | null>(null)

	const showModal = (content: ContentType) => {
		setModalContent(content)
		setModalVisible(true)
	}

	const hideModal = () => {
		setModalContent(null)
		setModalVisible(false)
	}

	const Background: FC<PropsWithChildren> = ({ children }) => {
		return !modalContent?.banner ? (
			<ImageBackground
				// imageStyle={imageStyle}
				style={styles.imageStyle}
				source={{
					uri: 'https://s.yimg.com/ny/api/res/1.2/8y6wUwbKd.9Wbx_MS7t.Vw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTUwNQ--/https://media.zenfs.com/en-US/homerun/fx_empire_176/716acf40f2f984c032e885a3b3a0cf62',
				}}
				children={children}
			/>
		) : (
			<Background children={children} />
		)
	}

	return (
		<ModalContext.Provider value={{ showModal, hideModal }}>
			{children}
			<Modal
				useNativeDriver
				isVisible={true}
				onDismiss={hideModal}
				coverScreen
				animationOutTiming={500}
				backdropTransitionInTiming={300}
				style={{ margin: 0, padding: 0 }}>
				<Background>
					<CloseIcon onPress={hideModal} />
				</Background>
			</Modal>
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
	imageStyle: { height: '50%', width: '100%', backgroundColor: 'red' },
	container: {},
})
