import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { AppButton } from '@components/button'
import AppModal from '@components/modal'
import AppDropdown from '@app/components/AppDropdown'
import AppInput from '@components/input'
import GeneralError from '@components/general_error'
import WithKeyboard from '@app/components/WithKeyboard'
import { COUNTRIES_URL_PNG } from '@app/constants/api'
import { usePhoneNumberModal } from './use-phone-number-modal'
import CountriesModal from '@app/refactor/common/modals/countries'

export default function PhoneNumberModal({
	phoneNumberModalVisible,
	togglePhoneNumberModal,
}: {
	phoneNumberModalVisible: boolean
	togglePhoneNumberModal: (v: boolean) => void
}) {
	const {
		userInfo,
		hide,
		onModalHide,
		handlePhoneNumber,
		handleSave,
		handleCountries,
		phoneCountry,
		error,
		userProfileButtonsLoading,
		setChosenCountry,
		chosenCountry,
		countryModalVisible,
		setCountryModalVisible,
		phoneNumber,
		generalErrorData,
	} = usePhoneNumberModal({ phoneNumberModalVisible, togglePhoneNumberModal })
	const number = userInfo?.phoneNumber
	const country = userInfo?.phoneCountry
	const borderColor = error && !country ? '#F45E8C' : '#42475D'

	const children = () => {
		return (
			<WithKeyboard
				padding
				flexGrow
				modal
				scrollUp={false}
				refreshControl={null}>
				<TouchableOpacity activeOpacity={0.99} style={styles.flex}>
					<GeneralError style={styles.error} errorData={generalErrorData} />

					<AppDropdown
						handlePress={handleCountries}
						selectedText={chosenCountry?.name}
						notClearable
						withLabel
						label="Choose code"
						style={[styles.dropdown, { borderColor }]}
						icon={
							<Image
								source={{
									uri: `${COUNTRIES_URL_PNG}/${chosenCountry?.code}.png`,
								}}
								style={styles.image}
							/>
						}
					/>

					<AppInput
						style={styles.inputContainer}
						label="Phone Number"
						onChangeText={(text: string) => handlePhoneNumber(text)}
						value={phoneNumber}
						keyboardType="number-pad"
						error={error && !(phoneNumber?.trim()?.length > 2)}
					/>
				</TouchableOpacity>

				<AppButton
					variant="primary"
					text="Save"
					onPress={handleSave}
					style={styles.button}
					loading={userProfileButtonsLoading}
				/>

				<CountriesModal
					visible={countryModalVisible}
					chosenItem={chosenCountry}
					onCountryChosen={setChosenCountry}
					hide={() => setCountryModalVisible(false)}
					from="UserProfile"
					phoneCountry={true}
				/>
			</WithKeyboard>
		)
	}

	return (
		<AppModal
			visible={phoneNumberModalVisible}
			hide={hide}
			onModalHide={onModalHide}
			fullScreen
			title="My Phone Number"
			children={children()}
		/>
	)
}

const styles = StyleSheet.create({
	button: {
		marginVertical: 20,
	},
	dropdownText: {
		flex: 1,
		marginLeft: 12,
	},
	dropdown: {
		borderWidth: 1,
		height: 45,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		paddingHorizontal: 15,
		marginTop: 28,
	},
	error: {
		// marginBottom: 25,
	},
	flex: {
		flex: 1,
	},
	image: {
		width: 18,
		height: 18,
		borderRadius: 10,
		resizeMode: 'stretch',
	},
	inputContainer: {
		marginBottom: 20,
	},
})
