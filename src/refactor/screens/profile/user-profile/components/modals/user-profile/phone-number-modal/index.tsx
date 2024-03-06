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
import General_error from '@components/general_error'
import { OTPTypes } from '@app/refactor/types/enums'
import { MaterialIndicator } from 'react-native-indicators'
import AppText from '@components/text'
import { useTheme } from '@theme/index'

export default function PhoneNumberModal({
	phoneNumberModalVisible,
	togglePhoneNumberModal,
}: {
	phoneNumberModalVisible: boolean | string
	togglePhoneNumberModal: (v: boolean | string) => void
}) {
	const {
		userInfo,
		hide,
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
		countryFilterText,
		otpType,
		setCountryFilterText,
		setVerificationCode,
		verificationCode,
		sendVerification,
		alreadySent,
		sendLoading,
		timerVisible,
		seconds,
		language,
		setGeneralErrorData,
		setError,
		inputRef,
	} = usePhoneNumberModal({ phoneNumberModalVisible, togglePhoneNumberModal })

	const number = userInfo?.phoneNumber
	const country = userInfo?.phoneCountry
	const borderColor = error && !country ? '#F45E8C' : '#42475D'
	const { theme } = useTheme()
	const PhoneInputRight = () => {
		const sendText = alreadySent && language === 'en' ? 'Resend' : 'Send'

		if (sendLoading) {
			return (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					size={16}
					style={{ flex: 0 }}
				/>
			)
		} else if (timerVisible && seconds) {
			return (
				<AppText variant="l" style={{ color: theme.color.textPrimary }}>
					{seconds}
				</AppText>
			)
		} else
			return (
				<AppButton variant="text" text={sendText} onPress={sendVerification} />
			)
	}
	const children = () => {
		return (
			<>
				<WithKeyboard
					padding
					flexGrow
					modal
					keyboardShouldPersistTaps="handled"
					scrollUp={false}
					refreshControl={null}>
					<TouchableOpacity activeOpacity={0.99} style={styles.flex}>
						<General_error errorData={generalErrorData} />

						<AppDropdown
							handlePress={handleCountries}
							selectedText={chosenCountry?.phoneCode}
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
							onFocusOrChange={() => {
								setGeneralErrorData(null)
								setError({
									phoneNumber: false,
									verificationCode: error.verificationCode,
								})
							}}
							keyboardType="number-pad"
							error={error.phoneNumber && !(phoneNumber?.trim()?.length > 0)}
							rightComponent={
								(otpType === OTPTypes.SMS ||
									phoneNumberModalVisible === 'fromChangeOtp') && (
									<PhoneInputRight />
								)
							}
						/>
						{(otpType === OTPTypes.SMS ||
							phoneNumberModalVisible === 'fromChangeOtp') && (
							<AppInput
								ref={inputRef}
								style={styles.inputContainer}
								label="Verification Code"
								onChangeText={(text: string) => setVerificationCode(text)}
								value={verificationCode}
								keyboardType="number-pad"
								textContentType="oneTimeCode"
								autoComplete="sms-otp"
								onFocusOrChange={() => {
									setGeneralErrorData(null)
									setError({
										phoneNumber: error.phoneNumber,
										verificationCode: false,
									})
								}}
								error={
									error.verificationCode &&
									!(verificationCode?.trim()?.length > 0)
								}
							/>
						)}
					</TouchableOpacity>

					<AppButton
						variant="primary"
						text="Save"
						onPress={handleSave}
						style={styles.button}
						loading={userProfileButtonsLoading}
					/>
				</WithKeyboard>

				<CountriesModal
					visible={countryModalVisible}
					chosenItem={chosenCountry}
					onCountryChosen={setChosenCountry}
					hide={() => {
						setCountryModalVisible(false)
						setCountryFilterText('')
					}}
					from="UserProfile"
					phoneCountry={true}
					countryFilterText={countryFilterText}
					setCountryFilterText={setCountryFilterText}
				/>
			</>
		)
	}

	return (
		<>
			<AppModal
				visible={!!phoneNumberModalVisible}
				hide={hide}
				fullScreen
				title="My Phone Number"
				children={children()}
			/>
		</>
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
