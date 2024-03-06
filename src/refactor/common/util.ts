import { Keyboard, Platform } from 'react-native'
import VersionCheck from 'react-native-version-check'
import { MutableRefObject, RefCallback, useEffect, useRef } from 'react'
import RNOtpVerify from 'react-native-otp-verify'

export const System = {
	isIos: Platform.OS === 'ios',
	isAndroid: Platform.OS === 'android',
	appId: '6443718356',
	packageName: VersionCheck.getPackageName(),
	currentVersion: VersionCheck.getCurrentVersion(),
	getCountryName: VersionCheck.getCountry(),
} as const

export const useInterval = (callback: () => void, delayMillis: number) => {
	const savedCallback = useRef(callback)

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		function tick() {
			savedCallback.current()
		}
		let id = setInterval(tick, delayMillis)
		return () => clearInterval(id)
	}, [delayMillis])
}

export const useSmsOtpVerifier = (setValue: (val: string) => void) => {
	const otpHandler = (message: string) => {
		if (message !== 'Timeout Error.') {
			const otpMatch = /(\d{4})/g.exec(message)
			const otp = otpMatch ? otpMatch[1] : ''

			setValue(otp)
			Keyboard.dismiss()
		} else {
			return RNOtpVerify.removeListener()
		}
	}

	useEffect(() => {
		if (System.isAndroid) {
			RNOtpVerify.getOtp()
				.then(() => RNOtpVerify.addListener(otpHandler))
				.catch()
		}
		return () => RNOtpVerify.removeListener()
	}, [setValue])
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

type MutableRefList<T> = Array<
	RefCallback<T> | MutableRefObject<T> | undefined | null
>

export function mergeRefs<T>(...refs: MutableRefList<T>): RefCallback<T> {
	return (val: T) => {
		setRef(val, ...refs)
	}
}

export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
	refs.forEach((ref) => {
		if (typeof ref === 'function') {
			ref(val)
		} else if (ref != null) {
			ref.current = val
		}
	})
}
