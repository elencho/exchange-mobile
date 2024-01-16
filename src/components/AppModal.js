import Constants from 'expo-constants'
import React, { memo, useEffect, useRef, useState } from 'react'
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
} from 'react-native'
import Modal from 'react-native-modal'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useSelector } from 'react-redux'
import colors from '../constants/colors'
import AppText from './AppText'
import AppToast from './AppToast'
import Background from './Background'
import CloseModalIcon from './InstantTrade/CloseModalIcon'
import ModalTop from './ModalTop'
import Headline from './TransactionHistory/Headline'
import { useModal } from '@components/modal/global_modal'

function AppModal({
	children,
	visible,
	hide,
	bottom,
	title,
	fullScreen,
	custom,
	onModalHide,
	onDismiss,
	modalStyle,
	delayedOpen,
}) {
	const webViewVisible = useSelector((state) => state?.modals?.webViewVisible)
	const { isBiometricScreenOpened, isInternetScreenOpened } = useSelector(
		(state) => state.common
	)
	const { isModalVisible, modalContent } = useModal()

	const globalScreenOpened =
		(isModalVisible && modalContent) ||
		isBiometricScreenOpened ||
		isInternetScreenOpened

	// For bottom modals after Biometric Unlock
	const [isBottomVisible, setIsBottomVisible] = useState(false)
	useEffect(() => {
		if ((bottom || delayedOpen) && visible) {
			setTimeout(() => {
				setIsBottomVisible(true)
			}, 0)
		}
	}, [globalScreenOpened, visible])

	useEffect(() => {
		if (bottom || delayedOpen) {
			if (globalScreenOpened) {
				setIsBottomVisible(false)
			}
		}
		globalScreenOpened && Keyboard.dismiss()
	}, [globalScreenOpened])

	return (
		!globalScreenOpened &&
		webViewVisible && (
			<Modal
				isVisible={
					bottom || delayedOpen
						? visible && !globalScreenOpened && isBottomVisible
						: visible && !globalScreenOpened
				}
				onBackdropPress={hide}
				onSwipeComplete={hide}
				// swipeDirection="down"
				propagateSwipe={true}
				backdropTransitionOutTiming={0}
				style={[styles.modal, modalStyle]}
				animationOutTiming={500}
				backdropTransitionInTiming={300}
				onModalHide={onModalHide}
				hideModalContentWhileAnimating
				useNativeDriver
				useNativeDriverForBackdrop
				onDismiss={onDismiss}
				// coverScreen={false}
			>
				<RootSiblingParent>
					{bottom && (
						<KeyboardAvoidingView
							behavior={Platform.select({
								android: undefined,
								ios: 'padding',
							})}
							keyboardVerticalOffset={Platform.select({
								ios: 0,
								android: 500,
							})}>
							<ModalTop bottom={bottom} />
							<View style={styles.bottom}>
								{title && (
									<AppText
										header
										style={[styles.header, bottom && { marginLeft: 8 }]}>
										{title}
									</AppText>
								)}
								{children}
							</View>
						</KeyboardAvoidingView>
					)}
					{fullScreen && (
						<Background modal>
							<CloseModalIcon onPress={hide} />
							{title && <Headline title={title} />}
							{children}
						</Background>
					)}
					{custom && children}
				</RootSiblingParent>
				<AppToast />
			</Modal>
		)
	)
}
export default memo(AppModal)

const styles = StyleSheet.create({
	bottom: {
		paddingTop: 40,
		paddingHorizontal: 10,
		paddingBottom: 40,
		backgroundColor: colors.PRIMARY_BACKGROUND,
		marginBottom: -3,
	},
	header: {
		color: colors.PRIMARY_TEXT,
		marginBottom: 12,
	},
	modal: {
		margin: 0,

		justifyContent: 'flex-end',
	},
})
