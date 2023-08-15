import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import AppModal from '../AppModal'
import AppText from '../AppText'
import Identity from '../../assets/images/User_profile/Identity.svg'

import colors from '../../constants/colors'

export default function IdentityModal() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const identityModalVisible = useSelector(
		(state) => state.modals.identityModalVisible
	)

	const hide = () => dispatch({ type: 'TOGGLE_IDENTITY_MODAL' })

	const Dot = ({ color, style }) => (
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

	const Bullet = ({ text, isLast }) => {
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
					<AppText header style={styles.title}>
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
const styles = StyleSheet.create({
	marginVertical: {
		marginTop: 27,
		marginBottom: 18,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	subtext: {
		color: colors.SECONDARY_TEXT,
	},
	title: {
		marginBottom: 5,
		color: colors.PRIMARY_TEXT,
	},
})
