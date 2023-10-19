import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { Theme, useTheme } from '@theme/index'
import AppInput from '@components/input'
import CountriesModal from '@app/components/UserProfile/CountriesModal'
import { toggleCountriesModal } from '@app/redux/modals/actions'

interface Props {
	userType: UserType
	clearErrors: () => void
	registerEnabled: (error: boolean) => void
	onRegisterPressed: (allInputsValid: boolean) => void
}

const RegisterInputs = ({
	userType,
	registerEnabled,
	onRegisterPressed,
}: Props) => {
	const dispatch = useDispatch()
	const { styles, theme } = useTheme(_styles)

	const [mail, setMail] = useState('')
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [phone, setPhone] = useState('')
	const [referal, setReferal] = useState('')
	const [promo, setPromo] = useState('')
	const [termsSelected, setTermsSelected] = useState(false)

	const passLength = pass?.length >= 8
	const passHasUpperLower = /([A-Z].*[a-z]|[a-z].*[A-Z])/.test(pass)
	const passHasNumber = /\d/.test(pass)

	const valid = {
		pass: passLength && passHasUpperLower && passHasNumber,
		similarPasswords: confirmPass === pass,
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(mail),
		phone: phone.length > 0 && /^[0-9]+$/.test(phone),
		terms: termsSelected,
	}

	// TODO: country
	const error = [
		valid.email,
		valid.similarPasswords,
		valid.pass,
		valid.phone,
		valid.terms,
	].some((isValid) => !isValid)

	useEffect(() => {
		registerEnabled(true)
	}, [mail, pass, confirmPass, phone, referal, promo])

	const border = { borderColor: '#F45E8C' }

	// const phoneNumberStyle =
	// 	error && (!v.phoneNumberCheck || !i.phoneCountry) && border
	// const placeholderTextColor =
	// 	error && (!v.phoneNumberCheck || !i.phoneCountry)
	// 		? '#F45E8C'
	// 		: colors.SECONDARY_TEXT

	// const phoneCode = () =>
	// 	countriesConstant?.find((c) => i.phoneCountry === c.code)

	const openCountriesModal = () => dispatch(toggleCountriesModal(true))

	return (
		<>
			<AppInput
				value={mail}
				label="Enter E-mail"
				style={styles.input}
				onChangeText={setMail}
				error={error && 'Enter Valid Email'}
			/>
			<AppInput
				value={pass}
				label="Enter Password"
				style={styles.input}
				onChangeText={setPass}
				secureTextEntry={true}
				error={error && !valid.pass}
			/>
			<Text style={styles.validations}>
				<Text style={error && !passLength && styles.redText}>
					{t('8 or more characters')}
				</Text>
				<Text style={error && !passHasUpperLower && styles.redText}>
					{t('Upper & lowercase letters')}
				</Text>
				<Text style={error && !passHasNumber && styles.redText}>
					{t('At least one number')}
				</Text>
			</Text>
			<AppInput
				value={confirmPass}
				label="Repeat Password"
				labelBackgroundColor={theme.color.backgroundPrimary}
				style={styles.input}
				onChangeText={setConfirmPass}
				secureTextEntry={true}
				error={error && !valid.similarPasswords}
			/>
			{/* <View style={[styles.phoneNumber, phoneNumberStyle]}>
				<Pressable style={styles.number} onPress={openCountriesModal}>
					{i.phoneCountry ? (
						<>
							<Image
								source={{ uri: `${COUNTRIES_URL_PNG}/${i.phoneCountry}.png` }}
								style={styles.flag}
							/>
							<AppText medium style={styles.white}>
								{phoneCode()?.phoneCode}
							</AppText>
						</>
					) : (
						<AppText
							style={{ color: theme.color.textSecondary, marginRight: 10 }}>
							Code
						</AppText>
					)}
					<Arrow />
					<View style={styles.line} />
				</Pressable>
				<TextInput
					value={i.phoneNumber}
					placeholder="Phone Number"
					placeholderTextColor={placeholderTextColor}
					style={{ flex: 1, color: 'white' }}
					keyboardType="numeric"
					onChangeText={(text) => handleInputs(text, 'phone')}
				/>
			</View> */}
			<CountriesModal phoneCountry registration reset={undefined} />
			{userType === 'Personal' && (
				<>
					<AppInput
						value={referal}
						label="Referral Code"
						style={styles.input}
						onChangeText={setReferal}
					/>
					<AppInput
						value={promo}
						label="Promo Code"
						style={[styles.input, { marginTop: 12 }]}
						onChangeText={setPromo}
					/>
				</>
			)}
		</>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		flag: {
			width: 15,
			height: 15,
			borderRadius: 10,
			resizeMode: 'stretch',
		},
		input: {
			marginTop: 22,
		},
		line: {
			width: 1,
			backgroundColor: '#32344C',
			height: 20,
			marginHorizontal: 10,
		},
		number: {
			flexDirection: 'row',
			alignItems: 'center',
			height: '100%',
		},
		phoneNumber: {
			borderWidth: 1,
			height: 45,
			paddingHorizontal: 15,
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: 22,
			marginBottom: -11,
			borderColor: '#42475D',
		},
		subtext: {
			color: theme.color.textSecondary,
			lineHeight: 18,
			marginTop: 5,
			textAlign: 'justify',
		},
		redText: {
			color: theme.color.error,
		},
		validations: {
			color: theme.color.textSecondary,
			fontSize: 11,
			lineHeight: 15,
			textAlign: 'justify',
			marginTop: 8,
		},
		white: {
			color: theme.color.textPrimary,
			marginHorizontal: 10,
		},
	})

export default RegisterInputs
