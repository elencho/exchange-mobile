import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import usePersonalInformation from './use-personal-information'

export default function PersonalInformation({
	togglePersonalInfoModal,
}: {
	togglePersonalInfoModal: (visible: boolean) => void
}) {
	const { edit, userInfo } = usePersonalInformation({ togglePersonalInfoModal })
	const { styles } = useTheme(_styles)
	
	return (
		<View style={styles.block}>
			<View style={styles.row}>
				<AppText variant="m" style={styles.white}>
					Personal Information
				</AppText>
				<View style={styles.flex}>
					<AppButton
						variant="text"
						text="Edit"
						style={styles.purple}
						onPress={edit}
					/>
				</View>
			</View>

			<View style={[styles.row, { marginTop: 20 }]}>
				<View style={styles.column}>
					<AppText variant="s" style={styles.secondary}>
						Your Name:
					</AppText>
					<AppText variant="s" style={styles.secondary}>
						Country / City:
					</AppText>
					<AppText variant="s" style={styles.secondary}>
						Postal Code / Address :
					</AppText>
				</View>

				<View style={[styles.column, styles.rightColumn]}>
					<AppText variant="s" style={styles.white}>
						{userInfo?.firstName} {userInfo?.lastName}
					</AppText>
					<AppText variant="s" style={styles.white}>
						{(userInfo?.country || userInfo?.city) &&
							`${userInfo?.country}, ${userInfo?.city}`}
					</AppText>
					<AppText variant="s" style={styles.white} numberOfLines={1}>
						{(userInfo?.postalCode || userInfo?.address) &&
							`${userInfo?.postalCode} / ${userInfo?.address}`}
					</AppText>
				</View>
			</View>
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
		column: {
			height: 60,
			justifyContent: 'space-between',
		},
		rightColumn: {
			alignItems: 'flex-end',
			flex: 1,
			marginLeft: 15,
		},
		block: {
			paddingVertical: 5,
			backgroundColor: theme.color.backgroundPrimary,
			marginBottom: 10,
		},
		flex: {
			flex: 1,
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
			textTransform: 'capitalize',
		},
		upload: {
			flexDirection: 'row',
			alignItems: 'center',
		},
	})
