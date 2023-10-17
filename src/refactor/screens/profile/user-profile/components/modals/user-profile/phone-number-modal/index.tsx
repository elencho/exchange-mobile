import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { AppButton } from '@components/button'
import AppModal from '@components/modal'
import { CountriesModal } from '@components/modal/countries'
import AppDropdown from '@app/components/AppDropdown'
import AppInput from '@app/components/AppInput'
import GeneralError from '@app/components/GeneralError'
import WithKeyboard from '@app/components/WithKeyboard'
import { usePhoneNumberModal } from './use-phone-number-modal'
import { COUNTRIES_URL_PNG } from '@app/constants/api'
import { errorHappenedHere } from '@app/utils/appUtils'

export default function PhoneNumberModal() {
	const {
		userInfoVariable,
		userInfo,
		countries,
		timerVisible,
		isProfileUpdating,
		phoneNumberModalVisible,
		hide,
		onModalHide,
		handlePhoneNumber,
		handleSave,
		handleCountries,
		phoneCountry,
		error,
	} = usePhoneNumberModal()
	const number = userInfo?.phoneNumber
	const country = userInfo?.phoneCountry
	const borderColor = error && !country ? '#F45E8C' : '#42475D'

	const children = () => {
		return (
			<WithKeyboard padding flexGrow modal>
				<TouchableOpacity activeOpacity={0.99} style={styles.flex}>
					<GeneralError
						style={styles.error}
						show={errorHappenedHere('PhoneNumberModal')}
					/>

					<AppDropdown
						handlePress={handleCountries}
						selectedText={phoneCountry()}
						notClearable
						withLabel
						label="Choose code"
						style={[styles.dropdown, { borderColor }]}
						icon={
							<Image
								source={{
									uri: `${COUNTRIES_URL_PNG}/${country}.png`,
								}}
								style={styles.image}
							/>
						}
					/>

					<AppInput
						style={styles.inputContainer}
						label="Phone Number"
						onChangeText={(text: string) => handlePhoneNumber(text)}
						value={number}
						keyboardType="number-pad"
						error={error && !(number?.trim()?.length > 2)}
					/>
				</TouchableOpacity>

				<AppButton
					variant="primary"
					text="Save"
					onPress={handleSave}
					style={styles.button}
					loading={isProfileUpdating}
				/>

				<CountriesModal phoneCountry />
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
