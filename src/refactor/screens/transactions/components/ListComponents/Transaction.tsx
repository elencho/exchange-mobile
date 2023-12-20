import React, { Dispatch, SetStateAction, memo } from 'react'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import BuyIcon from '@app/assets/images/Buy.svg'
import DepositlIcon from '@app/assets/images/Deposit.svg'
import SellIcon from '@app/assets/images/Sell.svg'
import WithdrawalIcon from '@app/assets/images/Withdrawal.svg'
import AppText from '@app/refactor/common/components/text'
import { COINS_URL_PNG } from '@app/constants/api'
import colors from '@app/constants/colors'
import { monthsShort } from '@app/constants/months'

interface Props {
	transactionData: any
	isTransfer?: boolean
	isLast: boolean
	setTransactionDetails: Dispatch<SetStateAction<{}>>
}

function Transaction({
	transactionData,
	isTransfer,
	isLast,
	setTransactionDetails,
}: Props) {
	const {
		type,
		status,
		transactionInfo,
		amount,
		currency,
		method,
		baseCurrencyDisplayCode,
		quoteCurrencyDisplayCode,
		creationTime,
		timestamp,
		cumulativeCost,
		size,
		action,
	} = transactionData

	let date: Date | string
	date = new Date(isTransfer ? timestamp : creationTime)
	let year
	const time = date.toTimeString().split(' ')[0]
	year = date.getFullYear()
	date = `${date.getDate()} ${monthsShort[date.getMonth()]} `

	const currentTransaction = {
		...transactionData,
		date,
		time,
		year,
	}

	const showModal = () => setTransactionDetails(currentTransaction)

	const image = () => {
		if (isTransfer) {
			if (type === 'DEPOSIT') return <DepositlIcon />
			if (type === 'WITHDRAWAL') return <WithdrawalIcon />
		} else {
			return (
				<View style={styles.currencyIcons}>
					<Image
						style={styles.icon}
						source={{
							uri: `${COINS_URL_PNG}/${baseCurrencyDisplayCode.toLowerCase()}.png`,
						}}
					/>

					<Image
						style={styles.upperIcon}
						source={{
							uri: `${COINS_URL_PNG}/${quoteCurrencyDisplayCode.toLowerCase()}.png`,
						}}
					/>
				</View>
			)
		}
	}

	const statusIcon =
		status === 'COMPLETED' || status === 'SUCCESS'
			? '#25D8D1'
			: status === 'WAITING_DEPOSIT'
			? '#FADD90'
			: status === 'FAILED'
			? '#BE1E3E'
			: status === 'EXPIRED'
			? '#BE1E3E'
			: status === 'PENDING'
			? '#FADD90'
			: '#F83974'

	const shortenDestination = (destination: string) => {
		if (!destination) return null
		return method === 'WALLET_INTERNAL' || method === 'WALLET'
			? destination?.slice(0, 13) + '...' + destination?.slice(-10)
			: destination
	}

	const title = isTransfer
		? type
		: `${baseCurrencyDisplayCode}-${quoteCurrencyDisplayCode}`
	const amountText = isTransfer ? 'Amount' : 'To Amount'
	const destinationText = isTransfer ? 'Identifier' : 'From Amount'
	const amountDisplay = isTransfer
		? `${amount} ${currency}`
		: action === 'BID'
		? `${size} ${baseCurrencyDisplayCode}`
		: `${cumulativeCost} ${quoteCurrencyDisplayCode}`
	const destinationDisplay = isTransfer
		? shortenDestination(transactionInfo) || '-'
		: action === 'BID'
		? `${cumulativeCost} ${quoteCurrencyDisplayCode}`
		: `${size} ${baseCurrencyDisplayCode}`

	return (
		<Pressable
			onPress={showModal}
			style={[styles.container, isLast && { borderBottomWidth: 0 }]}>
			<View style={styles.topRow}>
				{isTransfer && image()}

				<View style={[styles.middle, isTransfer && { marginLeft: 10 }]}>
					<AppText medium style={styles.primaryText}>
						{title}
					</AppText>
					{!isTransfer && (
						<View style={{ flexDirection: 'row', marginTop: 7 }}>
							{!isTransfer && action && (
								<>
									<View style={styles.typeIcon}>
										{action === 'ASK' ? <SellIcon /> : <BuyIcon />}
									</View>
									<AppText style={[styles.secondaryText]}>
										Instant Trade
									</AppText>
								</>
							)}
						</View>
					)}
					{isTransfer && (
						<AppText style={styles.secondaryText}>{method}</AppText>
					)}
				</View>

				<View style={styles.right}>
					<AppText medium style={styles.secondaryText}>
						{`${date} /${time}`}
					</AppText>
					<View style={styles.statusRow}>
						<AppText style={styles.status}>{status}</AppText>
						<View style={[{ backgroundColor: statusIcon }, styles.bullet]} />
					</View>
				</View>
			</View>

			<View style={styles.row}>
				<AppText style={styles.secondaryText}>{destinationText}</AppText>
				<AppText style={styles.secondaryText}>{destinationDisplay}</AppText>
			</View>

			<View style={styles.row}>
				<AppText style={styles.secondaryText}>{amountText}</AppText>
				<AppText medium style={styles.primaryText}>
					{amountDisplay}
				</AppText>
			</View>
		</Pressable>
	)
}

export default memo(Transaction)

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderBottomColor: '#292943',
		borderBottomWidth: 1,
		paddingBottom: 20,
		marginBottom: 20,
	},
	bullet: { width: 4, height: 4, marginLeft: 5 },

	middle: {
		justifyContent: 'space-between',
		flex: 1,
	},
	right: {
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },

	// Texts
	secondaryText: { fontSize: 14, lineHeight: 16, color: colors.SECONDARY_TEXT },
	status: {
		fontSize: 14,
		lineHeight: 16,
		color: colors.SECONDARY_TEXT,
		marginRight: 5,
	},
	primaryText: {
		fontSize: 14,
		lineHeight: 18,
		color: colors.PRIMARY_TEXT,
		marginBottom: 5,
	},
	row: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 5,
	},
	topRow: {
		flexDirection: 'row',
		marginBottom: 10,
		alignItems: 'center',
	},
	//icons
	currencyIcons: { flexDirection: 'row' },
	icon: {
		width: 30,
		height: 30,
	},
	upperIcon: {
		width: 30,
		height: 30,
		position: 'absolute',
		left: 15,
	},
	title: {
		color: colors.PRIMARY_TEXT,
	},
	typeIcon: {
		marginRight: 6,
	},
})
