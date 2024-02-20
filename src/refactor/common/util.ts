import { Platform } from 'react-native'
import VersionCheck from 'react-native-version-check'
import { useEffect, useRef } from 'react'
import { removeListener, startOtpListener } from 'react-native-otp-verify'

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
	useEffect(() => {
		if (System.isAndroid) {
			startOtpListener((message) => {
				if (message) {
					const otpMatch = /(\d{4})/g.exec(message)
					const otp = otpMatch ? otpMatch[1] : ''
					setValue(otp)
				}
			})

			return () => removeListener()
		}
	}, [setValue])
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
