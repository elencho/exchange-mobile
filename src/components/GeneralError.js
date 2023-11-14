import React, { memo, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import GeneralErrorIcon from '../assets/images/User_profile/General_Error.svg'
import AppText from './AppText'
import { logProfileData } from 'react-native-calendars/src/Profiler'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'

function GeneralError({ style = {}, show = true }) {
	const dispatch = useDispatch()
	const generalError = useSelector((state) => state.errors.generalError)
	const modals = useSelector((state) => state.modals)
	const trade = useSelector((state) => state.trade)
	const transactions = useSelector((state) => state.transactionsOld)
	const wallet = useSelector((state) => state.wallet)
	const profile = useSelector((state) => state.profile)

	useEffect(() => {
		return () => {
			if (generalError) {
				dispatch(saveGeneralError(null))
			}
		}
	}, [modals, trade, transactions, wallet, profile])

	const params =
		generalError?.transParams && Object.keys(generalError?.transParams)
	const message = generalError?.errorMessage
	const errorMessage = !params ? message : `${message} params{${params.join()}}`

	console.log({
		generalError,
		errorMessage,
	})

	return (
		<>
			{generalError && show ? (
				<View style={[styles.container, style]}>
					<GeneralErrorIcon />
					<AppText subtext style={styles.red}>
						{errorMessage}
					</AppText>
				</View>
			) : null}
		</>
	)
}

export default memo(GeneralError)

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(244, 94, 140, 0.08)',
		paddingVertical: 8,
		paddingHorizontal: 17,
		width: '100%',
		borderRadius: 22,
		flexDirection: 'row',
		alignItems: 'center',
	},
	red: {
		color: '#F45E8C',
		flex: 1,
		marginLeft: 13,
		lineHeight: 16,
	},
})
