import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CopyWhite from '../../../assets/images/Wallet/CopyWhite.svg'
import DeleteWhite from '../../../assets/images/Wallet/DeleteWhite.svg'
import Edit from '../../../assets/images/Wallet/Edit.svg'
import colors from '../../../constants/colors'
import {
	toggleEditWhitelistModal,
	toggleEmailAuthModal,
	toggleGoogleOtpModal,
	toggleSmsAuthModal,
	toggleWhitelistActionsModal,
} from '../../../redux/modals/actions'
import useCopyToClipboard from '../../../utils/copyToClipboard'
import { sendOtp } from '../../../utils/userProfileUtils'
import AppModal from '../../AppModal'
import AppText from '../../AppText'

export default function WhitelistActionsModal({
	setDeleteWhitelistOtpVisible,
}) {
	const { copyToClipboard } = useCopyToClipboard()
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		modals: { whitelistActionsModalVisible },
		wallet: { currentWhitelistObj, whitelist },
		auth: { otpType },
	} = state

	const hide = () => {
		dispatch(toggleWhitelistActionsModal(false))
		setDeleteWhitelistOtpVisible(false)
	}

	const handlePress = (a) => {
		switch (a) {
			case 'Edit Whitelist':
				hide()
				setTimeout(() => {
					dispatch(toggleEditWhitelistModal(true))
				}, 1000)
				break
			case 'Delete Whitelist':
				hide()
				setTimeout(() => {
					if (otpType === 'TOTP') dispatch(toggleGoogleOtpModal(true))
					if (otpType === 'EMAIL') dispatch(toggleEmailAuthModal(true))
					if (otpType === 'SMS') dispatch(toggleSmsAuthModal(true))
					setDeleteWhitelistOtpVisible(true)
				}, 1000)
				if (otpType !== 'TOTP') sendOtp()
				break
			case 'Copy Address':
				copyToClipboard(currentWhitelistObj?.address)
				break
			case 'Copy Tag':
				copyToClipboard(currentWhitelistObj?.tag)
				break
			default:
				break
		}
	}

	const image = (a) => {
		switch (a) {
			case 'Edit Whitelist':
				return <Edit />
			case 'Delete Whitelist':
				return <DeleteWhite />
			case 'Copy Address':
				return <CopyWhite />
			default:
				;<View />
				break
		}
	}

	const tag = () => {
		if (whitelist[0]) {
			return whitelist[0]?.tag
		}
		return
	}

	const array = ['Edit Whitelist', 'Delete Whitelist', 'Copy Address']

	const children = (
		<View style={{ marginBottom: -15, paddingHorizontal: 13 }}>
			{array.map((a) => (
				<Pressable
					style={styles.pressable}
					key={a}
					onPress={() => handlePress(a)}>
					{image(a)}
					<AppText body style={styles.primary}>
						{a}
					</AppText>
				</Pressable>
			))}
			{tag() && (
				<Pressable
					style={styles.pressable}
					onPress={() => handlePress('Copy Tag')}>
					<CopyWhite />
					<AppText body style={styles.primary}>
						Copy Tag
					</AppText>
				</Pressable>
			)}
		</View>
	)

	return (
		<AppModal
			bottom
			title="Choose Action"
			visible={whitelistActionsModalVisible}
			hide={hide}
			children={children}
		/>
	)
}

const styles = StyleSheet.create({
	pressable: {
		flexDirection: 'row',
		paddingVertical: 7,
		alignItems: 'center',
		height: 45,
	},
	primary: {
		color: colors.PRIMARY_TEXT,
		marginLeft: 20,
	},
})
