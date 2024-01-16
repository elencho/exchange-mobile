import React from 'react'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Arrow from '../../../assets/images/Arrow'
import { COUNTRIES_URL_PNG } from '../../../constants/api'
import colors from '../../../constants/colors'
import {
	toggleChooseBankModal,
	toggleTemplatesModal,
	toggleCountriesModal,
} from '../../../redux/modals/actions'
import {
	setIban,
	setReceiverBank,
	setIntermediateBank,
} from '../../../redux/wallet/actions'
import AppInput from '../../AppInput'
import AppText from '../../AppText'
import CountriesModal from '../../UserProfile/CountriesModal'
import TemplatesModal from './TemplatesModal'
import WithdrawalBanksModal from './WithdrawalBanksModal'
import AppDropdown from '@app/components/AppDropdown'
import { setUserInfo } from '@app/refactor/redux/profile/profileSlice'

export default function WithdrawalInfo({ error }) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		profile: { userInfo },
		wallet: {
			currentTemplate,
			withdrawalBank,
			iban,
			receiverBank,
			intermediateBank,
			network,
		},
		transactionsOld: { currency },
	} = state

	const showTemplates = () => dispatch(toggleTemplatesModal(true))
	const showBanks = () => dispatch(toggleChooseBankModal(true))
	const openCountriesModal = () => dispatch(toggleCountriesModal(true))
	const isBank = !!Object.keys(withdrawalBank).length
	const bankTitle = isBank ? withdrawalBank.bankName : 'Choose bank'
	const isTemplate = !!Object.keys(currentTemplate).length
	const isBankOther = withdrawalBank.bankName === 'Other'
	const hasIntermediate = network === 'SWIFT' && currency !== 'GEL'

	const title = !isTemplate
		? 'Choose or Add Template'
		: currentTemplate.templateName

	const bankColor = error && !isBank && { borderColor: '#F45E8C' }
	const templateRed = error && !isTemplate && { borderColor: '#F45E8C' }

	const titleColor = (t) => {
		if (t === 'template') {
			if (!isTemplate) {
				return { color: error ? '#F45E8C' : colors.SECONDARY_TEXT }
			}
			return { color: colors.PRIMARY_TEXT }
		}

		if (error && !isBank) {
			return { color: '#F45E8C' }
		}

		if (t === 'bank') {
			if (!isBank) {
				return { color: colors.SECONDARY_TEXT }
			}
			return { color: colors.PRIMARY_TEXT }
		}
	}

	const showIban = () => {
		return (
			(currentTemplate.templateName === 'New Template' &&
				Object.keys(withdrawalBank).length) ||
			(isTemplate && currentTemplate.templateName !== 'New Template')
		)
	}
	const handleIban = (t) => dispatch(setIban(t))

	const handleUserInfo = (t, infoType) => {
		let updatedInfo
		switch (infoType) {
			case 'address':
				updatedInfo = { ...userInfo, address: t }
				break
			case 'city':
				updatedInfo = { ...userInfo, city: t }
				break
			case 'postal code':
				updatedInfo = { ...userInfo, postalCode: t }
				break
			default:
				break
		}
		dispatch(setUserInfo(updatedInfo))
	}

	const handleBankInfo = (t, infoType) => {
		let updatedInfo
		switch (infoType) {
			case 'bank name':
				updatedInfo = { ...receiverBank, bankName: t }
				break
			case 'bank city':
				updatedInfo = { ...receiverBank, bankPostalCity: t }
				break
			case 'bank postal code':
				updatedInfo = { ...receiverBank, bankPostalCode: t }
				break
			case 'bank address':
				updatedInfo = { ...receiverBank, bankAddress: t }
				break
			case 'bank swift code':
				updatedInfo = { ...receiverBank, swift: t }
				break
			default:
				break
		}
		dispatch(setReceiverBank(updatedInfo))
	}

	const handleIntermediateBank = (t) => {
		dispatch(setIntermediateBank({ swift: t }))
	}

	return (
		<View style={styles.block}>
			<AppText body style={styles.text}>
				Personal Info
			</AppText>

			<AppInput
				label="Name"
				style={styles.name}
				value={
					!userInfo.firstName
						? ''
						: `${userInfo.firstName} ${userInfo.lastName}`
				}
				disabled
			/>

			{isBankOther && (
				<>
					<AppDropdown
						handlePress={openCountriesModal}
						style={styles.languageSelector}
						icon={
							<Image
								source={{
									uri: `${COUNTRIES_URL_PNG}/${userInfo.countryCode}.png`,
								}}
								style={styles.flag}
							/>
						}
						selectedText={userInfo?.country}
						label="Recipient country"
						withLabel
						notClearable
						error={error && !userInfo?.country}
					/>

					<AppInput
						style={styles.inputContainer}
						onChangeText={(t) => handleUserInfo(t, 'city')}
						label="City"
						value={userInfo.city}
						error={error && !userInfo?.city?.trim()}
					/>

					<AppInput
						label="Address"
						onChangeText={(t) => handleUserInfo(t, 'address')}
						style={styles.address}
						value={userInfo.address}
						error={error && !userInfo?.address?.trim()}
					/>
				</>
			)}
			<CountriesModal title="Choose Country" countryDrop />

			<AppText body style={[styles.text, { marginBottom: -5 }]}>
				Bank Info
			</AppText>

			<AppDropdown
				handlePress={showTemplates}
				selectedText={currentTemplate?.templateName}
				label="Choose or Add Template"
				withLabel
				style={styles.dropdown}
				notClearable
				error={error && !isTemplate}
			/>

			{currentTemplate.templateName === 'New Template' ? (
				<>
					<AppDropdown
						selectedText={withdrawalBank?.bankName}
						label="Choose Bank"
						withLabel
						handlePress={showBanks}
						style={styles.dropdown}
						notClearable
						error={error && !isBank}
					/>
					<WithdrawalBanksModal />
				</>
			) : null}

			{showIban() ? (
				<AppInput
					label="Account Number / IBAN"
					style={styles.IBAN}
					value={iban}
					onChangeText={handleIban}
					error={error && !iban?.trim()}
				/>
			) : null}

			{isBankOther && (
				<>
					<AppInput
						label="SWIFT / BIC / Routing number"
						value={receiverBank.swift}
						onChangeText={(t) => handleBankInfo(t, 'bank swift code')}
						style={styles.marginTop}
						error={error && !receiverBank?.swift?.trim()}
					/>
					{hasIntermediate && (
						<AppInput
							label="Intermediary bank SWIFT / BIC / Routing number"
							value={intermediateBank.swift}
							onChangeText={(t) => handleIntermediateBank(t)}
							style={styles.marginTop}
							error={error && !intermediateBank?.swift?.trim()}
						/>
					)}
				</>
			)}

			<TemplatesModal />
		</View>
	)
}

const styles = StyleSheet.create({
	block: {
		backgroundColor: colors.PRIMARY_BACKGROUND,
		paddingVertical: 22,
		// marginBottom: 12,
	},
	dropdownText: {
		flex: 1,
		paddingLeft: 8,
	},
	dropdown: {
		borderWidth: 1,
		height: 45,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 22,
		borderColor: '#42475D',
	},
	IBAN: {
		marginTop: 22,
	},
	inputContainer: {
		marginBottom: 20,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowInputs: {
		width: '47%',
	},
	marginTop: {
		marginTop: 22,
	},
	name: {
		marginBottom: 22,
		marginTop: 18,
	},
	address: {
		marginBottom: 30,
	},
	text: {
		color: '#B7BFDB',
		marginLeft: 3,
	},
	languageSelector: {
		borderWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 10,
		paddingRight: 30,
		marginBottom: 22,
		height: 45,
	},
	countryInfo: {
		flexDirection: 'row',
	},
	countryText: {
		color: colors.PRIMARY_TEXT,
	},
	flag: {
		height: 18,
		width: 18,
		borderRadius: 8,
		marginLeft: 4,
		resizeMode: 'stretch',
	},
})
