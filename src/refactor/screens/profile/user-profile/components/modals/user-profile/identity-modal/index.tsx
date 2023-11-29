import React from 'react'
import { StyleProp, StyleSheet, View } from 'react-native'
import Identity from '@assets/images/User_profile/Identity.svg'
import { Theme, useTheme } from '@theme/index'
import AppModal from '@components/modal'
import AppText from '@components/text'
import { useIdentityModal } from './use-identity-modal'

interface Props {
	identityModalVisible: boolean
	toggleIdentityModalVisible: (visible: boolean) => void
}

export default function IdentityModal({
	toggleIdentityModalVisible,
	identityModalVisible,
}: Props) {
	const { hide } = useIdentityModal({ toggleIdentityModalVisible })
	const { styles, theme } = useTheme(_styles)

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
			<View style={{ flexDirection: 'row', marginBottom: isLast ? 0 : 10 }}>
				<Dot color={theme.color.textThird} style={{ marginTop: 7 }} />
				<AppText style={{ color: theme.color.textThird }}>
					{verificationText}
				</AppText>
			</View>
		)
	}

	const children = (
		<>
			<View style={styles.row}>
				<Identity />

				<View style={{ marginLeft: 15 }}>
					<AppText variant="headline" style={styles.title}>
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

			<AppText
				style={[{ color: theme.color.textThird }, styles.marginVertical]}>
				Advantages of verification
			</AppText>

			{[1, 2, 3, 4].map((b, i, a) => (
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
			color: theme.color.textThird,
			marginRight: 45,
		},
		title: {
			marginBottom: 5,
			color: theme.color.textPrimary,
		},
	})
