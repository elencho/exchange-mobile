import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { Theme, useTheme } from '@theme/index'
import { StyleSheet, View, Image, Pressable } from 'react-native'
import AppBackground from '@components/background'
import AppText from '@components/text'
import { AppButton } from '@components/button'
import { useEffect, useState } from 'react'
import CardFeesModal from '@app/refactor/screens/convert/modals/CardFeesModal'
import CloseIcon from '@components/close-button'
import CardAdd from '@assets/images/Card_Add.svg'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import AddCardModal from '@app/components/Wallet/ManageCards/AddCardModal'
import { useDispatch, useSelector } from 'react-redux'
import AddCardIcon from '@assets/images/Instant_Add_Card.svg'
import { RootState } from '@app/refactor/redux/rootReducer'
import { System } from '@app/refactor/common/util'

const SelectCardScreen = (props: ScreenProp<'SelectCard'>) => {
	const { styles } = useTheme(_styles)
	const { cards, onCardChoose, fees } = props.route?.params

	const [feesModalVisible, setFeesModalVisible] = useState(false)

	// TODO: Legacy saga code because of wallet, must refactor
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({ type: 'BALANCE_SAGA' })
	}, [])

	const state = useSelector((state: RootState) => state)
	const {
		trade: {
			balance: { balances },
		},
	} = state

	const goToAddCard = () => {
		dispatch({
			type: 'ADD_NEW_CARD_SAGA',
			name: 'GEL',
			code: 'GEL',
			navigation: props.navigation,
			balances,
		})
	}

	const Top = () => {
		return (
			<View>
				<CloseIcon
					style={styles.closeIcon}
					onPress={() => props.navigation.pop()}
				/>
				<AppText variant="headline" style={styles.textHeader}>
					Select Method
				</AppText>
				<View style={styles.feeContainer}>
					<AppText variant="l" style={styles.textFees} medium>
						See all types of{' '}
					</AppText>
					<AppButton
						variant="text"
						text="fees here"
						onPress={() => {
							setFeesModalVisible(true)
						}}
					/>
				</View>
			</View>
		)
	}

	const CardList = () => {
		const renderCard = (card: Card) => {
			return (
				<Pressable
					style={styles.cardContainer}
					onPress={() => {
						onCardChoose(card)
						props.navigation.pop()
					}}>
					<Image
						style={{
							width: 34,
							height: 26,
							marginTop: 4,
							marginRight: 14,
							borderRadius: 2,
						}}
						source={{
							uri: card.iconPngUrl,
						}}
					/>
					<View style={styles.cardInfoContainer}>
						<AppText variant="title" style={styles.cardNumberText}>
							{card.cardNumber}
						</AppText>
						<AppText variant="l" style={styles.cardProviderText}>
							{'Provider: ' + card.provider}
						</AppText>
					</View>
					<View style={{ flex: 1 }} />
					<AppText variant="l" style={styles.cardFeeText}>
						{'Fee: ' + card.feePct + '%'}
					</AppText>
				</Pressable>
			)
		}

		const AddCard = () => {
			return (
				<Pressable style={styles.addCardContainer} onPress={goToAddCard}>
					<AddCardIcon style={styles.addCardIcon} />
					<AppText variant="title" style={styles.addCardText}>
						Add New Card
					</AppText>
				</Pressable>
			)
		}

		return (
			<ScrollView
				style={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
				bounces={false}>
				<AddCard />
				<FlatList
					scrollEnabled={false}
					style={styles.listContainer}
					data={cards}
					keyExtractor={(item) => item.id}
					renderItem={(card) => renderCard(card.item)}
					showsVerticalScrollIndicator={false}
				/>
			</ScrollView>
		)
	}

	const NoCards = () => {
		return (
			<View style={styles.noCardsContainer}>
				<CardAdd />
				<AppText variant="l" style={styles.noCardsText}>
					{'Add cards to buy, or sell fiat and\nSome description here'}
				</AppText>
				<AppButton variant="text" text="+ Add Card" onPress={goToAddCard} />
			</View>
		)
	}

	return (
		<AppBackground>
			<Top />
			{cards.length ? <CardList /> : <NoCards />}
			<CardFeesModal
				fees={fees}
				visible={feesModalVisible}
				dismiss={() => setFeesModalVisible(false)}
			/>
			<AddCardModal />
		</AppBackground>
	)
}
const _styles = (theme: Theme) =>
	StyleSheet.create({
		scrollContainer: {
			flexGrow: 1,
			marginTop: 16,
		},
		textHeader: {
			marginTop: 10,
			color: theme.color.textPrimary,
		},
		feeContainer: {
			alignItems: 'center',
			marginTop: 8,
			flexDirection: 'row',
		},
		textFees: {
			color: theme.color.textSecondary,
		},
		noCardsContainer: {
			marginTop: 150,
			alignItems: 'center',
		},
		noCardsText: {
			textAlign: 'center',
			marginTop: 20,
			marginBottom: 40,
			color: theme.color.textSecondary,
		},
		listContainer: {
			marginTop: 8,
		},
		cardIcon: {
			paddingBottom: 20,
		},
		cardContainer: {
			marginTop: 24,
			flexDirection: 'row',
		},
		cardInfoContainer: {
			flexDirection: 'column',
		},
		cardNumberText: {
			color: theme.color.textPrimary,
		},
		cardProviderText: {
			marginTop: 7,
			color: theme.color.textSecondary,
		},
		cardFeeText: {
			alignSelf: 'flex-end',
			color: theme.color.textSecondary,
		},
		addCardContainer: {
			alignSelf: 'flex-start',
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: 16,
		},
		addCardText: {
			color: theme.color.brandSecondary,
		},
		addCardIcon: {
			marginEnd: 14,
		},
		closeIcon: {
			marginTop: System.isAndroid ? 10 : 0,
		},
	})

export default SelectCardScreen
