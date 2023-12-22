import React from 'react'
import { Image, Pressable, StyleSheet, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Arrow from '../../../assets/images/Arrow'
import { COINS_URL_PNG } from '../../../constants/api'
import colors from '../../../constants/colors'
import { toggleCurrencyModal } from '../../../redux/modals/actions'
import AppDropdown from '../../AppDropdown'
import AppText from '../../AppText'

export default function WalletCoinsDropdown() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		wallet: { usdBtcSwitch },
		trade: {
			currentBalanceObj: {
				available,
				total,
				valueUSD,
				valueBTC,
				displayCurrencyCode,
			},
		},
	} = state

	const handleDropdown = () => dispatch(toggleCurrencyModal(true))

	const value = usdBtcSwitch === 'USD' ? valueUSD : valueBTC

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
})
