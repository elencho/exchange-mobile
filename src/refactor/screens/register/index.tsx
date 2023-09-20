import Logo from 'assets/images/Logo.svg'
import AppText from 'components/AppText'
import GeneralError from 'components/GeneralError'
import CheckMarks from 'components/Registration/CheckMarks'
import PersonalCompanySwitcher from 'components/Registration/PersonalCompanySwitcher'
import RegistrationInputs from 'components/Registration/RegistrationInputs'
import WithKeyboard from 'components/WithKeyboard'
import { t } from 'i18next'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'refactor/common/components/button'
import useRegister from 'refactor/screens/register/use-register'
//TODO: Reimport
import { COLORS_DARK } from 'refactor/setup/theme/colors'
import { errorHappenedHere } from 'utils/appUtils'

export default function Register() {
	const {
		goToSignIn,
		handleRegistration,
		userProfileLoading,
		error,
		validations,
	} = useRegister()

	return (
		<WithKeyboard scrollUp padding style={styles.scrollview}>
			<View style={styles.back}>
				<Button
					variant="text"
					text="Back to Log In"
					onPress={goToSignIn}
					style={styles.backText}
				/>
			</View>
			<View style={styles.container}>
				<Logo style={styles.logo} />
				<AppText header style={styles.header}>
					Welcome to Cryptal
				</AppText>

				<PersonalCompanySwitcher />

				<GeneralError
					style={styles.error}
					show={errorHappenedHere('Registration')}
				/>

				<RegistrationInputs error={error} validations={validations} />
				<CheckMarks error={error} validations={validations} />

				<Button
					variant="primary"
					text="Register"
					onPress={handleRegistration}
					loading={userProfileLoading}
				/>
				<AppText style={styles.subtext}>
					{t('Have an Account?')}{' '}
					<Button variant="text" text={t('Sign In')} onPress={goToSignIn} />
				</AppText>
			</View>
		</WithKeyboard>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 45,
		paddingHorizontal: '8%',
	},
	scrollview: {
		backgroundColor: COLORS_DARK.backgroundPrimary,
	},
	error: {
		marginTop: 20,
		marginBottom: -15,
	},
	flex: {
		flex: 1,
	},
	header: {
		color: COLORS_DARK.textPrimary,
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
		color: COLORS_DARK.textSecondary,
		marginTop: 40,
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
})
