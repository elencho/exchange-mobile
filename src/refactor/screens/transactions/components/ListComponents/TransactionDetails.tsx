import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppText from '@app/refactor/common/components/text'
import colors from '@app/constants/colors'

interface Props {
	isInstantTrade: boolean
	transactionDetails: TransactionDetails
}

export default function TransactionDetails({
	isInstantTrade,
	transactionDetails,
}: Props) {
	const {
		method,
		action,
		displayCurrencyCode,
		quoteCurrencyDisplayCode,
		baseCurrencyDisplayCode,
		totalAmount,
		status,
		fee,
		time,
		date,
		amount,
		providerDisplayName,
		type,
		cumulativeCost,
		size,
		price,
		note,
		year,
	} = transactionDetails

	const actionMapping = {
		BID: 'Buy',
		ASK: 'Sell',
	}

	interface Text {
		text: string
	}

	const LeftText = ({ text }: Text) => (
		<View style={styles.leftTextContainer}>
			<AppText style={styles.leftText}>{text}</AppText>
		</View>
	)

	const RightText = ({ text }: Text) => (
		<View style={styles.rightTextContainer}>
			<AppText medium style={styles.rightText}>
				{text}
			</AppText>
		</View>
	)

	const Status = ({ text }: Text) => {
		return (
			<View style={styles.statusContainer}>
				<View style={{ backgroundColor: statusIcon, width: 4, height: 4 }} />
				<AppText style={styles.rightText}>{text}</AppText>
			</View>
		)
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

	const leftInstant = [
		'Transaction type :',
		'Date created :',
		'End Date :',
		'From Amount :',
		'To amount :',
		'Market price :',
		'Status :',
	]

	const rightInstant = [
		`${actionMapping[action as keyof typeof actionMapping]} - ${type}`,
		`${date} ${year} / ${time}`,
		`${date} ${year} / ${time}`,
		action === 'BID'
			? `${cumulativeCost} ${quoteCurrencyDisplayCode}`
			: `${size} ${baseCurrencyDisplayCode}`,
		action === 'BID'
			? `${size} ${baseCurrencyDisplayCode}`
			: `${cumulativeCost} ${quoteCurrencyDisplayCode}`,
		`${price} ${quoteCurrencyDisplayCode}`,
		<Status text={status ?? ''} />,
	]

	const leftTransactions = [
		'Type :',
		'Network :',
		'Date / Time :',
		'Amount :',
		'Fee :',
		'Total Amount :',
		'Status :',
		'Method :',
		note ? 'Note :' : null,
	]
	const rightTransactions = [
		type,
		providerDisplayName,
		`${date} ${year} / ${time}`,
		amount
			? `${amount} ${displayCurrencyCode}`
			: ` ${cumulativeCost} ${quoteCurrencyDisplayCode}`,
		`${fee} ${displayCurrencyCode}`,
		`${totalAmount} ${displayCurrencyCode}`,
		<Status text={status ?? ''} />,
		method,
		note ? note : null,
	]

	const leftArray = isInstantTrade ? leftInstant : leftTransactions
	const rightArray = isInstantTrade ? rightInstant : rightTransactions

	return (
		<View style={styles.container}>
			<View>
				{leftArray.map((e) => {
					if (e !== null) return <LeftText key={e} text={e} />
				})}
			</View>

			<View style={styles.right}>
				{rightArray.map((e) => {
					if (e !== null) return <RightText text={e} key={Math.random()} />
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	right: {
		alignItems: 'flex-end',
		flex: 1,
	},
	leftText: {
		color: '#C0C5E0',
	},
	leftTextContainer: {
		height: 30,
		justifyContent: 'center',
	},
	rightTextContainer: {
		height: 30,
		justifyContent: 'center',
	},
	rightText: {
		color: colors.PRIMARY_TEXT,
	},
	statusContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
})
