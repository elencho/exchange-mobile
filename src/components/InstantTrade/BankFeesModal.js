import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Amex from '../../assets/images/Amex'
import Mastercard from '../../assets/images/MC_Card'
import Visa from '../../assets/images/Visa'
import colors from '../../constants/colors'
import { toggleBankFeesModal } from '../../redux/modals/actions'
import AppModal from '../AppModal'
import AppText from '../AppText'
import FeeModalRow from './FeeModalRow'

export default function BankFeesModal() {
	const dispatch = useDispatch()
	const bankFeesModalVisible = useSelector(
		(state) => state.modals.bankFeesModalVisible
	)

	const state = useSelector((state) => state.trade)
	const [arrayToIterate, setArrayToIterate] = useState([])
	const [hasAmex, setHasAmex] = useState(false)

	const {
		balance: { balances },
		fiat,
		depositProvider,
	} = state

	useEffect(() => {
		balances?.forEach((b) => {
			if (b.currencyCode === fiat && b.depositMethods.ECOMMERCE) {
				b.fees.forEach((f) => {
					if (f.type === 'DEPOSIT' && f.provider === depositProvider) {
						setArrayToIterate(f.feeRange)
					}
				})
			}
		})
	}, [fiat, depositProvider, balances])

	let amexCheck = []

	useEffect(() => {
		arrayToIterate.forEach((f) => {
			f.feeData.forEach((fd) => {
				if (Object.values(fd).includes('AMEX')) {
					amexCheck.push(fd)
				}
			})
		})
		setHasAmex(amexCheck.length > 0)
	}, [arrayToIterate])

	const hide = () => {
		dispatch(toggleBankFeesModal(false))
	}

	const children = (
		<>
			<View style={[styles.row, { marginBottom: 20 }]}>
				<AppText style={[styles.subtext, styles.flex]} body>
					From - To
				</AppText>
				<View style={[styles.icons, hasAmex && styles.flex]}>
					<View style={styles.iconContainer}>
						<Mastercard />
					</View>
					<View style={[styles.iconContainer, !hasAmex && { marginLeft: 35 }]}>
						<Visa />
					</View>
					{hasAmex && (
						<View style={styles.iconContainer}>
							<Amex />
						</View>
					)}
				</View>
			</View>

			{arrayToIterate.map((f, i, a) => {
				let mastercard
				let visa
				let amex
				f.feeData.forEach((fd) => {
					if (fd.subMethod === 'MASTERCARD')
						mastercard = fd.percentageValue * 100
					if (fd.subMethod === 'VISA') visa = fd.percentageValue * 100
					if (fd.subMethod === 'AMEX') amex = fd.percentageValue * 100
				})
				return (
					<View key={i}>
						<FeeModalRow
							start={f.rangeStart}
							end={f.rangeEnd}
							mastercard={mastercard}
							visa={visa}
							amex={amex}
							hasAmex={hasAmex}
						/>
						{i < a.length - 1 && <View style={styles.line} />}
					</View>
				)
			})}
		</>
	)

	return (
		<AppModal
			visible={bankFeesModalVisible}
			hide={hide}
			title="About Bank Fees"
			bottom
			children={children}
		/>
	)
}

const styles = StyleSheet.create({
	icons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	flex: {
		flex: 0.5,
	},
	iconContainer: {
		width: 40,
		height: 25,
		backgroundColor: 'rgba(146, 142, 186, 0.18)',
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	line: {
		borderBottomWidth: 0.5,
		borderBottomColor: '#2E2E4D',
		marginVertical: 12,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	subtext: {
		color: colors.SECONDARY_TEXT,
	},
})
