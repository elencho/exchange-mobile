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
}: Props) {
	
	const { hide, goToWeb } = useEditCompany({
		setCompanyInfoModalVisible,
	})
	const { styles } = useTheme(_styles)

	const children = (
		<View style={styles.container}>
			<Browser />
			<AppText variant="l" style={styles.white}>
				Go To web
			</AppText>
			<AppText style={styles.secondary}>
				{t('Visit Website')}{' '}
				<AppButton variant="text" text={'Web Link'} onPress={goToWeb} />
			</AppText>

			<AppButton
				variant="primary"
				text={'OK'}
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
