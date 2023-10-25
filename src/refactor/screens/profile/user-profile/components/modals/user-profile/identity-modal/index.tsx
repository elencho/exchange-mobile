import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleProp, StyleSheet, View } from 'react-native'
import Identity from '@assets/images/User_profile/Identity.svg'
import { Theme, useTheme } from '@theme/index'
import AppModal from '@components/modal'
import AppText from '@components/text'
import { useIdentityModal } from './use-identity-modal'

export default function IdentityModal() {
	const { t } = useTranslation()
	const { hide, identityModalVisible } = useIdentityModal()
	const { styles } = useTheme(_styles)

	const Dot = ({ color, style }: { color: string; style?: StyleProp<any> }) => (
		<View
			style={{
				width: 4,
				height: 4,
				backgroundColor: color,
				marginRight: 8,
				...style,
			}}
		/>
	)

	const Bullet = ({ text, isLast }: { text: number; isLast: boolean }) => {
		const verificationText = `verification text key ${text}`
		return (
			t(verificationText) !== '' && (
				<View style={{ flexDirection: 'row', marginBottom: isLast ? 0 : 10 }}>
					<Dot color="#969CBF" style={{ marginTop: 7 }} />
					<AppText style={{ color: '#969CBF' }}>{verificationText}</AppText>
				</View>
			)
		)
	}

	const children = (
		<>
			<View style={styles.row}>
				<Identity />

				<View style={{ marginLeft: 15 }}>
					<AppText variant="l" style={styles.title}>
						Verification Modal Title
					</AppText>

					<View style={styles.row}>
						<Dot color="#FFC65C" />
						<AppText style={styles.subtext}>
							Not verified (in verification modal)
						</AppText>
					</View>
				</View>
			</View>

			<AppText style={[{ color: '#969CBF' }, styles.marginVertical]}>
				Advantages of verification
			</AppText>

			{[1, 2, 3, 4, 5].map((b, i, a) => (
				<View key={b}>
					<Bullet text={b} isLast={i === a.length - 1} />
				</View>
			))}
		</>
	)

	return (
		<AppModal
			hide={hide}
			visible={identityModalVisible}
			children={children}
			bottom
		/>
	)
}
const _styles = (theme: Theme) =>
	StyleSheet.create({
		marginVertical: {
			marginTop: 27,
			marginBottom: 18,
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		subtext: {
			color: theme.color.textPrimary,
		},
		title: {
			marginBottom: 5,
			color: theme.color.textPrimary,
		},
	})
