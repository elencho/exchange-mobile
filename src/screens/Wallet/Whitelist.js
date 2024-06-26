import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { useDispatch, useSelector } from 'react-redux'
import List from '../../assets/images/List.svg'
import AppText from '../../components/AppText'
import PurpleText from '../../components/PurpleText'
import GoogleOtpModal from '../../components/UserProfile/GoogleOtpModal'
import SmsEmailAuthModal from '../../components/UserProfile/SmsEmailAuthModal'
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown'
import AddEditWhitelistModal from '../../components/Wallet/Whitelist/AddEditWhitelistModal'
import WhitelistActionsModal from '../../components/Wallet/Whitelist/WhitelistActionsModal'
import WhitelistItem from '../../components/Wallet/Whitelist/WhitelistItem'
import colors from '../../constants/colors'
import { toggleAddWhitelistModal } from '../../redux/modals/actions'
import { getWhitelistAction, setNetwork } from '@app/redux/wallet/actions'

export default function Whitelist({ refreshControl }) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		wallet: { whitelist, hasWhitelist, whitelistLoading },
		modals: { addWhitelistModalVisble, editWhitelistModalVisble },
		transactionsOld: { loading },
		trade: {
			currentBalanceObj: { types },
		},
	} = state

	const [seconds, setSeconds] = useState(30)
	const [deleteWhitelistOtpVisible, setDeleteWhitelistOtpVisible] =
		useState(false)

	const isTolCurrency = types.includes('CRYPTO') && types.includes('FIAT')

	const showAddModal = () => dispatch(toggleAddWhitelistModal(true))

	useEffect(() => {
		if (isTolCurrency) {
			dispatch(setNetwork('BEP20'))
			dispatch(getWhitelistAction())
		}
	}, [isTolCurrency])

	const [manualLoading, setManualLoading] = useState(true)
	useEffect(() => {
		// if (!addWhitelistModalVisble) setManualLoading(true)

		setTimeout(() => {
			setManualLoading(false)
		}, 1000)
	}, [addWhitelistModalVisble, editWhitelistModalVisble])

	return (
		<>
			{manualLoading || loading || whitelistLoading ? (
				<MaterialIndicator color="#6582FD" animationDuration={3000} />
			) : (
				<View style={{ flex: 1 }}>
					<View style={styles.block}>
						<WalletCoinsDropdown />
						{hasWhitelist && (
							<View style={styles.note}>
								<AppText subtext style={styles.secondary}>
									Add address for easy withdrawal, Some description here about
									whitelist
								</AppText>
							</View>
						)}
					</View>

					{hasWhitelist ? (
						<>
							<ScrollView
								style={styles.scrollView}
								refreshControl={refreshControl}>
								{whitelist?.map((w) => (
									<WhitelistItem key={w.id} whitelistItem={w} />
								))}
							</ScrollView>

							<Pressable style={styles.button} onPress={showAddModal}>
								<PurpleText text="+ " />
								<PurpleText text="Add Address" />
							</Pressable>
						</>
					) : (
						<View style={styles.flex}>
							<View style={styles.list}>
								<List />
							</View>

							<AppText body style={styles.description}>
								Description here about whitelist
							</AppText>
							<PurpleText text="+ Add Address" onPress={showAddModal} />
						</View>
					)}

					<WhitelistActionsModal
						setDeleteWhitelistOtpVisible={setDeleteWhitelistOtpVisible}
					/>
					<AddEditWhitelistModal add setManualLoading={setManualLoading} />
					<AddEditWhitelistModal edit />

					{deleteWhitelistOtpVisible && (
						<>
							<GoogleOtpModal whitelist />
							<SmsEmailAuthModal
								seconds={seconds}
								setSeconds={setSeconds}
								whitelist
								type="E-mail"
							/>
							<SmsEmailAuthModal
								seconds={seconds}
								setSeconds={setSeconds}
								whitelist
								type="SMS"
							/>
						</>
					)}
				</View>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		borderRadius: 22,
		borderStyle: 'dashed',
		height: 45,
		borderColor: colors.SECONDARY_PURPLE,
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	block: {
		backgroundColor: colors.PRIMARY_BACKGROUND,
		marginBottom: 12,
	},
	description: {
		color: colors.SECONDARY_TEXT,
		textAlign: 'center',
		marginHorizontal: '20%',
		lineHeight: 20,
		marginBottom: 40,
	},
	flex: {
		flex: 1,
		backgroundColor: colors.PRIMARY_BACKGROUND,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 50,
	},
	list: {
		marginBottom: 18,
	},
	secondary: {
		color: '#969CBF',
		lineHeight: 18,
	},
	note: {
		backgroundColor: 'rgba(149, 164, 247, 0.1)',
		borderRadius: 6,
		paddingHorizontal: 26,
		paddingVertical: 14,
		marginTop: 15,
	},
	secondaryPurple: {
		color: colors.SECONDARY_PURPLE,
	},
	scrollView: {
		backgroundColor: colors.PRIMARY_BACKGROUND,
	},
})
