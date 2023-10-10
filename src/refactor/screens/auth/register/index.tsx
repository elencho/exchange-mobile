import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { t } from 'i18next'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from '@assets/images/Logo.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import GeneralError from '@app/components/GeneralError'
import CheckMarks from '@app/components/Registration/CheckMarks'
import PersonalCompanySwitcher from '@app/components/Registration/PersonalCompanySwitcher'
import RegistrationInputs from '@app/components/Registration/RegistrationInputs'
import WithKeyboard from '@app/components/WithKeyboard'
import useRegister from '@app/refactor/screens/register/use-register'
import { Screens } from '@app/refactor/setup/nav/nav'
import { errorHappenedHere } from '@app/utils/appUtils'

interface Props extends NativeStackScreenProps<Screens, 'Registration'> {}

export default function Register({ navigation }: Props) {
	const { styles } = useTheme(_styles)
	const {
		goToSignIn,
		handleRegistration,
		userProfileLoading,
		error,
		validations,
	} = useRegister(navigation)

	return (
		<WithKeyboard
			modal={undefined}
			contentContainerStyle={styles.scrollview}
			refreshControl={undefined}>
			<View style={styles.back}>
				<AppButton
					variant="text"
					text="Back to Log In"
					onPress={goToSignIn}
					style={styles.backText}
				/>
			</View>
			<View style={styles.container}>
				<Logo style={styles.logo} />
				<AppText variant="headline" style={styles.header}>
					Welcome to Cryptal
				</AppText>

				<PersonalCompanySwitcher />

				<GeneralError
					style={styles.error}
					show={errorHappenedHere('Registration')}
				/>

				<RegistrationInputs error={error} validations={validations} />
				<CheckMarks error={error} validations={validations} />

				<AppButton
					variant="primary"
					text="Registerdsda"
					onPress={handleRegistration}
					loading={userProfileLoading}
				/>
				<AppText style={styles.subtext}>
					{t('Have an Account?')}{' '}
					<AppButton variant="text" text={t('Sign In')} onPress={goToSignIn} />
				</AppText>
			</View>
		</WithKeyboard>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
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
