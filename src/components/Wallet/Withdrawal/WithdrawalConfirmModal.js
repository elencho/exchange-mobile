import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../../constants/colors'
import {
	toggleEmailAuthModal,
	toggleGoogleOtpModal,
	toggleSmsAuthModal,
} from '../../../redux/modals/actions'
import { sendOtp } from '../../../utils/userProfileUtils'
import AppButton from '../../AppButton'
import AppInfoBlock from '../../AppInfoBlock'
import AppModal from '../../AppModal'
import AppText from '../../AppText'
import PurpleText from '../../PurpleText'
import GoogleOtpModal from '../../UserProfile/GoogleOtpModal'
import SmsEmailAuthModal from '../../UserProfile/SmsEmailAuthModal'

export default function WithdrawalConfirmModal() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		modals: { withdrawalConfirmModalVisible },
		trade: { currentBalanceObj, fee, card },
		wallet: { network, withdrawalAmount, currentWhitelistObj, iban, memoTag },
		transactionsOld: { code },
		auth: { otpType },
	} = state

	const type = currentBalanceObj?.type
	const isEcommerce = network === 'ECOMMERCE'
	const isCrypto = type === 'CRYPTO'
	const isFiat = type === 'FIAT'

	const [seconds, setSeconds] = useState(30)
	const [twoFaInputValue, setTwoFaInputValue] = useState('')

	const hide = () =>
		dispatch({
			type: 'TOGGLE_WITHDRAWAL_CONFIRM_MODAL',
			withdrawalConfirmModalVisible: false,
		})

	const withdrawalType = () => {
		if (isEcommerce) return 'card'
		if (isCrypto) return 'crypto'
		if (isFiat) return 'wire'
	}

	const confirm = () => {
		if (otpType === 'TOTP') dispatch(toggleGoogleOtpModal(true))
		if (otpType === 'EMAIL') dispatch(toggleEmailAuthModal(true))
		if (otpType === 'SMS') dispatch(toggleSmsAuthModal(true))
		if (otpType !== 'TOTP') sendOtp()
	}

	const networkName = () => {
		let net
		currentBalanceObj?.withdrawalMethods?.WALLET?.forEach((m) => {
			if (m.provider === network) net = m.displayName
		})
		return net
	}

	const identifier = () => {
		if (currentWhitelistObj?.address) return currentWhitelistObj?.address
		if (iban) return iban
		if (card?.cardNumber) return card?.cardNumber
	}

	const needsTag = () => {
		if (currentBalanceObj?.infos) {
			return (
				currentBalanceObj?.infos[network]?.transactionRecipientType ===
				'ADDRESS_AND_TAG'
			)
		} else {
			return false
		}
	}

	const networkInfo = () => {
		if (currentBalanceObj?.infos) {
			return currentBalanceObj?.infos[network]?.walletInfo
		}
	}

	const children = (
		<View style={styles.flex}>
			<SmsEmailAuthModal
				seconds={seconds}
				setSeconds={setSeconds}
				type="SMS"
				withdrawal={withdrawalType()}
				setTwoFaInputValue={setTwoFaInputValue}
				twoFaInputValue={twoFaInputValue}
			/>
			<SmsEmailAuthModal
				seconds={seconds}
				setSeconds={setSeconds}
				type="Email"
				withdrawal={withdrawalType()}
				setTwoFaInputValue={setTwoFaInputValue}
				twoFaInputValue={twoFaInputValue}
			/>
			<GoogleOtpModal
				withdrawal={withdrawalType()}
				setTwoFaInputValue={setTwoFaInputValue}
				twoFaInputValue={twoFaInputValue}
			/>
			<View style={styles.flex}>
				{networkInfo() && (
					<AppInfoBlock
						warning
						content={[
							<Trans
								i18nKey={`${networkInfo()} modal`}
								components={{
									light: <AppText style={{ color: '#FFFBF3' }} />,
									gold: <AppText style={{ color: '#F2DFB4' }} />,
								}}
							/>,
						]}
						style={{ marginTop: 0, marginBottom: 24 }}
					/>
				)}
				<View style={styles.row}>
					<AppText style={styles.leftText}>Confirm Amount</AppText>
					<AppText style={styles.rightText}>
						{fee?.totalAmount} {code}
					</AppText>
				</View>
				<View style={styles.row}>
					<AppText style={styles.leftText}>Confirm Fee</AppText>
					<AppText style={styles.rightText}>
						{fee?.totalFee} {code}
					</AppText>
				</View>
				{isCrypto && (
					<View style={styles.row}>
						<AppText style={styles.leftText}>Confirm Network</AppText>
						<AppText style={styles.rightText}>{networkName()}</AppText>
					</View>
				)}
				<View style={styles.row}>
					<AppText style={styles.leftText}>Confirm Identifier</AppText>
					<AppText style={styles.rightText}>{identifier()}</AppText>
				</View>
				{needsTag() && (
					<View style={styles.row}>
						<AppText style={styles.leftText}>Confirm Tag</AppText>
						<AppText style={styles.rightText}>
							{currentWhitelistObj?.tag ?? memoTag}
						</AppText>
					</View>
				)}
				<View style={[styles.row, { marginTop: 16 }]}>
					<AppText medium style={styles.white}>
						You Will Receive
					</AppText>
					<AppText medium style={styles.whiteRight}>
						{withdrawalAmount} {code}
					</AppText>
				</View>
			</View>

			<AppButton text="Confirm Withdrawal Button" onPress={confirm} />
			<PurpleText
				text="Confirm Withdrawal Cancel"
				style={styles.cancel}
				onPress={hide}
			/>
		</View>
	)

	return (
		<AppModal
			title={`${type} Withdrawal Confirm`}
			visible={withdrawalConfirmModalVisible}
			hide={hide}
			fullScreen
			children={children}
		/>
	)
}

const styles = StyleSheet.create({
	cancel: {
		marginVertical: 25,
		textAlign: 'center',
		paddingVertical: 5,
	},
	flex: {
		flex: 1,
		marginTop: 12,
	},
	leftText: {
		color: colors.SECONDARY_TEXT,
	},
	white: {
		color: colors.PRIMARY_TEXT,
	},
	whiteRight: {
		color: colors.PRIMARY_TEXT,
		flex: 1,
		textAlign: 'right',
		marginLeft: 10,
	},
	rightText: {
		color: '#969CBF',
		flex: 1,
		textAlign: 'right',
		marginLeft: 10,
	},
	row: {
		flexDirection: 'row',
		marginBottom: 10,
	},
})
