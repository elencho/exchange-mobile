import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import useCompanyInformation from './use-company-information'

export const CompanyInformation = ({
	setCompanyInfoModalVisible,
	setCompanyModalData,
}) => {
	const { openModal, userInfo } = useCompanyInformation({
		setCompanyInfoModalVisible,
		setCompanyModalData,
	})
	const { styles } = useTheme(_styles)
	return (
		<View style={styles.block}>
			<View style={[styles.row, { justifyContent: 'space-between' }]}>
				<AppText variant="title" style={styles.white}>
					Company Information
				</AppText>
				<AppButton variant="text" text="Edit" onPress={openModal} />
			</View>

			<View style={[styles.row, { marginTop: 20 }]}>
				<View>
					<AppText variant="l" style={styles.secondary}>
						Company Name:
					</AppText>
					<View style={{ marginVertical: 5 }} />
					<AppText variant="l" style={styles.secondary}>
						Company Number:
					</AppText>
				</View>

				<View style={[styles.column, styles.rightColumn]}>
					<AppText variant="l" style={styles.white}>
						{userInfo?.company}
					</AppText>
					<View style={{ marginVertical: 5 }} />
					<AppText variant="l" style={styles.white}>
						{userInfo?.companyCode}
					</AppText>
				</View>
			</View>

			{userInfo?.directors?.length ? <View style={styles.line} /> : null}
			{userInfo?.directors?.map((d: Directors, i: number, a: Directors[]) => (
				<View
					style={[styles.director, i === a.length - 1 && { marginBottom: 0 }]}
					key={d.id}>
					<AppText variant="l" style={styles.secondary}>
						Director 0{i + 1}:
					</AppText>
					<AppText variant="l" style={styles.white}>
						{d.firstName} {d.lastName}
					</AppText>
				</View>
			))}
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		check: {
			width: 4,
			height: 4,
			backgroundColor: '#25D8D1',
			marginRight: 8,
		},
		circle: {
			borderWidth: 1,
			borderColor: '#9EA6D0',
			width: 22,
			height: 22,
			borderRadius: 15,
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: -2,
			marginLeft: 7,
		},
		director: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: 11,
		},
		rightColumn: {
			alignItems: 'flex-end',
			flex: 1,
		},
		block: {
			paddingVertical: 25,
			backgroundColor: theme.color.backgroundPrimary,
			marginBottom: 10,
		},
		flex: {
			flex: 1,
		},
		line: {
			height: 1,
			marginVertical: 20,
			width: '100%',
		},
		imageContainer: {
			width: 35,
			height: 37,
			alignItems: 'center',
			justifyContent: 'center',
		},
		justify: {
			justifyContent: 'space-between',
			flex: 1,
			height: 37,
			marginLeft: 25,
		},
		row: {
			flexDirection: 'row',
		},
		purple: {
			alignSelf: 'flex-end',
		},
		secondary: {
			color: theme.color.textSecondary,
		},
		switch: {
			transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
			position: 'absolute',
			right: -7,
			top: 0,
		},
		white: {
			color: theme.color.textPrimary,
		},
		upload: {
			flexDirection: 'row',
			alignItems: 'center',
		},
	})
