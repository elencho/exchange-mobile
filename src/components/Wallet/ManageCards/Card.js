import { useNavigation } from '@react-navigation/native'
import { t } from 'i18next'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import CardError from '../../../assets/images/Wallet/Card_Error'
import CardExpired from '../../../assets/images/Wallet/Card_Expired'
import Delete from '../../../assets/images/Wallet/Delete.svg'
import CardInfo from '../../../assets/images/Wallet/Info'
import CardVerified from '../../../assets/images/Wallet/Verified.svg'
import { ICONS_URL_PNG } from '../../../constants/api'
import colors from '../../../constants/colors'
import images from '../../../constants/images'
import { setDeleteModalInfo } from '../../../redux/modals/actions'
import AppText from '../../AppText'
import PurpleText from '../../PurpleText'

export default function Card({ card }) {
	const dispatch = useDispatch()
	const navigation = useNavigation()

	const { provider, cardNumber, network, status, id, expired } = card

	const toVerify = (text, purple) => (
		<>
			<AppText style={styles.verified}>
				{t(text)}{' '}
				<PurpleText
					text={t(purple)}
					onPress={() => navigation.navigate('CardVerificationOne', { id })}
				/>
			</AppText>
		</>
	)

	const notToVerify = (text) => (
		<AppText style={styles.verified}>{text}</AppText>
	)

	const textCond = () => {
		if (expired) {
			return notToVerify('Card Expired')
		}
		if (status === 'VERIFIED' || status === 'BANNED') {
			return notToVerify(`Card ${status}`)
		}
		if (status === 'UNVERIFIED') {
			return toVerify('Not Verified', 'Verify')
		}
		if (status === 'FAILED') {
			return toVerify('Failed', 'Retry')
		}
	}

	const imageCond = () => {
		if (expired) return <CardExpired style={styles.icon} />
		if (status === 'VERIFIED') return <CardVerified style={styles.icon} />
		if (status === 'UNVERIFIED') return <CardInfo style={styles.icon} />
		if (status === 'BANNED' || status === 'FAILED')
			return <CardError style={styles.icon} />
	}

	const openModal = () => dispatch(setDeleteModalInfo({ id, visible: true }))
	const bankDisplayName = provider === 'TBC' ? 'TBC Bank' : 'Bank of Georgia'

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: `${ICONS_URL_PNG}/${provider}.png` }}
				style={styles.image}
			/>

			<View style={styles.block}>
				<View style={styles.row}>
					<AppText medium style={styles.primary}>
						{`Provider :`}
					</AppText>
					<AppText medium style={styles.primary}>
						{' '}
					</AppText>
					<AppText medium style={styles.primary}>
						{`${bankDisplayName}`}
					</AppText>
				</View>

				<AppText subtext style={styles.secondary}>
					{cardNumber} / {network}
				</AppText>
				<View style={styles.verifiedRow}>
					{imageCond()}
					{textCond()}
				</View>
			</View>

			<TouchableOpacity onPress={openModal}>
				<Delete />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	block: {
		flex: 1,
		marginLeft: 20,
		marginTop: -3,
	},
	container: {
		flexDirection: 'row',
		marginVertical: 15,
	},
	icon: { marginRight: 10, width: 16, height: 16 },
	image: {
		width: 30,
		height: 25,
		resizeMode: 'contain',
	},
	primary: {
		color: colors.PRIMARY_TEXT,
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		marginTop: 5,
		marginBottom: 15,
	},
	verified: { color: '#C0C5E0', marginTop: -1 },
	verifiedRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
	},
})
