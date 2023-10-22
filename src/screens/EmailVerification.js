import { useNavigation } from '@react-navigation/native'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { useDispatch, useSelector } from 'react-redux'
import EmailLoginAuth from '../assets/images/User_profile/EmailLoginAuth.svg'
import AppText from '../components/AppText'
import Background from '../components/Background'
import CloseModalIcon from '../components/InstantTrade/CloseModalIcon'
import PurpleText from '../components/PurpleText'
import TwoFaInput from '../components/TwoFaInput'
import WithKeyboard from '../components/WithKeyboard'
import colors from '../constants/colors'
import {
	startLoginAction,
	startRegistrationAction,
} from '../redux/profile/actions'

export default function EmailVerification({ route }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)

	const {
		profile: { verificationInfo, registrationInputs, timerVisible },
		transactions: { loading },
	} = state

	useEffect(() => {
		dispatch({ type: 'TOGGLE_TIMER', timerVisible: true })
	}, [])

	useEffect(() => {
		if (!timerVisible) {
			setSeconds(30)
			return
		}
		if (!seconds) {
			dispatch({ type: 'TOGGLE_TIMER', timerVisible: false })
			setSeconds(30)
		}
		if (seconds && timerVisible) {
			setTimeout(() => {
				setSeconds(seconds - 1)
			}, 1000)
		}
	}, [seconds, timerVisible])

	const hide = () => {
		if (route.params.fromScreen === 'login') {
			dispatch(startLoginAction(navigation))
		} else if (route.params.fromScreen === 'registration') {
			dispatch(startRegistrationAction(navigation))
		} else {
			navigation.goBack()
		}
	}

	const resend = () => {
		const { callbackUrl } = verificationInfo
		dispatch({
			type: 'RESEND_SAGA',
			url: callbackUrl,
			emailVerification: true,
		})
	}

	const checkMailText = () => {
		if (verificationInfo?.attributes) {
			return (
				/* Animate */
				<View>
					<AppText style={[styles.secondary, { marginBottom: 36 }]}>
						{t('check your {{email}} after registration params{email}', {
							email: registrationInputs?.email,
						})}
					</AppText>
				</View>
			)
		}
		return null
	}

	const resendOrCountDown = () => {
		if (loading) {
			return (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					size={16}
					style={{ flex: 0 }}
				/>
			)
		} else if (timerVisible) {
			return <AppText style={{ color: colors.PRIMARY_TEXT }}>{seconds}</AppText>
		} else {
			return <PurpleText text="resend purple" onPress={resend} />
		}
	}

	return (
		<Background>
			<WithKeyboard flexGrow padding modal>
				<View style={styles.container}>
					<View style={styles.top}>
						<CloseModalIcon onPress={hide} />
					</View>

					<View style={styles.middle}>
						<EmailLoginAuth />

						<View>
							<AppText header style={styles.primary}>
								E-mail Has Been Sent
							</AppText>
						</View>
						{checkMailText()}

						<TwoFaInput
							navigation={navigation}
							value={value}
							setValue={setValue}
							registration
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
		</Background>
	)
}

const styles = StyleSheet.create({
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
		color: colors.PRIMARY_TEXT,
		marginTop: 23,
		marginBottom: 12,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		textAlign: 'center',
		lineHeight: 21,
	},
	top: {
		alignItems: 'flex-end',
		marginTop: 10,
	},
})
