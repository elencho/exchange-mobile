import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COINS_URL_PNG } from '../../constants/api'
import colors from '../../constants/colors'
import { toggleFiatModal } from '../../redux/modals/actions'
import {
	instantTradeTabAction,
	setDepositProvider,
	setFiat,
	switchBalanceCard,
} from '../../redux/trade/actions'
import AppModal from '../AppModal'
import AppText from '../AppText'

export default function FiatModal() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		trade: { fiat, depositProviders, offers },
		modals: { fiatModalVisible },
	} = state

	useEffect(() => {
		setTimeout(() => {
			if (depositProviders?.length > 1) {
				dispatch(setDepositProvider(null))
			}
			if (depositProviders?.length === 1) {
				dispatch(setDepositProvider(depositProviders[0].provider))
			}
		}, 500)
	}, [depositProviders])

	const hide = () => dispatch(toggleFiatModal(false))

	const choose = (f) => {
		dispatch(setFiat(f))
		dispatch(instantTradeTabAction())
		dispatch(switchBalanceCard('balance'))
		hide()
	}

	const fiatsFromOffers = Object.keys(offers ?? {})

	const children = fiatsFromOffers?.map((code, index, list) => (
		<Pressable
			key={code}
			style={[
				styles.row,
				code === fiat && { backgroundColor: 'rgba(101, 130, 253, 0.16)' },
				{ marginBottom: index < list.length - 1 ? 5 : -10 },
			]}
			onPress={() => choose(code)}>
			<Image
				source={{
					uri: `${COINS_URL_PNG}/${code.toLowerCase()}.png`,
				}}
				style={styles.icon}
			/>
			<AppText body style={styles.text}>
				{code}
			</AppText>
		</Pressable>
	))

	return (
		<AppModal
			visible={fiatModalVisible}
			hide={hide}
			title="Choose Currency"
			bottom
			children={children}
		/>
	)
}

const styles = StyleSheet.create({
	icon: {
		width: 30,
		height: 30,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 5,
		marginLeft: -15,
	},
	text: {
		color: colors.PRIMARY_TEXT,
		marginLeft: 15,
	},
})
