import { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import useCopyToClipboard from '@app/utils/copyToClipboard'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'
import { activateGoogleOtp } from '@app/refactor/redux/profile/profileApi'
import { fetchUserInfoThunk } from '@app/refactor/redux/profile/profileThunks'
import { System } from '@app/refactor/common/util'
import { retryUnauthorizedCall } from '@store/redux/auth/api'
import SecureKV from '@store/kv/secure'
import { parseError } from '@app/refactor/utils/errorUtils'
import { setOTPChangeParams } from '@app/refactor/redux/profile/profileSlice'

interface GoogleAuthProps {
	googleAuthModalVisible: boolean
	toggleGoogleAuthModal: (visible: boolean) => void
}

export const useGoogleAuth = (props: GoogleAuthProps) => {
	const { googleAuthModalVisible, toggleGoogleAuthModal } = props

	const { copyToClipboard } = useCopyToClipboard()
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		profile: { tOTPChangeParams },
	} = state

	const [key, setKey] = useState('')
	const [googleAuthLoading, setGoogleAuthLoading] = useState(false)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
	useEffect(() => {
		return () => setGoogleAuthLoading(false)
	}, [])

	const enable = async () => {
		setGoogleAuthLoading(true)

		await activateGoogleOtp(
			tOTPChangeParams?.changeOTPToken!,
			key,
			tOTPChangeParams?.totp?.totpSecret!
		).then(async (res) => {
			if (res?.status >= 200 && res?.status <= 300) {
				const oldRefresh = await SecureKV.get('refreshToken')
				retryUnauthorizedCall({}, oldRefresh)
				hide()
				dispatch(fetchUserInfoThunk())
				dispatch(setOTPChangeParams(null))
			} else {
				parseError(res, setGeneralErrorData)
			}
		})

		setGoogleAuthLoading(false)
	}

	const handleStore = () => {
		const androidLink =
			'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US'
		const iosLink =
			'https://apps.apple.com/us/app/google-authenticator/id388497605'
		Linking.openURL(System.isIos ? iosLink : androidLink)
			.then(() => {})
			.catch((err) => console.log(err))
	}

	const hide = () => {
		toggleGoogleAuthModal(false)
	}

	const onModalHide = () => {
		setKey('')
	}

	const handleKey = (key: string) => {
		if (key && /^[0-9]+$/.test(key)) setKey(key)
		else setKey('')

		// TODO: Remove after wallets refactor
		dispatch(saveGeneralError(null))
	}

	const handleCopy = () =>
		copyToClipboard(tOTPChangeParams?.totp?.totpSecretEncoded)

	const isKeyEmpty = key?.length === 0
	return {
		handleKey,
		isKeyEmpty,
		handleCopy,
		hide,
		onModalHide,
		handleStore,
		enable,
		googleAuthLoading,
		googleAuthModalVisible,
		tOTPChangeParams,
		key,
		generalErrorData,
		setGeneralErrorData,
	}
}
