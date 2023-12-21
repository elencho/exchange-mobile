import React, { useState } from 'react'
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
import { AnimatedMargin } from '@components/animated/margin'

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
		userProfileButtonsLoading,
		hide,
		countryModalVisible,
		setCountryModalVisible,
		handleFieldChange,
		localUserInfo,
		chosenCountry,
		generalErrorData,
		countryFilterText,
		setCountryFilterText,
		cityMarginExpanded,
		setCityMarginExpanded,
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

	const showCityError = error && (!alphabeticRegex(city) || !city?.trim())
	const showCityErrorLabel = error && !alphabeticRegex(city) && city?.trim()

	const children = (
		<>
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
						selectedText={chosenCountry?.name}
						style={styles.dropdown}
						error={countryError}
					/>

					<AppInput
						onChangeText={(city) => {
							handleFieldChange('city', city)
							setCityMarginExpanded(false)
						}}
						label="City"
						value={city}
						error={
							showCityErrorLabel
								? 'Only English letters allowed'
								: showCityError
						}
						labelBackgroundColor={theme.color.backgroundPrimary}
					/>
					<AnimatedMargin
						min={20}
						max={32}
						durationMillis={250}
						expanded={cityMarginExpanded}
					/>
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
					loading={userProfileButtonsLoading}
					style={styles.button}
					text="Save"
				/>
			</WithKeyboard>

			<CountriesModal
				visible={countryModalVisible}
				onCountryChosen={changeCountry}
				hide={() => {
					setCountryModalVisible(false)
					setCountryFilterText('')
				}}
				from={'UserProfile'}
				chosenItem={chosenCountry}
				countryFilterText={countryFilterText}
				setCountryFilterText={setCountryFilterText}
			/>
		</>
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
			marginBottom: 35,
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
