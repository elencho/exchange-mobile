import { StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import Download from '../../assets/images/Download'
import { generateFile } from '../../utils/walletUtils'
import colors from '../../constants/colors'

const DownloadIcon = () => {
	const [loading, setLoading] = useState(false)

	const linkMain =
		'https://exchange.cryptal.com/exchange/api/v1/private/report/transactions/user'

	const downloadFile = () => {
		generateFile(linkMain, setLoading, 'transactions', 'xlsx')
	}

	return (
		<Pressable style={styles.container} onPress={downloadFile}>
			<Download style={styles.icon} />
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
