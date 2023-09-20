import { useNavigation } from '@react-navigation/native'
import { t } from 'i18next'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Arrow from '../../assets/images/Arrow.svg'
import { ICONS_URL_PNG } from '../../constants/api'
import colors from '../../constants/colors'
import {
	toggleChooseCardModal,
	toggleChooseBankModal,
	toggleBankFeesModal,
} from '../../redux/modals/actions'
import { setCard } from '../../redux/trade/actions'
import AppDropdown from '../AppDropdown'
import AppText from '../AppText'
import PurpleText from '../PurpleText'
import Fee from '../Wallet/Fee'

function CardSection({ error }) {
	const navigation = useNavigation()

	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		trade: {
			depositProvider,
			currentBalanceObj,
			card,
			fiat,
			cardsToDisplayInModal,
			balance: { balances },
		},
		transactions: { tabRoute, code },
		wallet: { walletTab },
	} = state

	const wallet = tabRoute === 'Wallet'
	const trade = tabRoute === 'Trade'

	useEffect(() => {
		if (card) dispatch(setCard(null))
	}, [depositProvider])

	const showCards = () => dispatch(toggleChooseCardModal(true))
	const showBanks = () => dispatch(toggleChooseBankModal(true))
	const showFees = () => dispatch(toggleBankFeesModal(true))

	const multipleBanks = () => {
		if (wallet) return true
		let isMultiple
		balances?.forEach((b) => {
			if (fiat === b.currencyCode) {
				isMultiple = b?.depositMethods?.ECOMMERCE?.length
			}
		})
		return isMultiple
	}

	const currencyName = (fiat) => {
		let name
		balances?.forEach((b) => {
			if (b.currencyCode === fiat) name = b.currencyName
		})
		return name
	}

	const addNewCard = () =>
		dispatch({
			type: 'ADD_NEW_CARD_SAGA',
			name: currencyName(trade ? fiat : code),
			code: trade ? fiat : code,
			navigation,
			balances,
		})

	const displayName = () => {
		let displayName = 'Payment Service Provider'
		const m =
			walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods'

		trade &&
			balances.forEach((b) => {
				if (b.currencyCode === fiat) {
					b[m]?.ECOMMERCE?.forEach((d) => {
						if (depositProvider === d.provider) displayName = d.displayName
					})
				}
			})

		wallet &&
			currentBalanceObj[m]?.ECOMMERCE?.forEach((d) => {
				if (depositProvider === d.provider) displayName = d.displayName
			})
		return depositProvider ? displayName : null
	}

	return (
		<View style={styles.container}>
			{multipleBanks() && (
				<AppDropdown
					style={styles.dropdown}
					handlePress={showBanks}
					selectedText={displayName()}
					notClearable
					label="Payment service provider"
					withLabel
					error={!depositProvider && error}
					icon={
						depositProvider && (
							<Image
								style={styles.image}
								source={{ uri: `${ICONS_URL_PNG}/${depositProvider}.png` }}
							/>
						)
					}
				/>
			)}

			{depositProvider && (
				<>
					<AppDropdown
						notClearable
						handlePress={showCards}
						disabled={!cardsToDisplayInModal?.length}
						label="Choose Card"
						withLabel
						selectedText={card && card.cardNumber}
						error={!card && error}
						icon={
							card && (
								<Image
									source={{ uri: `${ICONS_URL_PNG}/${card?.network}.png` }}
									style={styles.image}
								/>
							)
						}
					/>
					<AppText subtext style={styles.newCard}>
						{t(
							!cardsToDisplayInModal?.length
								? "You don't have cards"
								: 'You can add a new card'
						)}{' '}
						<PurpleText text={t('Add Card')} onPress={addNewCard} />
					</AppText>

					{trade && (
						<View style={{ marginVertical: 22 }}>{card && <Fee />}</View>
					)}
				</>
			)}
		</View>
	)
}

export default CardSection

const styles = StyleSheet.create({
	dropdown: {
		marginBottom: 22,
	},
	container: {
		marginVertical: 30,
	},
	newCard: {
		color: colors.SECONDARY_TEXT,
		marginTop: 8,
	},
	subText: {
		color: colors.SECONDARY_TEXT,
		marginTop: -13,
		marginBottom: 25,
	},
	text: {
		color: colors.PRIMARY_TEXT,
		flex: 1,
	},
	image: {
		width: 20,
		height: 20,
		resizeMode: 'contain',
	},
})
