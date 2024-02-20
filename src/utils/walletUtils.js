import axios from 'axios'
import * as FileSystem from 'expo-file-system'
import * as SecureStore from 'expo-secure-store'
import * as Sharing from 'expo-sharing'
import { PermissionsAndroid } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import {
	GET_CRYPTO_ADDRESSES,
	WIRE_DEPOSIT,
	GENERATE_WIRE_PDF,
	GENERATE_CRYPTO_ADDRESS,
	CRYPTO_WITHDRAWAL,
	CRYPTO_WHITELIST,
	WITHDRAWAL_TEMPLATES,
	BANKS_URL,
	WIRE_WITHDRAWAL,
	CARD_WITHDRAWAL,
	CARD_DEPOSIT,
	ADD_CARD_URL,
	DELETE_CARD_URL,
	MAX_WITHDRAWAL,
} from '../constants/api'
import { IS_ANDROID, IS_IOS } from '../constants/system'
import store from '@app/refactor/redux/store'

export const fetchWireDeposit = async (currency, provider) => {
	const data = await axios.get(`${WIRE_DEPOSIT}/${currency}`, {
		params: { provider },
		headers: { requestName: 'fetchWireDeposit', toast: false },
	})
	if (data) return data.data
}

export const generateFile = async (
	link,
	setLoading,
	fileName,
	type,
	reportParams
) => {
	try {
		const state = store?.getState()
		setLoading(true)
		const token = state?.auth?.accessToken
		const bearer = `Bearer ${token}`
		const linkForFile = link
		downloadFile(linkForFile, bearer, fileName, type, reportParams)

		setTimeout(() => {
			setLoading(false)
		}, 500)
	} catch (error) {
		setLoading(false)
		console.error(error)
	}
}

const downloadFile = async (link, bearer, fileName, type, reportParams) => {
	try {
		const location =
			RNFetchBlob.fs.dirs.DownloadDir +
			'/' +
			`${fileName}/${Math.random()}.${type}`
		const locationIOS =
			RNFetchBlob.fs.dirs.CacheDir +
			'/' +
			`${fileName}/${Math.random()}.${type}`
		const android = RNFetchBlob.android
		const mime = `application/${type}`

		RNFetchBlob.config({
			fileCache: true,
			path: location,
			addAndroidDownloads: {
				useDownloadManager: true,
				notification: true,
				mime: mime,
				title: fileName,
				mediaScannable: true,
				description: 'File downloaded by download manager.',
			},
		})

		RNFetchBlob.fetch(
			reportParams ? 'POST' : 'GET',
			link,
			{
				Authorization: bearer,
				'content-type': 'application/json',
			},
			reportParams && JSON.stringify(reportParams)
		)
			.then((res) => {
				let status = res.info().status
				if (status == 200) {
					let base64Str = res.base64()

					RNFetchBlob.fs
						.writeFile(IS_ANDROID ? location : locationIOS, base64Str, 'base64')
						.then(() => {
							if (IS_ANDROID) android.actionViewIntent(location, mime)
							if (IS_IOS) {
								RNFetchBlob.ios.previewDocument(locationIOS)
							}
						})
						.catch((err) => console.log('createFile', err))
				}
			})
			.catch((errorMessage) => {
				console.log('errorMessage', errorMessage)
			})
	} catch (err) {
		console.log(err)
	}
}

export const fetchCryptoAddresses = async (currency, network) => {
	const data = await axios.get(
		`${GET_CRYPTO_ADDRESSES}/${currency}?provider=${network}`
	)
	if (data) return data.data[0]
}

export const generateCryptoAddress = async (currency, network) => {
	const data = await axios({
		method: 'POST',
		url: `${GENERATE_CRYPTO_ADDRESS}/${currency}?provider=${network}`,
		headers: { requestName: 'generateCryptoAddress', toast: false },
	})
	if (data) return data.data
}

export const cryptoWithdrawal = async (OTP, params) => {
	const data = await axios.post(
		CRYPTO_WITHDRAWAL,
		{ ...params },
		{
			headers: { OTP, requestName: 'cryptoWithdrawal', toast: false },
		}
	)
	if (data) return data.status
}

export const fetchWhitelist = async (currency) => {
	const data = await axios.get(CRYPTO_WHITELIST, {
		params: { currency },
	})
	if (data) return data.data
}

export const addWhitelistAddress = async (OTP, params) => {
	const data = await axios.post(
		CRYPTO_WHITELIST,
		{ ...params },
		{
			headers: { OTP, requestName: 'addWhitelistAddress', toast: false },
		}
	)
	if (data) return data.data
}

export const editWhitelistAddress = async (id, name) => {
	const data = await axios({
		method: 'PUT',
		url: `${CRYPTO_WHITELIST}/${id}?name=${name}`,
		headers: { requestName: 'editWhitelistAddress', toast: false },
	})
	if (data) return data.status
}

export const deleteWhitelistAddress = async (id, OTP) => {
	const data = await axios({
		method: 'DELETE',
		headers: { OTP, requestName: 'deleteWhitelistAddress', toast: false },
		url: `${CRYPTO_WHITELIST}/${id}`,
	})
	if (data) return data.status
}

export const fetchTemplates = async (currency, provider) => {
	const data = await axios({
		method: 'GET',
		url: `${WITHDRAWAL_TEMPLATES}?currency=${currency}&provider=${provider}`,
	})
	if (data) return data.data
}

export const deleteTemplates = async (id) => {
	const data = await axios({
		method: 'DELETE',
		url: `${WITHDRAWAL_TEMPLATES}/${id}`,
		headers: { requestName: 'deleteTemplates', toast: false },
	})
	if (data) return data.status
}

export const fetchBanks = async (provider) => {
	const data = await axios({
		method: 'GET',
		url: `${BANKS_URL}?provider=${provider}`,
	})
	if (data) return data.data
}

export const wireWithdrawal = async (OTP, params) => {
	const data = await axios.post(
		WIRE_WITHDRAWAL,
		{ ...params },
		{
			headers: { OTP, requestName: 'wireWithdrawal', toast: false },
		}
	)
	if (data) return data.status
}

export const cardWithdrawal = async (OTP, params) => {
	const data = await axios.post(
		CARD_WITHDRAWAL,
		{ ...params },
		{
			headers: { OTP, requestName: 'cardWithdrawal', toast: false },
		}
	)
	if (data) return data.status
}

export const maxWithdrawal = async (params) => {
	const data = await axios.get(MAX_WITHDRAWAL, {
		params,
	})
	if (data) return data.data
}

export const cardDeposit = async (payload) => {
	const data = await axios.post(CARD_DEPOSIT, payload, {
		headers: { requestName: 'cardDeposit', toast: false },
	})
	if (data) return data.data
}

export const addCard = async (payload) => {
	const data = await axios.post(ADD_CARD_URL, payload, {})
	if (data) return data.data
}

export const deleteCard = async (cardId) => {
	const data = await axios.delete(DELETE_CARD_URL, {
		params: { cardId },
		headers: { requestName: 'deleteCard', toast: false },
	})
	if (data) return data.status
}
