import React, { ReactNode, memo } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
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

interface AppModalProps {
	children: ReactNode
	visible: boolean
	hide: () => void
	bottom?: boolean
	title?: string
	fullScreen?: boolean
	custom?: boolean
	onModalHide?: () => void
	onDismiss?: () => void
	modalStyle?: StyleSheet.NamedStyles<any>
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
	} = props

	return (
		webViewVisible && (
			<Modal
				isVisible={visible}
				onBackdropPress={hide}
				onSwipeComplete={hide}
				swipeDirection="down"
				propagateSwipe={true}
				style={[styles.modal, modalStyle]}
				animationOutTiming={500}
				backdropTransitionInTiming={300}
				onModalHide={onModalHide}
				hideModalContentWhileAnimating
				useNativeDriver
				useNativeDriverForBackdrop
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
						<Background>
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
export default memo(AppModal)

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
