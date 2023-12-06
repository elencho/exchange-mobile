import { t } from 'i18next'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Browser from '@assets/images/User_profile/Browser.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppModal from '@components/modal'
import AppText from '@components/text'
import { useEditCompany } from './use-edit-company'

interface Props {
	companyInfoModalVisible: boolean
	setCompanyInfoModalVisible: (visible: boolean) => void
}

export default function EditCompanyModal({
	companyInfoModalVisible,
	setCompanyInfoModalVisible,
	companyModalData,
}: Props) {
	const { hide, goToWeb } = useEditCompany({
		setCompanyInfoModalVisible,
	})
	const { styles } = useTheme(_styles)

	const children = (
		<View style={styles.container}>
			<Browser />
			<AppText variant="headline" style={styles.white}>
				{companyModalData.header}
			</AppText>
			<AppText style={styles.secondary}>
				{companyModalData.description}{' '}
				<AppButton
					variant="text"
					text={companyModalData.link}
					onPress={goToWeb}
				/>
			</AppText>

			<AppButton
				variant="primary"
				text={companyModalData.button}
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
