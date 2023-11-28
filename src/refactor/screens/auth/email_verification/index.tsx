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
import {
	resendOtpThunk,
	verifyRegistrationThunk,
} from '@store/redux/auth/thunks'
import CloseModalIcon from '@app/components/InstantTrade/CloseModalIcon'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { COUNTDOWN_SECONDS } from '@app/refactor/common/constants'
import { setTimer } from '@store/redux/auth/slice'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'

const EmailVerification = ({
	navigation,
	route,
}: ScreenProp<'EmailVerification'>) => {
	const dispatch = useDispatch()
	const { styles, theme } = useTheme(_styles)

	const { from, mail } = route.params

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(0)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)

	const { timerVisible } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		dispatch(setTimer(true))

		return () => {
			dispatch(setTimer(false))
			setValue('')
			setSeconds(0)
		}
	}, [])

	useEffect(() => {
		if (!timerVisible) return

		if (seconds) {
			setTimeout(() => {
				setSeconds(seconds - 1)
			}, 1000)
		} else {
			dispatch(setTimer(false))
		}
	}, [seconds])

	useEffect(() => {
		if (timerVisible) {
			setSeconds(COUNTDOWN_SECONDS)
		}
	}, [timerVisible])

	const checkMailText = () => {
		if (mail) {
			return (
				<View>
					<AppText style={[styles.secondary, { marginBottom: 36 }]}>
						{t('check_your_{{email}}_after_registration', {
							// TODO: Key
							email: mail,
						})}
					</AppText>
				</View>
			)
		}
	}

	const goBack = () => navigation.navigate(from)

	const resend = () => dispatch(resendOtpThunk())

	const resendOrCountDown = () => {
		if (timerVisible) {
			return (
				<AppText style={{ color: theme.color.textPrimary }}>{seconds}</AppText>
			)
		} else {
			return (
				<AppButton
					variant="text"
					text="resend purple"
					onPress={() => {
						resend()
						setGeneralErrorData(null)
					}}
				/>
			)
		}
	}

	const onCodeFilled = () =>
		handleGeneralError(
			() => dispatch(verifyRegistrationThunk({ otp: value, navigation })),
			setGeneralErrorData
		)

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
						<CloseModalIcon onPress={goBack} style={undefined} />
					</View>

					<View style={styles.middle}>
						<EmailLoginAuth />

						<View>
							<AppText variant="headline" style={styles.primary}>
								EMAIL authentication login
							</AppText>
						</View>
						{checkMailText()}

						<TwoFaInput
							navigation={navigation}
							value={value}
							setValue={setValue}
							cellCount={6}
							onFill={onCodeFilled}
							indicatorStyle={{ top: '70%' }}
							generalErrorData={generalErrorData}
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
