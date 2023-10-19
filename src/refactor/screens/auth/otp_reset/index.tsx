import * as Linking from 'expo-linking'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '@assets/images/Logo.svg'
import { Theme, useTheme } from '@theme/index'
import AppBackground from '@components/background'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import KVStore from '@store/kv'
import { resendOtpThunk, startLoginThunk } from '@store/redux/auth/thunks'
import TwoFaInput from '@app/components/TwoFaInput'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { ScreenProp } from '@app/refactor/setup/nav/nav'

export const ResetOtpInstructions = (
	props: ScreenProp<'ResetOtpInstructions'>
) => {
	const dispatch = useDispatch()
	const { theme, styles } = useTheme(_styles)

	const resetOtpType = props.route.params?.resetOtpType

	const state = useSelector((state: RootState) => state.auth)
	const { callbackUrl, timerVisible } = state

	const [url, setUrl] = useState('')
	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(30)

	const goBack = () => dispatch(startLoginThunk(props.navigation))
	const openSupport = () => Linking.openURL(url)

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

	useEffect(() => {
		state.timerVisible = true

		const language = KVStore.get('language')
		setUrl(`https://support.cryptal.com/hc/${language}`)

		return () => {
			setValue('')
			state.timerVisible = false
			setSeconds(30)
		}
	}, [])

	const resend = () => dispatch(resendOtpThunk('Login2Fa'))

	const resendOrCountDown = () => {
		if (false) {
			// TODO: transactions: { loading }
			return (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					size={16}
					style={{ flex: 0 }}
				/>
			)
		} else if (timerVisible) {
			return (
				<AppText style={{ color: theme.color.textPrimary }}>{seconds}</AppText>
			)
		} else {
			return <AppButton variant="text" text="resend purple" onPress={resend} />
		}
	}

	return (
		<AppBackground>
			<WithKeyboard modal={undefined} refreshControl={undefined}>
				<TouchableOpacity style={styles.back} onPress={goBack}>
					<AppButton variant="text" text="Go Back" style={styles.backText} />
				</TouchableOpacity>
				<View style={styles.middle}>
					<Logo style={styles.logo} />
					<View>
						<AppText variant="headline" style={styles.primary}>
							Reset One Time Password
						</AppText>
					</View>
					{resetOtpType === 'Support' && (
						<AppText style={styles.secondary}>
							{t('Contact Our')}{' '}
							<AppButton
								variant="text"
								text="support team"
								onPress={openSupport}
							/>{' '}
							{t('for instructions')}
						</AppText>
					)}
					{resetOtpType === 'Manual' && (
						<View>
							<AppText style={[styles.secondary, { marginBottom: 40 }]}>
								Enter the code you received on the email
							</AppText>
							<TwoFaInput
								navigation={props.navigation}
								value={value}
								setValue={setValue}
								login
								fromResetOtp
								indicatorStyle={{ top: '70%' }}
								withdrawal={undefined}
								whitelist={undefined}
								registration={undefined}
							/>
						</View>
					)}
				</View>

				{resetOtpType === 'Support' ? (
					<View style={styles.bottom}>
						<AppText style={[styles.secondary, { marginHorizontal: '15%' }]}>
							<AppText>
								Note: After OTP reset, withdrawals will not be available for
							</AppText>{' '}
							<AppText medium style={{ color: '#8D92AD' }}>
								48 hours
							</AppText>
						</AppText>
					</View>
				) : (
					<View style={styles.row}>
						<AppText style={[styles.secondary, { marginRight: 5 }]}>
							Didn't receive code?
						</AppText>
						{resendOrCountDown()}
					</View>
				)}
			</WithKeyboard>
		</AppBackground>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		back: {
			flexDirection: 'row',
			alignItems: 'center',

			marginTop: 28,
			width: '33%',
		},
		backText: {
			marginBottom: 2,
			marginLeft: 10,
		},
		bottom: {
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: 44,
		},
		container: {
			flex: 1,
			backgroundColor: theme.color.backgroundPrimary,
		},
		logo: {
			width: 47,
			height: 53,
			resizeMode: 'contain',
		},
		middle: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		primary: {
			color: theme.color.textPrimary,
			marginTop: 27,
			marginBottom: 12,
			textAlign: 'center',
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
			alignSelf: 'center',
			marginBottom: 44,
		},
		secondary: {
			color: theme.color.textSecondary,
			textAlign: 'center',
			lineHeight: 21,
		},
	})

export default ResetOtpInstructions
