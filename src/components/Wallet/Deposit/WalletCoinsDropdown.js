import React, { useState } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COINS_URL_PNG } from '../../../constants/api'
import colors from '../../../constants/colors'
import { toggleCurrencyModal } from '../../../redux/modals/actions'
import AppDropdown from '../../AppDropdown'
import AppText from '../../AppText'
import PurpleText from '@app/components/PurpleText'
import InfoBanner from './InfoBanner'

export default function WalletCoinsDropdown() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const [infoVisible, setInfoVisible] = useState(false)
	const {
		wallet: { usdBtcSwitch },
		trade: {
			currentBalanceObj: {
				available,
				total,
				valueUSD,
				valueBTC,
				displayCurrencyCode,
				types,
			},
		},
		common: { isBiometricScreenOpened },
	} = state

	const handleDropdown = () => dispatch(toggleCurrencyModal(true))
	const toggleModal = () => {
		setInfoVisible(!infoVisible)
	}

	const value = usdBtcSwitch === 'USD' ? valueUSD : valueBTC

	const isTolCurrency = types.includes('CRYPTO') && types.includes('FIAT')

	return (
		<>
			<AppDropdown
				handlePress={handleDropdown}
				icon={
					<Image
						source={{
							uri: `${COINS_URL_PNG}/${displayCurrencyCode?.toLowerCase()}.png`,
						}}
						style={styles.image}
					/>
				}
				selectedText={`${available} ${displayCurrencyCode}`}
				notClearable
				totalText={`Total : ${total} ≈ ${value} ${usdBtcSwitch}`}
			/>

			{isTolCurrency && (
				<View style={styles.bannerButton}>
					<AppText subtext style={styles.text}>
						{`What is ${displayCurrencyCode}?`}
					</AppText>
					<PurpleText
						text="Find Out"
						style={{ fontSize: 12 }}
						// style={styles.back}
						onPress={() => toggleModal()}
					/>
				</View>
			)}
			<InfoBanner isModalVisible={infoVisible} hideModal={toggleModal} />
		</>
	)
}

const styles = StyleSheet.create({
	arrow: {
		marginLeft: 20,
		justifyContent: 'center',
	},
	balance: {
		justifyContent: 'space-between',
		marginLeft: 12,
		marginRight: 18,
		flex: 1,
	},
	image: {
		width: 24,
		height: 24,
		marginRight: -6,
	},
	line: {
		width: 1,
		height: '100%',
		backgroundColor: '#3B4160',
	},
	primary: {
		color: colors.PRIMARY_TEXT,
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		marginTop: 8,
		marginBottom: 5,
	},
	text: {
		color: '#696F8E',
	},
	bannerButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
		gap: 4,
	},
})
