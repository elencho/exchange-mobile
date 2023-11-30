import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { t } from 'i18next'
import React, { useCallback, useEffect, useState } from 'react'
import {
	Image,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Arrow from '@assets/images/Arrow.svg'
import Logo from '@assets/images/Logo.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppInput from '@components/input'
import AppText from '@components/text'
import {
	registrationFormThunk,
	startRegistrationThunk,
} from '@store/redux/auth/thunks'
import WithKeyboard from '@app/components/WithKeyboard'
import { COUNTRIES_URL_PNG } from '@app/constants/api'
import CountriesModal from '@app/refactor/common/modals/countries'
import { RootState } from '@app/refactor/redux/rootReducer'
import TermsCheck from '@app/refactor/screens/auth/register/components/check_terms'
import PersonalCompanySwitcher from '@app/refactor/screens/auth/register/components/personal_company_switcher'
import { Screens } from '@app/refactor/setup/nav/nav'
import GeneralError from '@components/general_error'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'
import { useFocusEffect } from '@react-navigation/native'

interface Props extends NativeStackScreenProps<Screens, 'Registration'> {}

const Register = ({ navigation }: Props) => {
	const dispatch = useDispatch()
	const { styles, theme } = useTheme(_styles)

	const [userType, setUserType] = useState<UserType>('Personal')
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)

	const [mail, setMail] = useState('')
	const [mailErr, setMailErr] = useState(false)

	const [pass, setPass] = useState('')
	const [passErr, setPassErr] = useState(false)

	const [confirmPass, setConfirmPass] = useState('')
	const [confirmPassErr, setConfirmPassErr] = useState(false)

	const [chosenCountry, setChosenCountry] = useState<Country | undefined>()
	const [countryModalVisible, setCountryModalVisible] = useState(false)

	const [phone, setPhone] = useState('')
	const [phoneErr, setPhoneErr] = useState(false)

	const [termsSelected, setTermsSelected] = useState(false)
	const [termsSelectedErr, setTermsSelectedErr] = useState(false)

	const [referral, setReferral] = useState('')
	const [promo, setPromo] = useState('')

	const authState = useSelector((state: RootState) => state.auth)
	const { countries } = useSelector((state: RootState) => state.common)
	const { authLoading, phoneCountryCode } = authState

	const passLength = pass?.length >= 8
	const passHasUpperLower = /([A-Z].*[a-z]|[a-z].*[A-Z])/.test(pass)
	const passHasNumber = /\d/.test(pass)

	const valid = {
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(mail),
		pass: passLength && passHasUpperLower && passHasNumber,
		confirmPass: confirmPass && confirmPass === pass,
		phone: /^[0-9]+$/.test(phone),
		terms: termsSelected,
	}

	useFocusEffect(
		useCallback(() => {
			dispatch(startRegistrationThunk({ navigation }))
		}, [])
	)

	useEffect(() => {
		setPassErr(pass.length > 0 && !valid.pass)
	}, [pass])

	useEffect(() => {
		setConfirmPassErr(confirmPass.length > 0 && !valid.confirmPass)
	}, [confirmPass])

	useEffect(() => {
		setTermsSelectedErr(false)
	}, [termsSelected])

	useEffect(() => {
		if (!phoneCountryCode) return
		const defaultCountry = countries.find(
			(c: Country) => c.code === phoneCountryCode
		)
		setChosenCountry(defaultCountry)
	}, [phoneCountryCode])

	const onRegisterPressed = async () => {
		const allInputsValid = Object.values(valid).every(Boolean)
		setGeneralErrorData(null)

		if (allInputsValid) {
			setGeneralErrorData(null)
			handleGeneralError(
				() =>
					dispatch(
						registrationFormThunk({
							clientType: userType,
							email: mail,
							passwordNew: pass,
							passwordConfirm: confirmPass,
							phoneNumber: phone,
							phoneCountry: chosenCountry?.code || '',
							referralCode: referral,
						})
					),
				setGeneralErrorData
			)
		} else {
			setMailErr(!valid.email)
			setPassErr(!valid.pass)
			setConfirmPassErr(!valid.confirmPass)
			setPhoneErr(!valid.phone)
			setTermsSelectedErr(!valid.terms)
		}
	}

	const onPhoneCodePressed = () => setCountryModalVisible(true)
	const goToSignIn = () => navigation.replace('Login')
	const goBack = () => navigation.goBack()

	const styleManyChars = passErr && !passLength && styles.redText
	const styleUpperLower = passErr && !passHasUpperLower && styles.redText
	const styleHasNumber = passErr && !passHasNumber && styles.redText

	return (
		<SafeAreaView style={styles.safeArea}>
			<WithKeyboard
				keyboardVerticalOffsetIOS={10}
				scrollUp={true}
				padding={true}
				modal={undefined}
				refreshControl={undefined}
				flexGrow={undefined}>
				<AppButton
					variant="text"
					text="Back"
					onPress={goBack}
					style={[styles.backText, styles.back]}
				/>
				<View style={styles.container}>
					<Logo style={styles.logo} />
					<AppText variant="headline" style={styles.header}>
						Welcome to Cryptal
					</AppText>
					<PersonalCompanySwitcher
						chosenType={userType}
						onUserTypeChanged={setUserType}
					/>
					<GeneralError errorData={generalErrorData} style={styles.error} />
					<AppInput
						value={mail}
						label="Enter E-mail"
						style={styles.input && { marginTop: 27 }}
						onFocusOrChange={() => {
							setMailErr(false)
							setGeneralErrorData(null)
						}}
						onChangeText={setMail}
						error={mailErr && (mail.trim() ? 'Enter Valid Email' : true)}
					/>
					<AppInput
						value={pass}
						label="Enter Password"
						style={styles.input}
						onChangeText={setPass}
						onFocusOrChange={() => {
							setPassErr(false)
							setGeneralErrorData(null)
						}}
						error={passErr}
						secureTextEntry={true}
					/>
					<Text style={styles.validations}>
						<AppText variant="m" style={styleManyChars}>
							8_more_chars_registration
						</AppText>
						<AppText style={styleManyChars}>{', '}</AppText>
						<AppText variant="m" style={styleUpperLower}>
							upper_lowercase_letters_registration
						</AppText>
						<AppText style={styleUpperLower}>{', '}</AppText>
						<AppText variant="m" style={styleHasNumber}>
							at_least_one_number
						</AppText>
					</Text>
					<AppInput
						value={confirmPass}
						label="Repeat Password"
						labelBackgroundColor={theme.color.backgroundPrimary}
						style={[styles.input, { marginTop: 0 }]}
						onChangeText={setConfirmPass}
						onFocusOrChange={() => {
							setConfirmPassErr(false)
							setGeneralErrorData(null)
						}}
						error={confirmPassErr}
						secureTextEntry={true}
					/>
					<View
						style={[
							styles.phoneNumber,
							phoneErr && { borderColor: theme.color.error },
						]}>
						<Pressable
							style={styles.number}
							onPress={onPhoneCodePressed}
							onFocus={() => setPhoneErr(false)}>
							{chosenCountry ? (
								<>
									<Image
										source={{
											uri: `${COUNTRIES_URL_PNG}/${chosenCountry.code}.png`,
										}}
										style={{
											width: 15,
											height: 15,
											borderRadius: 10,
											resizeMode: 'stretch',
										}}
									/>
									<AppText medium style={styles.white}>
										{chosenCountry.phoneCode}
									</AppText>
								</>
							) : (
								<AppText style={styles.code}>Code</AppText>
							)}
							<Arrow />
							<View style={styles.line} />
						</Pressable>
						<TextInput
							value={phone}
							onChangeText={(txt: string) => {
								setPhone(txt)
								setPhoneErr(false)
								setGeneralErrorData(null)
							}}
							onFocus={() => {
								setPhoneErr(false)
								setGeneralErrorData(null)
							}}
							placeholder="Phone Number"
							placeholderTextColor={
								phoneErr ? theme.color.error : theme.color.textSecondary
							}
							style={{ flex: 1, color: 'white' }}
							keyboardType="numeric"
						/>
					</View>
					<CountriesModal
						chosenItem={chosenCountry}
						visible={countryModalVisible}
						onCountryChosen={setChosenCountry}
						hide={() => setCountryModalVisible(false)}
						from="Registration"
						phoneCountry={true}
					/>
					{userType === 'Personal' && (
						<>
							<AppInput
								value={referral}
								label="Referral Code"
								style={styles.input}
								onChangeText={setReferral}
								onFocusOrChange={() => setGeneralErrorData(null)}
							/>
							<AppInput
								value={promo}
								label="Promo Code"
								style={styles.input}
								onChangeText={setPromo}
								onFocusOrChange={() => setGeneralErrorData(null)}
							/>
						</>
					)}
					<TermsCheck
						checked={termsSelected}
						toggleChecked={() => setTermsSelected(!termsSelected)}
						error={termsSelectedErr}
					/>
					<AppButton
						variant="primary"
						text="Register"
						onPress={onRegisterPressed}
						loading={authLoading}
					/>
					<AppText style={styles.subtext}>
						{t('Have an Account?')}{' '}
						<AppButton
							variant="text"
							text={t('Sign In')}
							onPress={goToSignIn}
						/>
					</AppText>
				</View>
			</WithKeyboard>
		</SafeAreaView>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		safeArea: {
			backgroundColor: theme.color.backgroundPrimary,
			flex: 1,
		},
		container: {
			paddingVertical: 45,
			paddingHorizontal: '8%',
		},
		scrollview: {
			backgroundColor: theme.color.backgroundPrimary,
		},
		error: {
			marginTop: 20,
			marginBottom: -15,
		},
		flex: {
			flex: 1,
		},
		header: {
			color: theme.color.textPrimary,
			alignSelf: 'center',
			marginTop: 30,
			marginBottom: 40,
			textAlign: 'center',
		},
		logo: {
			width: 40,
			height: 45,
			alignSelf: 'center',
		},
		subtext: {
			color: theme.color.textSecondary,
			marginTop: 36,
			alignSelf: 'center',
		},
		back: {
			marginTop: 28,
			marginLeft: 15,
		},
		backText: {
			marginBottom: 2,
			marginLeft: 10,
			flex: 1,
		},
		input: {
			marginTop: 11,
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
			borderColor: '#42475D',
		},
		redText: {
			color: theme.color.error,
		},
		validations: {
			color: theme.color.textSecondary,
			fontSize: 11,
			lineHeight: 15,
			marginTop: 8,
		},
		white: {
			color: theme.color.textPrimary,
			marginHorizontal: 10,
		},
		code: {
			color: theme.color.textSecondary,
			marginRight: 10,
		},
	})

export default Register
