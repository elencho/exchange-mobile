import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import List from '../../../assets/images/List.svg'
import WarningWhite from '../../../assets/images/Wallet/Warning_White.svg'
import colors from '../../../constants/colors'
import images from '../../../constants/images'
import { monthsShort } from '../../../constants/months'
import { toggleGenerateRequestModal } from '../../../redux/modals/actions'
import { generateCryptoAddressAction } from '../../../redux/wallet/actions'
import AppText from '../../AppText'
import PurpleText from '../../PurpleText'
import Headline from '../../TransactionHistory/Headline'

export default function FlexBlock({ reason, restrictedUntil, type }) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		transactionsOld: { code },
		trade: { currentBalanceObj },
		wallet: { network },
	} = state

	const text = () => {
		if (reason === 'no address') {
			return 'description no addresses'
		} else if (reason === 'OTP_RESET') {
			return `description ${type} OTP_RESET`
		} else if (reason === 'SUPPORT') {
			return `description ${type} support`
		} else if (reason === 'METHOD') {
			return `description does not have ${type} method`
		} else {
			return null
		}
	}

	const image = () => {
		if (reason === 'no address') {
			return <List style={{ marginBottom: 20 }} />
		} else {
			return <WarningWhite style={{ marginBottom: 20 }} />
		}
	}

	const headline = () => {
		if (reason === 'no address') {
			return 'title no addresses'
		} else if (reason === 'OTP_RESET') {
			return `title ${type} OTP_RESET`
		} else if (reason === 'SUPPORT') {
			return `title ${type} support`
		} else if (reason === 'METHOD') {
			return `title does not have ${type} method`
		} else {
			return null
		}
	}

	const addAddress = () => {
		if (network === 'ERC20' || network === 'BEP20') {
			dispatch(toggleGenerateRequestModal(true))
		} else if (currentBalanceObj.depositMethods.WALLET) {
			const provider = currentBalanceObj.depositMethods.WALLET[0].provider
			dispatch(generateCryptoAddressAction(code, provider))
		}
	}

	const date = (timestamp) => {
		const date = new Date(timestamp)
		return `${date.getDate()} ${
			monthsShort[date.getMonth()]
		}, ${date.getFullYear()} / ${date.toLocaleTimeString()}`
	}

	return (
		<View style={styles.flexBlock}>
			{image()}

			<AppText header style={styles.headline}>
				{headline()}
			</AppText>
			<AppText body style={styles.description}>
				{text()}
			</AppText>
			{reason === 'no address' && (
				<PurpleText text="+ Add Address" onPress={addAddress} />
			)}
			{restrictedUntil && (
				<AppText body style={styles.description}>
					Reinstate date:{'  '}
					<AppText style={{ color: 'white' }}>{date(restrictedUntil)}</AppText>
				</AppText>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	description: {
		color: colors.SECONDARY_TEXT,
		textAlign: 'center',
		lineHeight: 20,
		marginBottom: 40,
		marginTop: 10,
	},
	flexBlock: {
		backgroundColor: colors.PRIMARY_BACKGROUND,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	headline: {
		color: colors.PRIMARY_TEXT,
		textAlign: 'center',
		fontSize: 18,
	},
})
