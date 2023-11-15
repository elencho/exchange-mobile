import React, { useEffect, useState } from 'react'
import { View, Text, Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import useCopyToClipboard from '@app/utils/copyToClipboard'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'

export const useGoogleAuth = (props) => {
	const { googleAuthModalVisible, toggleGoogleAuthModal } = props

	const { copyToClipboard } = useCopyToClipboard()
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		profile: { totpSecretObj },
	} = state

	const [key, setKey] = useState('')
	const [googleAuthLoading, setGoogleAuthLoading] = useState(false)

	useEffect(() => {
		return () => setGoogleAuthLoading(false)
	}, [])

	const enable = () => dispatch(activateGoogleOtp(key, setGoogleAuthLoading))

	const handleStore = () => {
		const androidLink =
			'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US'
		const iosLink =
			'https://apps.apple.com/us/app/google-authenticator/id388497605'
		Linking.openURL(IS_IOS ? iosLink : androidLink)
			.then(() => {})
			.catch((err) => console.log(err))
	}

	const hide = () => {
		// toggleGoogleAuthModal(false)
		// dispatch(setGoogleAuth(false))
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

	const handleCopy = () => copyToClipboard(totpSecretObj?.totpSecretEncoded)

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
		totpSecretObj,
		key,
	}
}
