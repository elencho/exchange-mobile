import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import EmailLoginAuth from '@assets/images/User_profile/EmailLoginAuth.svg'
import { Theme, useTheme } from '@theme/index'
import AppBackground from '@components/background'
import { AppButton } from '@components/button'
import TwoFaInput from '@components/input_2fa'
import AppText from '@components/text'
import { resendOtpThunk } from '@store/redux/auth/thunks'
import CloseModalIcon from '@app/components/InstantTrade/CloseModalIcon'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { ScreenProp, Screens } from '@app/refactor/setup/nav/nav'

const EmailVerification = ({
	navigation,
	route,
}: ScreenProp<'EmailVerification'>) => {
	const dispatch = useDispatch()
	const { styles, theme } = useTheme(_styles)

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)

	const state = useSelector((state: RootState) => state.auth)
	const { timerVisible } = state

	useEffect(() => {
		state.timerVisible = true
	}, [])

	useEffect(() => {
		state.timerVisible = true
		return () => {
			setValue('')
			state.timerVisible = false
			setSeconds(30)
		}
	}, [])

	useEffect(() => {
		if (!seconds) {
			state.timerVisible = false
			setSeconds(30)
		}
		if (seconds && timerVisible) {
			setTimeout(() => {
				setSeconds(seconds - 1)
			}, 1000)
		}
	}, [seconds, timerVisible])

	const checkMailText = () => {
		if (route.params?.mail) {
			return (
				<View>
					<AppText style={[styles.secondary, { marginBottom: 36 }]}>
						{t('check your {{email}} after registration params{email}', {
							email: route.params.mail,
						})}
					</AppText>
				</View>
			)
		}
	}

	const resend = () => dispatch(resendOtpThunk({ from: 'EmailVerification' }))

	const resendOrCountDown = () => {
		if (timerVisible) {
			return (
				<AppText style={{ color: theme.color.textPrimary }}>{seconds}</AppText>
			)
		} else {
			return <AppButton variant="text" text="resend purple" onPress={resend} />
		}
	}

	return (
		<AppBackground>
			<WithKeyboard
				flexGrow={true}
				padding={true}
				modal={true}
				refreshControl={undefined}
				scrollUp={undefined}>
				<View style={styles.container}>
					<View style={styles.top}>
						<CloseModalIcon
							onPress={() => navigation.navigate('Registration')}
							style={undefined}
						/>
					</View>

					<View style={styles.middle}>
						<EmailLoginAuth />

						<View>
							<AppText variant="headline" style={styles.primary}>
								E-mail Has Been Sent
							</AppText>
						</View>
						{checkMailText()}

						<TwoFaInput
							navigation={navigation}
							value={value}
							setValue={setValue}
							cellCount={6}
							from="Registration"
							indicatorStyle={{ top: '70%' }}
						/>
					</View>

					<View style={styles.row}>
						<AppText style={[styles.secondary, { marginRight: 5 }]}>
							Didn't receive code?
						</AppText>
						{resendOrCountDown()}
					</View>
				</View>
			</WithKeyboard>
		</AppBackground>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingBottom: 45,
		},
		middle: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		primary: {
			color: theme.color.textPrimary,
			marginTop: 23,
			marginBottom: 12,
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
			alignSelf: 'center',
		},
		secondary: {
			color: theme.color.textSecondary,
			textAlign: 'center',
			lineHeight: 21,
		},
		top: {
			alignItems: 'flex-end',
			marginTop: 10,
		},
	})

export default EmailVerification
