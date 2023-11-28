import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import Copy from '@assets/images/Copy.svg'
import AppStoreIcon from '@assets/images/User_profile/Appstore.svg'
import PlayStoreIcon from '@assets/images/User_profile/Playstore.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppInput from '@components/input'
import AppModal from '@components/modal'
import AppText from '@components/text'
import { IS_IOS } from '@app/constants/system'
import { useGoogleAuth } from './use-google-auth'
import General_error from '@components/general_error'

export default function GoogleAuthModal(props) {
	const { googleAuthModalVisible, toggleGoogleAuthModal } = props
	const {
		googleAuthLoading,
		isKeyEmpty,
		enable,
		handleStore,
		tOTPChangeParams,
		handleCopy,
		handleKey,
		key,
		hide,
		onModalHide,
		generalErrorData,
	} = useGoogleAuth(props)

	const { theme, styles } = useTheme(_styles)
	const right = (
		<View style={styles.row}>
			<View style={styles.smallLine} />
			{googleAuthLoading ? (
				<MaterialIndicator
					color="#6582FD"
					animationDuration={3000}
					size={16}
					style={{ flex: 0 }}
				/>
			) : (
				<AppButton
					variant="text"
					text="Enable"
					style={isKeyEmpty ? { color: theme.color.textSecondary } : null}
					onPress={enable}
				/>
			)}
		</View>
	)

	const children = (
		<>
			<View style={styles.row}>
				<View style={[styles.flex, styles.justify]}>
					<AppText variant="l" style={styles.header}>
						Authentication
					</AppText>
					<AppText variant="m" style={styles.secondary}>
						Download App on:
					</AppText>
				</View>

				<TouchableOpacity style={styles.store} onPress={handleStore}>
					{IS_IOS ? <AppStoreIcon /> : <PlayStoreIcon />}
				</TouchableOpacity>
			</View>
			<General_error errorData={generalErrorData} />

			<View style={styles.block}>
				<AppText variant="m" style={styles.subtext}>
					{tOTPChangeParams?.totp?.totpSecretEncoded}
				</AppText>
				<View style={styles.line} />
				<TouchableOpacity onPress={handleCopy}>
					<Copy />
				</TouchableOpacity>
			</View>

			<AppInput
				label="Enter Key"
				rightComponent={right}
				onChangeText={handleKey}
				value={key}
				keyboardType="numeric"
			/>
		</>
	)

	return (
		<AppModal
			children={children}
			bottom
			hide={hide}
			visible={googleAuthModalVisible}
			onModalHide={onModalHide}
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		block: {
			backgroundColor: 'rgba(101, 130, 253, 0.06)',
			flexDirection: 'row',
			paddingVertical: 23,
			paddingHorizontal: 30,
			marginVertical: 27,
			alignItems: 'center',
		},
		error: { marginTop: 25 },
		flex: { flex: 1 },
		justify: { justifyContent: 'space-between' },
		line: {
			backgroundColor: 'rgba(74, 77, 116, 0.4)',
			height: '100%',
			width: 1,
			marginHorizontal: 30,
		},
		smallLine: {
			width: 1,
			backgroundColor: 'rgba(74, 77, 116, 0.4)',
			marginHorizontal: 15,
		},
		row: { flexDirection: 'row' },
		store: {
			height: 45,
			width: 120,
		},
		storeIcon: {
			width: '100%',
			height: '100%',
		},
		header: { color: theme.color.textPrimary, fontSize: 19 },
		secondary: { color: theme.color.textSecondary, fontSize: 13 },
		subtext: { color: '#C0C5E0', flex: 1 },
	})
