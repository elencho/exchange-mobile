import { t } from 'i18next'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Browser from '@assets/images/User_profile/Browser.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppModal from '@components/modal'
import AppText from '@components/text'
import { useEditCompany } from './use-edit-company'

export default function EditCompanyModal() {
	const {
		companyInfoModalVisible,
		companyInfoModalHeader,
		companyInfoModalDescription,
		companyInfoModalLink,
		companyInfoModalButton,
		hide,
		goToWeb,
	} = useEditCompany()
	const { styles } = useTheme(_styles)

	const children = (
		<View style={styles.container}>
			<Browser />
			<AppText variant="l" style={styles.white}>
				{companyInfoModalHeader ?? 'Go To web'}
			</AppText>
			<AppText style={styles.secondary}>
				{t(companyInfoModalDescription ?? 'Visit Website')}{' '}
				<AppButton
					variant="text"
					text={companyInfoModalLink ?? 'Web Link'}
					onPress={goToWeb}
				/>
			</AppText>

			<AppButton
				variant="primary"
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

const _styles = (theme: Theme) =>
	StyleSheet.create({
		button: {
			marginTop: 38,
			width: '54%',
		},
		container: {
			alignItems: 'center',
		},
		secondary: {
			color: theme.color.textSecondary,
			textAlign: 'center',
		},
		white: {
			color: theme.color.textPrimary,
			marginVertical: 16,
		},
	})
