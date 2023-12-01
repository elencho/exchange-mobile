import * as Linking from 'expo-linking'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '@assets/images/Logo.svg'
import { Theme, useTheme } from '@theme/index'
import AppBackground from '@components/background'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import {
	otpForLoginThunk,
	resendOtpThunk,
	startLoginThunk,
} from '@store/redux/auth/thunks'
import TwoFaInput from '@components/input_2fa'
import WithKeyboard from '@app/components/WithKeyboard'
import { RootState } from '@app/refactor/redux/rootReducer'
import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { setOtpTimer } from '@store/redux/auth/slice'
import { COUNTDOWN_SECONDS } from '@app/refactor/common/constants'
import KV from '@store/kv/regular'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'

export const ResetOtp = ({
	navigation,
	route,
}: ScreenProp<'ResetOtpInstructions'>) => {
	const dispatch = useDispatch()
	const { theme, styles } = useTheme(_styles)

	const resetOtpType = route.params?.resetOtpType

	const [url, setUrl] = useState('')
	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState(0)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)

	const { otpTimerVisible } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		console.log({ otpTimerVisible, seconds })
		dispatch(setOtpTimer(true))

		const language = KV.get('language')
		setUrl(`https://support.cryptal.com/hc/${language}`)

		return () => {
			dispatch(setOtpTimer(false))
			setValue('')
			setSeconds(0)
		}
	}, [])

	useEffect(() => {
		if (!otpTimerVisible) return

		if (seconds) {
			setTimeout(() => {
				setSeconds(seconds - 1)
			}, 1000)
		} else {
			dispatch(setOtpTimer(false))
		}
	}, [seconds])

	useEffect(() => {
		if (otpTimerVisible) {
			setSeconds(COUNTDOWN_SECONDS)
		}
	}, [otpTimerVisible])

	const resend = () => dispatch(resendOtpThunk())
	const goBack = () => dispatch(startLoginThunk(navigation))
	const openSupport = () => Linking.openURL(url)

	const resendOrCountDown = () => {
		if (otpTimerVisible) {
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
			() => dispatch(otpForLoginThunk({ otp: value, navigation })),
			setGeneralErrorData
		)

	return (
		<AppBackground>
			<WithKeyboard
				keyboardVerticalOffsetIOS={40} // TODO?
				padding={true}
				flexGrow={true}
				modal={undefined}
				refreshControl={undefined}
				scrollUp={undefined}>
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
								navigation={navigation}
								value={value}
								setValue={(txt) => {
									setValue(txt)
									setGeneralErrorData(null)
								}}
								cellCount={6}
								onFill={onCodeFilled}
								indicatorStyle={{ top: '70%' }}
								generalErrorData={generalErrorData}
							/>
						</View>
					)}
				</View>

				{resetOtpType === 'Support' ? (
					<View style={styles.bottom}>
						<AppText style={[styles.secondary]}>
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

export default ResetOtp
