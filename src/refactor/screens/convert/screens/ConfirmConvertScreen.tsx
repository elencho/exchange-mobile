import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { Theme, useTheme } from '@theme/index'
import { StyleSheet, View, Image, Pressable } from 'react-native'
import AppBackground from '@components/background'
import AppText from '@components/text'
import { AppButton } from '@components/button'
import React, { useState } from 'react'
import CardFeesModal from '@app/refactor/screens/convert/modals/CardFeesModal'
import CloseIcon from '@components/close-button'
import CardAdd from '@assets/images/Card_Add.svg'
import { FlatList } from 'react-native-gesture-handler'
import ConfirmCard from '@app/refactor/screens/convert/components/ConfirmCard'
import { formatDisplayPair } from '@app/refactor/screens/convert/util'

const ConfirmConvertScreen = (props: ScreenProp<'ConfirmConvert'>) => {
	const { styles, theme } = useTheme(_styles)
	const { spentAmount, receivedAmount, pair, tradeType, card } =
		props.route?.params

	type InfoItem = {
		desc: string
		value: string
	}
	const InfoItem = ({ desc, value }: InfoItem) => {
		return (
			<View style={styles.infoItemContainer}>
				<AppText variant="l" style={styles.infoDescText} noTranslate>
					{desc + ':'}
				</AppText>
				<View style={{ flex: 1 }} />
				<AppText variant="l" style={styles.infoDescValue}>
					{value}
				</AppText>
			</View>
		)
	}

	const CardSection = ({ card }: { card: Card }) => {
		const cardImage = (
			<Image
				style={{ width: 25, height: 15, marginRight: 6 }}
				source={{
					uri: card.iconPngUrl,
				}}
			/>
		)

		return (
			<View style={styles.cardSectionContainer}>
				<InfoItem desc={'Service Provider'} value={card.provider} />
				<View style={[styles.infoItemContainer, { alignItems: 'center' }]}>
					<AppText variant="l" style={styles.infoDescText} noTranslate>
						Card:
					</AppText>
					<View style={{ flex: 1 }} />
					{cardImage}
					<AppText variant="l" style={styles.infoDescValue}>
						{'| ' + card.cardNumber}
					</AppText>
				</View>
				<InfoItem
					desc={'Provider fee ' + card.feePct + '%'}
					value={'???????'}
				/>
			</View>
		)
	}

	const TotalSection = () => {
		const spentCcy =
			tradeType === 'Buy' ? pair.fiat.displayCcy : pair.crypto.displayCcy
		const receivedCcy =
			tradeType === 'Sell' ? pair.fiat.displayCcy : pair.crypto.displayCcy

		return (
			<View style={styles.totalSectionContainer}>
				<InfoItem desc={'Total Spent'} value={spentAmount + ' ' + spentCcy} />
				<InfoItem
					desc={'Total Receive'}
					value={receivedAmount + ' ' + receivedCcy}
				/>
				<InfoItem
					desc={'Price'}
					value={formatDisplayPair(pair, tradeType, '≈')}
				/>
			</View>
		)
	}

	const Top = () => {
		return (
			<View style={styles.topContainer}>
				<CloseIcon onPress={() => props.navigation.pop()} />
			</View>
		)
	}

	return (
		<AppBackground>
			<Top />
			<ConfirmCard pair={pair} tradeType={tradeType} />
			{card ? <CardSection card={card} /> : null}
			<TotalSection />
			<View style={{ flex: 1 }} />
			<AppButton
				style={styles.button}
				variant="primary"
				text="Confirm"
				onPress={() => {}}
			/>
		</AppBackground>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		cardSectionContainer: {
			marginTop: 22,
		},
		totalSectionContainer: {
			marginTop: 22,
		},
		infoItemContainer: {
			flexDirection: 'row',
			marginBottom: 10,
		},
		infoDescText: {
			color: theme.color.textSecondary,
		},
		infoDescValue: {
			color: theme.color.textThird,
		},
		button: {
			marginBottom: 40,
		},
	})

export default ConfirmConvertScreen
