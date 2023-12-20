import React, { createContext, useState, useContext, ReactNode } from 'react'
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native'

type ModalContextType = {
	showModal: (content: ReactNode) => void
	hideModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isModalVisible, setModalVisible] = useState(false)
	const [modalContent, setModalContent] = useState<ReactNode | null>(null)

	const showModal = (content: ReactNode) => {
		setModalContent(content)
		setModalVisible(true)
	}

	const hideModal = () => {
		setModalContent(null)
		setModalVisible(false)
	}

	return (
		<ModalContext.Provider value={{ showModal, hideModal }}>
			{children}
			<Modal transparent visible={isModalVisible} onRequestClose={hideModal}>
				<View style={styles.modalContainer}>
					<TouchableOpacity style={styles.modalContent} activeOpacity={1}>
						{modalContent}
					</TouchableOpacity>
				</View>
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
})
