import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'
import { toggleGoogleOtpModal } from '../../redux/modals/actions'
import { setEmailAuth } from '../../redux/profile/actions'
import AppModal from '../AppModal'
import AppText from '../AppText'
import TwoFaInput from '../TwoFaInput'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'

export default function GoogleOtpModal({
	withdrawal,
	whitelist,
	setTwoFaInputValue,
	twoFaInputValue,
}) {
	const dispatch = useDispatch()
	const navigation = useNavigation()

	const state = useSelector((state) => state)
	const {
		modals: { googleOtpModalVisible },
		profile: { currentSecurityAction },
		errors: { generalError },
	} = state

	const [value, setValue] = useState(twoFaInputValue ?? '')

	const email = currentSecurityAction === 'email'

	const hide = () => {
		dispatch(toggleGoogleOtpModal(false))
		if (email) dispatch(setEmailAuth(false))
		setValue('')
		setTwoFaInputValue && setTwoFaInputValue(null)
		if (generalError) dispatch(saveGeneralError(null))
	}

	useEffect(() => {
		setTwoFaInputValue && setTwoFaInputValue(value)
	}, [value])

	const children = (
		<View style={styles.container}>
			<AppText style={styles.header} header>
				Google Authentication
			</AppText>
			<AppText style={styles.secondary} calendarDay>
				Enter One Time Password
			</AppText>

			<View style={styles.codeInput}>
				<TwoFaInput
					navigation={navigation}
					withdrawal={withdrawal}
					whitelist={whitelist}
					value={value}
					cellCount={6}
					setValue={setValue}
				/>
			</View>
		</View>
	)

	return (
		<AppModal
			children={children}
			bottom
			hide={hide}
			visible={googleOtpModalVisible}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: colors.PRIMARY_BACKGROUND,
	},
	codeInput: {
		marginVertical: 35,
	},
	header: {
		color: colors.PRIMARY_TEXT,
		marginBottom: 10,
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
	},
})
