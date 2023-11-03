import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppInput from '@components/input'
import AppModal from '@components/modal'
import AppText from '@components/text'
import AppDropdown from '@app/components/AppDropdown'
import GeneralError from '@app/components/GeneralError'
import InputErrorMsg from '@app/components/InputErrorMsg'
import WithKeyboard from '@app/components/WithKeyboard'
import { COUNTRIES_URL_PNG } from '@app/constants/api'
import { saveUserInfo } from '@app/refactor/redux/profile/actions'
import usePersonalInfoModal from './use-personal-info-modal'
import CountriesModal from '@app/refactor/common/modals/countries'

export default function PersonalInfoModal() {
	const {
		userInfo,
		onChangeText,
		error,
		canEditInfo,
		alphabeticRegex,
		handleReset,
		handleCountries,
		handleSave,
		citizenshipText,
		isProfileUpdating,
		citizenshipDrop,
		countryDrop,
		personalInfoModalVisible,
		hide,
	} = usePersonalInfoModal()
	const dispatch = useDispatch()

	const { styles, theme } = useTheme(_styles)
	const firstName = userInfo?.firstName
	const lastName = userInfo?.lastName
	const email = userInfo?.email
	const country = userInfo?.country
	const countryCode = userInfo?.countryCode
	const city = userInfo?.city
	const postalCode = userInfo?.postalCode
	const address = userInfo?.address
	const citizenship = userInfo?.citizenship

	const citizenshipError = error && !citizenship
	const countryError = error && !country

	const subtext = {
		transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
		position: 'absolute',
		left: -5,
		top: -7,
		backgroundColor: theme.color.backgroundPrimary,
		paddingHorizontal: 8,
	}

	const countryLabel = country ? subtext : {}
	const citizenshipLabel = citizenship ? subtext : {}
	const children = (
		<WithKeyboard flexGrow modal>
			<TouchableOpacity activeOpacity={0.99} style={styles.flex}>
				<AppText style={styles.email}>{email}</AppText>
				{/* <GeneralError
					style={styles.error}
					show={errorHappenedHere('PersonalInfoModal')}
				/> */}

				{!canEditInfo && (
					<>
						<AppInput
							style={styles.inputContainer}
							onChangeText={onChangeText}
							label="First Name"
							value={firstName}
							error={
								error && (!alphabeticRegex(firstName) || !firstName?.trim())
							}
							labelBackgroundColor={theme.color.backgroundPrimary}
						/>
						{error && firstName?.trim() && !alphabeticRegex(firstName) && (
							<InputErrorMsg message="Only English letters allowed" />
						)}
						<AppInput
							style={styles.inputContainer}
							onChangeText={(lastName) =>
								dispatch(saveUserInfo({ ...userInfo, lastName }))
							}
							label="Last Name"
							value={lastName}
							error={error && (!alphabeticRegex(lastName) || !lastName?.trim())}
							labelBackgroundColor={theme.color.backgroundPrimary}
						/>
						{error && lastName?.trim() && !alphabeticRegex(lastName) && (
							<InputErrorMsg message="Only English letters allowed" />
						)}
					</>
				)}

				{!canEditInfo && (
					<AppDropdown
						withLabel
						notClearable
						handlePress={() => handleCountries(null, true)}
						label="Citizenship"
						error={citizenshipError}
						style={styles.dropdown}
						handleClear={handleReset}
						icon={
							<Image
								source={{
									uri: `${COUNTRIES_URL_PNG}/${citizenship}.png`,
								}}
								style={styles.image}
							/>
						}
						selectedText={citizenshipText(citizenship)}
					/>
				)}

				<AppDropdown
					notClearable
					withLabel
					handlePress={() => handleCountries(true)}
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
					onChangeText={(city) => dispatch(saveUserInfo({ ...userInfo, city }))}
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
						dispatch(saveUserInfo({ ...userInfo, postalCode }))
					}
					label="Postal Code"
					value={postalCode}
					error={error && !postalCode?.trim()}
					labelBackgroundColor={theme.color.backgroundPrimary}
				/>

				<AppInput
					style={styles.inputContainer}
					onChangeText={(address) =>
						dispatch(saveUserInfo({ ...userInfo, address }))
					}
					label="Address"
					value={address}
					error={error && !address?.trim()}
					labelBackgroundColor={theme.color.backgroundPrimary}
				/>
			</TouchableOpacity>

			<AppButton
				variant="primary"
				onPress={handleSave}
				loading={isProfileUpdating}
				style={styles.button}
				text="Save"
			/>

			<CountriesModal
				citizenshipDrop={citizenshipDrop}
				countryDrop={countryDrop}
				reset={handleReset}
			/>
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
