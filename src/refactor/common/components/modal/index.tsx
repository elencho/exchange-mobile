import React, { ReactNode, memo, useEffect, useState } from 'react'
import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
} from 'react-native'
import Modal from 'react-native-modal'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Theme, useTheme } from '@theme/index'
import Background from '@components/background'
import CloseIcon from '@components/close-button'
import { Headline } from '@components/headline'
import AppText from '@components/text'
import AppToast from '@components/app_toast'
import { ModalTop } from './modal-parts'
import { useModal } from './use-modal'
import { useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'

interface AppModalProps {
	children: ReactNode
	visible: boolean
	hide: () => void
	bottom?: boolean
	title?: string
	fullScreen?: boolean
	custom?: boolean
	delayedOpen?: boolean
	onModalHide?: () => void
	onDismiss?: () => void
	modalStyle?: StyleSheet.NamedStyles<any>
	backgroundStyle?: StyleSheet.NamedStyles<any>
	onShow?: () => void
}

const AppModal = (props: AppModalProps) => {
	const { styles } = useTheme(_styles)
	const { webViewVisible } = useModal()
	const {
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
		backgroundStyle,
		delayedOpen,
		onShow,
	} = props

	const { isBiometricScreenOpened } = useSelector(
		(state: RootState) => state.common
	)

	// For bottom modals after Biometric Unlock
	const [isBottomVisible, setIsBottomVisible] = useState(false)
	useEffect(() => {
		if ((bottom || delayedOpen) && visible) {
			setTimeout(() => {
				setIsBottomVisible(true)
			}, 0)
		}
	}, [isBiometricScreenOpened, visible])

	useEffect(() => {
		if (bottom || delayedOpen) {
			if (isBiometricScreenOpened) {
				setIsBottomVisible(false)
			}
		}
		isBiometricScreenOpened && Keyboard.dismiss()
	}, [isBiometricScreenOpened])

	return (
		webViewVisible && (
			<Modal
				isVisible={
					bottom || delayedOpen
						? visible && !isBiometricScreenOpened && isBottomVisible
						: visible && !isBiometricScreenOpened
				}
				onBackdropPress={hide}
				onSwipeComplete={hide}
				// swipeDirection="down"
				propagateSwipe={true}
				style={[styles.modal, modalStyle]}
				animationOutTiming={500}
				backdropTransitionInTiming={300}
				onModalHide={onModalHide}
				hideModalContentWhileAnimating
				useNativeDriver
				useNativeDriverForBackdrop
				onShow={onShow}
				onDismiss={onDismiss}>
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
										variant="headline"
										style={[styles.header, bottom && { marginLeft: 8 }]}>
										{title}
									</AppText>
								)}
								{children}
							</View>
						</KeyboardAvoidingView>
					)}
					{fullScreen && (
						<Background style={backgroundStyle}>
							<CloseIcon onPress={hide} />
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
export default AppModal

const _styles = (theme: Theme) =>
	StyleSheet.create({
		bottom: {
			paddingTop: 40,
			paddingHorizontal: 10,
			paddingBottom: 40,
			backgroundColor: theme.color.backgroundPrimary,
			marginBottom: -3,
		},
		header: {
			color: theme.color.textPrimary,
			marginBottom: 12,
		},
		modal: {
			margin: 0,
			justifyContent: 'flex-end',
		},
	})
