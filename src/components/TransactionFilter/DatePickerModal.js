import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'
import { months } from '../../constants/months'
import { toggleDatePicker } from '../../redux/modals/actions'
import AppModal from '../AppModal'
import AppText from '../AppText'
import CalendarDay from './CalendarDay'
import CalendarHeader from './CalendarHeader'

const theme = {
	calendarBackground: colors.PRIMARY_BACKGROUND,
}

export default function DatePickerModal({ from, to, isInstantTrade }) {
	const dispatch = useDispatch()
	const datePickerVisible = useSelector(
		(state) => state.modals.datePickerVisible
	)
	const fromDateTimeTransactions = useSelector(
		(state) => state.transactions.fromDateTime
	)
	const toDateTimeTransactions = useSelector(
		(state) => state.transactions.toDateTime
	)
	const fromDateTimeTrades = useSelector(
		(state) => state.trade.fromDateTimeQuery
	)
	const toDateTimeTrades = useSelector((state) => state.trade.toDateTimeQuery)
	const fromDateTime = isInstantTrade
		? fromDateTimeTrades
		: fromDateTimeTransactions
	const toDateTime = isInstantTrade ? toDateTimeTrades : toDateTimeTransactions

	const visible = () => {
		if (from) return datePickerVisible.from
		if (to) return datePickerVisible.to
	}

	const dateSubtext = () => {
		if (from) {
			return (
				<View style={styles.subtextContainer}>
					{fromDateTime && (
						<View style={styles.row}>
							<AppText style={styles.subtext} body>
								From Date Selected
							</AppText>
							<AppText medium body style={styles.date}>
								{'  '}
								{new Date(fromDateTime).getDate()}{' '}
								{months[new Date(fromDateTime).getMonth()]}
							</AppText>
						</View>
					)}
				</View>
			)
		}
		if (to) {
			return (
				<View style={styles.subtextContainer}>
					{toDateTime && (
						<View style={styles.row}>
							<AppText style={styles.subtext} body>
								To Date Selected
							</AppText>
							<AppText medium body style={styles.date}>
								{'  '}
								{new Date(toDateTime).getDate()}{' '}
								{months[new Date(toDateTime).getMonth()]}
							</AppText>
						</View>
					)}
				</View>
			)
		}
	}

	const hide = () => dispatch(toggleDatePicker({ from: false, to: false }))

	const children = (
		<Calendar
			style={styles.container}
			theme={theme}
			context={{ date: '' }}
			customHeader={({ month, addMonth }) => (
				<CalendarHeader
					month={month}
					addMonth={addMonth}
					dateSubtext={dateSubtext}
				/>
			)}
			dayComponent={(state) => (
				<CalendarDay
					state={state}
					from={from}
					to={to}
					isInstantTrade={isInstantTrade}
				/>
			)}
		/>
	)

	return (
		<AppModal
			children={children}
			bottom
			visible={visible()}
			hide={hide}
			position="80%"
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: -15,
		marginBottom: -15,
	},
	date: {
		color: '#9096B5',
	},
	modal: {
		backgroundColor: colors.PRIMARY_BACKGROUND,
		paddingVertical: 15,
		flex: 1,
	},
	subtextContainer: {
		marginTop: 12,
		height: 25,
	},
	subtext: {
		color: colors.SECONDARY_TEXT,
		textAlign: 'center',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	text: { color: colors.PRIMARY_TEXT },
})
