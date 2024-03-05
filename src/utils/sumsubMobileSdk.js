import AsyncStorage from '@react-native-async-storage/async-storage'
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module'
import axios from 'axios'
import { VERIFICATION_TOKEN } from '../constants/api'
import { IS_ANDROID, IS_IOS } from '../constants/system'
import { sumsubVerificationToken } from '../utils/userProfileUtils'
import KV from '@store/kv/regular'
import { setWebViewVisible } from '@store/redux/common/slice'
import store from '@app/refactor/redux/store'

export default async (email) => {
	const token = await sumsubVerificationToken()

	const snsMobileSDK = SNSMobileSDK.init(token, () => {
		return axios({
			url: VERIFICATION_TOKEN,
			method: 'GET',
		}).then((res) => {
			return res.data
		})
	})
		.withBaseUrl('https://api.sumsub.com')
		.withHandlers({
			// Optional callbacks you can use to get notified of the corresponding events
			onStatusChanged: async (event) => {
				if (
					IS_ANDROID &&
					event?.prevStatus === 'Ready' &&
					event?.newStatus === 'Initial'
				) {
					KV.set('webViewVisible', true)
					store.dispatch(setWebViewVisible(true))
				}
			},
			onLog: async (event) => {
				if (IS_ANDROID && event?.message === 'msdk:dismiss') {
					const sleep = (m) => new Promise((r) => setTimeout(r, m))
					await sleep(3000)
					KV.del('webViewVisible', true)
					store.dispatch(setWebViewVisible(false))
				}
			},
			onEvent: async (event) => {
				if (IS_IOS && event?.payload?.eventName === 'msdk:init') {
					KV.set('webViewVisible', true)
					store.dispatch(setWebViewVisible(true))
				}
				if (IS_IOS && event?.payload?.eventName === 'msdk:dismiss') {
					KV.del('webViewVisible')
					store.dispatch(setWebViewVisible(false))
				}
			},
		})
		.withDebug(true)
		.withApplicantConf({
			email: email,
		})
		.withLocale('en') // Optional, for cases when you need to override system locale
		.build()

	snsMobileSDK
		.launch()
		.then((result) => {
			console.log('SumSub SDK State: ' + JSON.stringify(result))
		})
		.catch((err) => {
			console.log('SumSub SDK Error: ' + JSON.stringify(err))
		})
}
