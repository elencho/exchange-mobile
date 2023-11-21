import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
	toggleAddWhitelistModal,
	toggleEditWhitelistModal,
	toggleEmailAuthModal,
	toggleGoogleOtpModal,
	toggleSmsAuthModal,
} from '../../../redux/modals/actions'
import {
	chooseWhitelist,
	editWhitelistAction,
	setNewWhitelist,
} from '../../../redux/wallet/actions'
import { errorHappenedHere } from '../../../utils/appUtils'
import { sendOtp } from '../../../utils/userProfileUtils'
import AppButton from '../../AppButton'
import AppInput from '../../AppInput'
import AppModal from '../../AppModal'
import GeneralError from '../../GeneralError'
import QrScanner from '../../QrScanner'
import GoogleOtpModal from '../../UserProfile/GoogleOtpModal'
import SmsEmailAuthModal from '../../UserProfile/SmsEmailAuthModal'
import ChooseNetworkDropdown from '../../Wallet/Deposit/ChooseNetworkDropdown'
import ChooseNetworkModal from '../../Wallet/Deposit/ChooseNetworkModal'
import WithKeyboard from '../../WithKeyboard'
import QrScannerToggler from '../Withdrawal/widgets/QrScannerToggler'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'

export default function AddEditWhitelistModal({ add, edit }) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		modals: { addWhitelistModalVisble, editWhitelistModalVisble },
		wallet: {
			newWhitelist,
			currentWhitelistObj,
			whitelist,
			network,
			hasMultipleNetworks,
		},
		trade: { currentBalanceObj },
		auth: { otpType },
	} = state

	const hide = () => {
		if (add) dispatch(toggleAddWhitelistModal(false))
		if (edit) dispatch(toggleEditWhitelistModal(false))

		//TODO: remove after wallet refactor
		dispatch(saveGeneralError(null))
	}

	const [error, setError] = useState(false)
	useEffect(() => {
		error && setError(false)
	}, [
		network,
		currentWhitelistObj,
		newWhitelist,
		addWhitelistModalVisble,
		editWhitelistModalVisble,
	])

	const tag = () => {
		if (currentBalanceObj.infos) {
			const type = currentBalanceObj?.infos[network]?.transactionRecipientType

			if (whitelist?.[0]?.tag) {
				return whitelist[0].tag
			}
			return type === 'ADDRESS_AND_TAG'
		}
	}

	const handleAdd = () => {
		const condition = () => {
			const obj = add ? newWhitelist : currentWhitelistObj
			if (tag()) {
				return (
					!network ||
					!obj?.name?.trim() ||
					!obj?.address?.trim() ||
					!obj?.tag?.trim()
				)
			} else {
				return !network || !obj?.name?.trim() || !obj?.address?.trim()
			}
		}

		if (condition()) {
			setError(true)
		} else {
			if (add) {
				if (otpType === 'TOTP') dispatch(toggleGoogleOtpModal(true))
				if (otpType === 'EMAIL') dispatch(toggleEmailAuthModal(true))
				if (otpType === 'SMS') dispatch(toggleSmsAuthModal(true))
				if (otpType !== 'TOTP') sendOtp()
			}
			if (edit) {
				dispatch(editWhitelistAction())
			}
		}
	}

	const clearInputs = () => dispatch(setNewWhitelist({}))

	const handleChange = (name) => {
		if (add) dispatch(setNewWhitelist({ ...newWhitelist, name }))
		if (edit) dispatch(chooseWhitelist({ ...currentWhitelistObj, name }))
	}

	const tagStyle = {
		opacity: add ? 1 : 0.5,
		borderColor: error && !currentWhitelistObj?.tag && '#F45E8C',
	}
	const addressStyle = {
		opacity: add ? 1 : 0.5,
		borderColor: error && !currentWhitelistObj?.address && '#F45E8C',
	}
	const nameStyle = {
		borderColor: error && !currentWhitelistObj?.name && '#F45E8C',
		// marginTop: 32,
	}
	const nameError = add
		? !newWhitelist?.name?.trim()
		: !currentWhitelistObj?.name?.trim()
	const addressError = add ? !newWhitelist?.address?.trim() : false
	const tagError = add ? !newWhitelist?.tag?.trim() : false

	const children = (
		<WithKeyboard padding flexGrow modal>
			<TouchableOpacity
				activeOpacity={0.99}
				style={{ flex: 1, paddingTop: 16 }}>
				<GeneralError
					style={styles.error}
					show={errorHappenedHere('AddEditWhitelistModal')}
				/>

				{hasMultipleNetworks && (
					<View style={styles.input}>
						<ChooseNetworkDropdown disabled={!!edit} whitelist error={error} />
						<ChooseNetworkModal />
					</View>
				)}

				<AppInput
					style={[styles.input, nameStyle]}
					onChangeText={(name) => handleChange(name)}
					value={add ? newWhitelist.name : currentWhitelistObj.name}
					label="Enter Address Name"
					error={error && nameError}
				/>
				<AppInput
					style={[styles.input, addressStyle]}
					onChangeText={(address) =>
						dispatch(setNewWhitelist({ ...newWhitelist, address }))
					}
					right={add && <QrScannerToggler />}
					value={add ? newWhitelist.address : currentWhitelistObj.address}
					label="Destination Address"
					editable={add ? true : false}
					disabled={add ? false : true}
					focusable={add ? true : false}
					error={error && addressError}
				/>
				{tag() && (
					<AppInput
						style={[styles.input, tagStyle]}
						onChangeText={(tag) =>
							dispatch(setNewWhitelist({ ...newWhitelist, tag }))
						}
						value={add ? newWhitelist.tag : currentWhitelistObj.tag}
						label="Address Tag"
						editable={add ? true : false}
						disabled={add ? false : true}
						focusable={add ? true : false}
						error={error && tagError}
					/>
				)}
			</TouchableOpacity>
			<AppButton
				text={add ? 'Add Address' : 'Edit Address'}
				onPress={handleAdd}
				style={{ marginTop: 20, marginBottom: 36 }}
			/>

			<SmsEmailAuthModal type="SMS" whitelist />
			<SmsEmailAuthModal type="Email" whitelist />
			<GoogleOtpModal whitelist />
			<QrScanner
				setAddress={(address) =>
					dispatch(setNewWhitelist({ ...newWhitelist, address }))
				}
			/>
		</WithKeyboard>
	)
	const isVisible = add ? addWhitelistModalVisble : editWhitelistModalVisble

	return (
		<AppModal
			children={children}
			hide={hide}
			fullScreen
			visible={isVisible}
			title={`${add ? 'Add' : 'Edit'} Whitelist`}
			onModalHide={clearInputs}
		/>
	)
}

const styles = StyleSheet.create({
	error: {
		marginBottom: 10,
	},
	input: {
		marginBottom: 16,
	},
})
