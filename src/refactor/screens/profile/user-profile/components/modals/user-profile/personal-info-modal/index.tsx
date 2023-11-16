import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppInput from '@components/input'
import AppModal from '@components/modal'
import AppText from '@components/text'
import AppDropdown from '@app/components/AppDropdown'
import InputErrorMsg from '@app/components/InputErrorMsg'
import WithKeyboard from '@app/components/WithKeyboard'
import { COUNTRIES_URL_PNG } from '@app/constants/api'
import usePersonalInfoModal from './use-personal-info-modal'
import CountriesModal from '@app/refactor/common/modals/countries'
import GeneralError from '@components/general_error'

export default function PersonalInfoModal({
	personalInfoModalVisible,
	togglePersonalInfoModal,
}: {
	personalInfoModalVisible: boolean
	togglePersonalInfoModal: (visible: boolean) => void
}) {
	const {
		userInfo,
		error,
		alphabeticRegex,
		changeCountry,
		handleCountries,
		handleSave,
		userProfileLoading,
		hide,
		countryModalVisible,
		setCountryModalVisible,
		handleFieldChange,
		localUserInfo,
		chosenCountry,
		generalErrorData,
	} = usePersonalInfoModal({
		personalInfoModalVisible,
		togglePersonalInfoModal,
	})

	const { styles, theme } = useTheme(_styles)

	const email = userInfo?.email
	const country = localUserInfo?.country
	const countryCode = chosenCountry?.code
	const city = localUserInfo?.city
	const postalCode = localUserInfo?.postalCode
	const address = localUserInfo?.address
	const countryError = error && !country

	const children = (
		<WithKeyboard flexGrow modal>
			<TouchableOpacity activeOpacity={0.99} style={styles.flex}>
				<AppText style={styles.email}>{email}</AppText>
				<GeneralError style={styles.error} errorData={generalErrorData} />

				<AppDropdown
					notClearable
					withLabel
					handlePress={() => handleCountries()}
					icon={
						<Image
							source={{
								uri: `${COUNTRIES_URL_PNG}/${countryCode}.png`,
							}}
							style={styles.image}
						/>
					}
					label="Country"
					selectedText={country}
					style={styles.dropdown}
					error={countryError}
				/>

				<AppInput
					style={styles.inputContainer}
					onChangeText={(city) => handleFieldChange('city', city)}
					label="City"
					value={city}
					error={error && (!alphabeticRegex(city) || !city?.trim())}
					labelBackgroundColor={theme.color.backgroundPrimary}
				/>
				{error && !alphabeticRegex(city) && city?.trim() && (
					<InputErrorMsg message="Only English letters allowed" />
				)}
				<AppInput
					style={styles.inputContainer}
					onChangeText={(postalCode) =>
						handleFieldChange('postalCode', postalCode)
					}
					label="Postal Code"
					value={postalCode}
					error={error && !postalCode?.trim()}
					labelBackgroundColor={theme.color.backgroundPrimary}
				/>

				<AppInput
					style={styles.inputContainer}
					onChangeText={(address) => handleFieldChange('address', address)}
					label="Address"
					value={address}
					error={error && !address?.trim()}
					labelBackgroundColor={theme.color.backgroundPrimary}
				/>
			</TouchableOpacity>

			<AppButton
				variant="primary"
				onPress={handleSave}
				loading={userProfileLoading}
				style={styles.button}
				text="Save"
			/>

			{countryModalVisible && (
				<CountriesModal
					onCountryChosen={changeCountry}
					hide={() => setCountryModalVisible(false)}
					from={'UserProfile'}
				/>
			)}
		</WithKeyboard>
	)

	return (
		<AppModal
			visible={personalInfoModalVisible}
			hide={hide}
			fullScreen
			title="Personal Information"
			children={children}
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		button: {
			marginVertical: 20,
		},
		dropdownText: {
			flex: 1,
			marginHorizontal: 12,
			color: theme.color.textPrimary,
		},
		dropdown: {
			marginBottom: 20,
			marginTop: 10,
		},
		error: {
			marginBottom: 15,
		},
		flex: {
			flex: 1,
		},
		image: {
			width: 18,
			height: 18,
			borderRadius: 20,
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
		secondary: {
			color: theme.color.textPrimary,
		},
		email: {
			color: theme.color.textPrimary,
			marginBottom: 22,
		},
	})
