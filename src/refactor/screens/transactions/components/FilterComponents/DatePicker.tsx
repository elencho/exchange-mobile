import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
	setFromDateQuery,
	setToDateQuery,
} from '@app/refactor/redux/trade/tradeSlice'
import {
	setFromTime,
	setToTime,
} from '@app/refactor/redux/transactions/transactionSlice'
import CalendarIcon from '@app/assets/images/Calendar.svg'
import Close from '@app/assets/images/Close.svg'
import colors from '@app/constants/colors'
import { toggleDatePicker } from '@app/refactor/redux/modals/modalsSlice'
import AppText from '@components/text'
import { RootState } from '@app/refactor/redux/rootReducer'

interface Props {
	to?: boolean
	from?: boolean
	isInstantTrade: boolean
}

export default function DatePicker({
	to = false,
	from = false,
	isInstantTrade,
}: Props) {
	const dispatch = useDispatch()
	const {
		trades: {
			fromDateTimeQuery: fromDateTimeTrades,
			toDateTimeQuery: toDateTimeTrades,
		},
		transactions: {
			fromDateTime: fromDateTimeTransactions,
			toDateTime: toDateTimeTransactions,
		},
	} = useSelector((state: RootState) => state)

	const fromDateTime = isInstantTrade
		? fromDateTimeTrades
		: fromDateTimeTransactions
	const toDateTime = isInstantTrade ? toDateTimeTrades : toDateTimeTransactions

	const text = () => {
		const fromDate = fromDateTime ? new Date(fromDateTime) : null
		const toDate = toDateTime ? new Date(toDateTime) : null
		const formatDate = (date: Date) =>
			`${date.getDate()} ${
				date.toDateString().split(' ')[1]
			}, ${date.getFullYear()}`

		if (from && fromDate) return formatDate(fromDate)
		if (to && toDate) return formatDate(toDate)
		if (from && !fromDate) return 'From Date'
		if (to && !toDate) return 'To Date'
		return ''
	}

	const color = () => {
		if ((from && fromDateTime) || (to && toDateTime)) return colors.PRIMARY_TEXT
		if ((from && !fromDateTime) || (to && !toDateTime))
			return colors.SECONDARY_TEXT
	}

	const showDatePickerModal = () => {
		if (from) dispatch(toggleDatePicker({ from: true, to: false }))
		if (to) dispatch(toggleDatePicker({ from: false, to: true }))
	}

	const handleClear = () => {
		if (to)
			isInstantTrade
				? dispatch(setToDateQuery(null))
				: dispatch(setToTime(null))
		if (from)
			isInstantTrade
				? dispatch(setFromDateQuery(null))
				: dispatch(setFromTime(null))
	}
	const shouldShowClear = to ? toDateTime : fromDateTime

	return (
		<Pressable onPress={showDatePickerModal} style={styles.dropdown}>
			<AppText style={{ color: color() }}>{text()}</AppText>
			{shouldShowClear ? (
				<Pressable style={styles.close} onPress={handleClear}>
					<Close width={9} height={9} />
				</Pressable>
			) : (
				<CalendarIcon />
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	dropdown: {
		paddingHorizontal: 22,
		height: 44,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#42475D',
		borderRadius: 6,
		marginBottom: 24,
	},
	close: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: -15,
	},
})
