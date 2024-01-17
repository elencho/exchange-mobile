import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { Theme, useTheme } from '@theme/index'
import { StyleSheet, View, Image } from 'react-native'
import AppBackground from '@components/background'
import AppText from '@components/text'
import { AppButton } from '@components/button'
import React from 'react'
import CloseIcon from '@components/close-button'
import ConfirmCard from '@app/refactor/screens/convert/components/ConfirmCard'
import { formatDisplayPair } from '@app/refactor/screens/convert/util'
import { useSubmit } from '@app/refactor/screens/convert/hooks/use-submit'
import ConfirmModal from '@app/refactor/screens/convert/modals/ConfirmModal'
import General_error from '@components/general_error'

const ConfirmConvertScreen = (props: ScreenProp<'ConfirmConvert'>) => {
	const { styles, theme } = useTheme(_styles)
	const { spentAmount, receivedAmount, pair, tradeType, card } =
		props.route?.params

	const {
		onConfirmPressed,
		confirmModalStatus,
		setConfirmModalStatus,
		generalError,
		setGeneralError,
	} = useSubmit(props)

	const goToTransactions = () => {}

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
			<General_error errorData={generalError} style={styles.generalError} />
			<View style={{ flex: 1 }} />
			<AppButton
				style={styles.button}
				variant="primary"
				text="Confirm"
				onPress={onConfirmPressed}
			/>

			<ConfirmModal
				status={confirmModalStatus}
				dismiss={() => setConfirmModalStatus(undefined)}
				onTransactionsClick={goToTransactions}
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
		generalError: {
			marginTop: 18,
		},
	})

export default ConfirmConvertScreen
