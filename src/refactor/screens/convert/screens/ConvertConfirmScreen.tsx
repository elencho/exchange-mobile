import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { Theme, useTheme } from '@theme/index'
import { StyleSheet, View, Image } from 'react-native'
import AppBackground from '@components/background'
import AppText from '@components/text'
import { AppButton } from '@components/button'
import React, { useEffect } from 'react'
import CloseIcon from '@components/close-button'
import ConfirmTradeCard from '@app/refactor/screens/convert/components/ConfirmTradeCard'
import { formatDisplayPair } from '@app/refactor/screens/convert/util'
import { useSubmit } from '@app/refactor/screens/convert/hooks/use-submit'
import ConfirmModal from '@app/refactor/screens/convert/modals/ConfirmModal'
import General_error from '@components/general_error'
import AppWebView from '@components/web_view'
import { WebViewNavigation } from 'react-native-webview'
import { useDispatch } from 'react-redux'
import { setWebViewVisible } from '@store/redux/common/slice'

const ConfirmConvertScreen = (props: ScreenProp<'ConfirmConvert'>) => {
	const { styles } = useTheme(_styles)
	const dispatch = useDispatch()

	const { spentAmount, receivedAmount, pair, tradeType, card } =
		props.route?.params

	const {
		onConfirmPressed,
		confirmModalStatus,
		setConfirmModalStatus,
		generalError,
		webViewState,
	} = useSubmit(props)

	const goToTransactions = () => {}

	const handleWebViewUrlChange = (event: WebViewNavigation) => {
		const urlQueries = event.url.split('=')
		const lastQuery = urlQueries[urlQueries.length - 1]

		if (lastQuery === 'false' || lastQuery === 'true') {
			dispatch(setWebViewVisible(false))
			setConfirmModalStatus(lastQuery === 'true' ? 'pending' : 'error')
		}
	}

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
		const feeNum = Number(spentAmount) * (card.feePct ? card.feePct / 100 : 0)
		const feeTxt = feeNum.toFixed(pair.fiat.scale) + ' ' + pair.fiat.displayCcy

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
				<InfoItem desc={'Provider fee ' + card.feePct + '%'} value={feeTxt} />
			</View>
		)
	}

	const TotalSection = () => {
		const spent = tradeType === 'Buy' ? pair.fiat : pair.crypto
		const received = tradeType === 'Sell' ? pair.fiat : pair.crypto

		return (
			<View style={styles.totalSectionContainer}>
				<InfoItem
					desc={'Total Spent'}
					value={
						Number(spentAmount).toFixed(spent.scale) + ' ' + spent.displayCcy
					}
				/>
				<InfoItem
					desc={'Total Receive'}
					value={
						Number(receivedAmount).toFixed(received.scale) +
						' ' +
						received.displayCcy
					}
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
			<ConfirmTradeCard pair={pair} tradeType={tradeType} />
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
			{webViewState && (
				<AppWebView
					source={{ uri: webViewState.actionUrl }}
					onNavigationStateChange={handleWebViewUrlChange}
				/>
			)}
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
