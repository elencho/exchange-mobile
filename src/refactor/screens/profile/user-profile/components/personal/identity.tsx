import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { AppButton } from '@components/button'
import AppText from '@components/text'
import { UserStatus } from '@app/refactor/types/enums'

interface IdentityProps {
	userStatus: UserStatusObject
	styles: StyleSheet.NamedStyles<any>
	verify?: () => void
	goToSupport?: () => void
	openModal?: () => void
	userInfoStatus?: UserStatus
}

export const Identity = (props: IdentityProps) => {
	const { userStatus, styles, verify, goToSupport, openModal } = props
	return (
		<View style={styles.row}>
			<View style={[styles.row, styles.flex]}>
				<AppText variant="m" style={styles.white}>
					Identification
				</AppText>

				{!userStatus.verified && (
					<Pressable style={styles.circle} onPress={openModal}>
						<AppText variant="m" style={{ color: '#9EA6D0' }}>
							i
						</AppText>
					</Pressable>
				)}
			</View>

			{userStatus.unverified && (
				<AppButton variant="text" text="Verify" onPress={verify} />
			)}
			{userStatus.pending && (
				<AppButton variant="text" text="Go To Support" onPress={goToSupport} />
			)}
		</View>
	)
}

export const IdentitySecond = (props: IdentityProps) => {
	const { userStatus, styles, userInfoStatus } = props
	return (
		<View style={styles.upload}>
			<View
				style={[
					styles.check,
					{ backgroundColor: userStatus.verified ? '#25D8D1' : '#FFC65C' },
				]}
			/>
			<AppText variant="s" style={styles.secondary}>
				{`Verification subtext ${userInfoStatus}`}
			</AppText>
		</View>
	)
}
