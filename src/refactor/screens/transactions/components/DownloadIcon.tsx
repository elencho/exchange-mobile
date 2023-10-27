import React, { useState } from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { useSelector } from 'react-redux'
import Download from '@app/assets/images/Download'
import colors from '@app/constants/colors'
import { generateFile } from '@app/utils/walletUtils'

interface Props {
	isInstantTrade: boolean
}

const DownloadIcon: React.FC<Props> = ({ isInstantTrade }) => {
	const {
		transactions: { fromDateTime, toDateTime, cryptoFilter, typeFilter },
		trades: { fromDateTimeQuery, toDateTimeQuery, cryptoCodeQuery },
	} = useSelector((state) => state)
	const [loading, setLoading] = useState(false)

	const typeFilterReport =
		typeFilter.length === 0 ? ['DEPOSIT', 'WITHDRAWAL'] : typeFilter

	const reportParams = {
		currency: isInstantTrade ? cryptoCodeQuery : cryptoFilter,
		fromTime: isInstantTrade ? fromDateTimeQuery : fromDateTime,
		toTime: isInstantTrade ? toDateTimeQuery : toDateTime,
		transactionReportTypes: isInstantTrade
			? ['SIMPLE_TRADE']
			: typeFilterReport,
	}

	const linkMain =
		'https://exchange.cryptal.com/exchange/api/v1/mobile/private/report/fetchTransactions/user'

	const downloadFile = () => {
		generateFile(linkMain, setLoading, 'transactions', 'xlsx', reportParams)
	}

	return (
		<Pressable style={styles.container} onPress={downloadFile}>
			{loading ? (
				<MaterialIndicator color="#FFFFFF" animationDuration={3000} size={20} />
			) : (
				<Download style={styles.icon} />
			)}
		</Pressable>
	)
}

export default DownloadIcon

const styles = StyleSheet.create({
	container: {
		height: 45,
		width: 44,
		backgroundColor: colors.BUTTON_DISABLED,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 11,
	},
	icon: {
		width: 18,
		height: 18,
	},
})
