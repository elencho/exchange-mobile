import * as SecureStore from 'expo-secure-store'
import { t } from 'i18next'
import React from 'react'
import { Linking, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Browser from '../../assets/images/User_profile/Browser.svg'
import colors from '../../constants/colors'
import { webProfileUtil } from '../../utils/userProfileUtils'
import AppButton from '../AppButton'
import AppModal from '../AppModal'
import AppText from '../AppText'
import PurpleText from '../PurpleText'

export default function EditCompanyModal() {
	const dispatch = useDispatch()
	// const companyInfoModalVisible = useSelector(
	//   (state) => state.modals.companyInfoModalVisible
	// );

	const {
		companyInfoModalVisible,
		companyInfoModalHeader,
		companyInfoModalDescription,
		companyInfoModalLink,
		companyInfoModalButton,
	} = useSelector((state) => state.modals)

	const hide = () => dispatch({ type: 'CLOSE_COMPANY_INFO_MODAL' })

	const goToWeb = async () => {
		const refresh_token = await SecureStore.getItemAsync('refreshToken')
		const data = await webProfileUtil(refresh_token)
		Linking.openURL(data?.redirectUri)
		hide()
	}

	const children = (
		<View style={styles.container}>
			<Browser />
			<AppText header style={styles.white}>
				{companyInfoModalHeader ?? 'Go To web'}
			</AppText>
			<AppText style={styles.secondary}>
				{t(companyInfoModalDescription ?? 'Visit Website')}{' '}
				<PurpleText
					text={companyInfoModalLink ?? 'Web Link'}
					onPress={goToWeb}
				/>
			</AppText>

			<AppButton
				text={companyInfoModalButton ?? 'OK'}
				style={styles.button}
				onPress={hide}
			/>
		</View>
	)

	return (
		<AppModal
			hide={hide}
			bottom
			visible={companyInfoModalVisible}
			children={children}
		/>
	)
}

const styles = StyleSheet.create({
	button: {
		marginTop: 38,
		width: '54%',
	},
	container: {
		alignItems: 'center',
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		textAlign: 'center',
	},
	white: {
		color: colors.PRIMARY_TEXT,
		marginVertical: 16,
	},
})
