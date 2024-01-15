import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { Theme, useTheme } from '@theme/index'
import { StyleSheet, View, Image, Pressable } from 'react-native'
import AppBackground from '@components/background'
import AppText from '@components/text'
import { AppButton } from '@components/button'
import { useState } from 'react'
import CardFeesModal from '@app/refactor/screens/convert/modals/CardFeesModal'
import CloseIcon from '@components/close-button'
import CardAdd from '@assets/images/Card_Add.svg'
import { FlatList } from 'react-native-gesture-handler'

const SelectCardScreen = (props: ScreenProp<'SelectCard'>) => {
	const { styles, theme } = useTheme(_styles)
	const { cards, onCardChoose, fees } = props.route?.params

	const [feesModalVisible, setFeesModalVisible] = useState(false)

	const goToAddCard = () => {
		//TODO
	}

	const Top = () => {
		return (
			<View style={styles.topContainer}>
				<CloseIcon onPress={() => props.navigation.pop()} />
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
						style={{ width: 50, height: 25, marginRight: 14, borderRadius: 2 }}
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
			return <View></View>
		}

		return (
			<View>
				<FlatList
					style={styles.listContainer}
					data={cards}
					keyExtractor={(item) => item.id}
					renderItem={(card) => renderCard(card.item)}
					showsVerticalScrollIndicator={false}
				/>
				<AddCard />
			</View>
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
		</AppBackground>
	)
}
const _styles = (theme: Theme) =>
	StyleSheet.create({
		topContainer: {},
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
			marginTop: 12,
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
	})

export default SelectCardScreen
