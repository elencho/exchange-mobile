import { ScreenProp } from '@app/refactor/setup/nav/nav'
import { Theme, useTheme } from '@theme/index'
import { StyleSheet, View, Image } from 'react-native'
import AppBackground from '@components/background'
import AppText from '@components/text'
import { AppButton } from '@components/button'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@components/close-button'
import ConfirmTradeCard from '@app/refactor/screens/convert/components/ConfirmTradeCard'
import {
	formatDisplayPair,
	formatScale,
} from '@app/refactor/screens/convert/util'
import { useSubmit } from '@app/refactor/screens/convert/hooks/use-submit'
import ConfirmModal from '@app/refactor/screens/convert/modals/ConfirmModal'
import General_error from '@components/general_error'
import AppWebView from '@components/web_view'
import { WebViewNavigation } from 'react-native-webview'
import { useDispatch } from 'react-redux'
import { setWebViewVisible } from '@store/redux/common/slice'
import { t } from 'i18next'

const ConfirmConvertScreen = (props: ScreenProp<'ConfirmConvert'>) => {
	const { styles } = useTheme(_styles)
	const dispatch = useDispatch()

	const [confirmModalVisible, setConfirmModalVisible] = useState(false)

	const { spentAmount, receivedAmount, pair, tradeType, card, onConfirmClose } =
		props.route?.params

	const {
		changedPrice,
		onConfirmPressed,
		confirmModalStatus,
		setConfirmModalStatus,
		generalError,
		webViewState,
	} = useSubmit(props)

	useEffect(() => {
		setConfirmModalVisible(confirmModalStatus !== undefined)
	}, [confirmModalStatus])

	const goBack = () => {
		const shouldRefresh =
			confirmModalStatus === 'success' || confirmModalStatus === 'pending'

		onConfirmClose(shouldRefresh)
		props.navigation.pop()
	}

	const goToTransactions = () => {
		props.navigation.replace('Main', {
			fromResume: false,
			initialRoute: 'Transactions',
			transactionsInitialTab: 'Instant trade',
		})
	}

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
		const descText = (
			<AppText variant="l" style={styles.infoDescText}>
				{desc}
			</AppText>
		)
		const regularValueText = (
			<AppText variant="l" style={styles.infoDescValue}>
				{value}
			</AppText>
		)
		const valueText =
			desc === 'cn_confirm_info_price' && changedPrice ? (
				<ChangedPriceItem />
			) : (
				regularValueText
			)

		return (
			<View style={styles.infoItemContainer}>
				{descText}
				<View style={{ flex: 1 }} />
				{valueText}
			</View>
		)
	}

	const ChangedPriceItem = () => {
		const oldPrice = tradeType === 'Buy' ? pair.buyPrice : pair.sellPrice
		const leftSide = '1 ' + pair.crypto.displayCcy + ' ≈'

		return (
			<View style={{ flexDirection: 'row' }}>
				<AppText variant="l" style={styles.infoDescValue}>
					{leftSide}
				</AppText>
				<AppText
					variant="l"
					style={[
						styles.infoDescValue,
						{ textDecorationLine: 'line-through' },
					]}>
					{' ' + oldPrice}
				</AppText>
				<AppText variant="l" style={styles.infoPriceChanged}>
					{' ' + changedPrice + ' ' + pair.fiat.displayCcy}
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
		const feeTxt =
			formatScale(feeNum, pair.fiat.scale) + ' ' + pair.fiat.displayCcy

		return (
			<View style={styles.cardSectionContainer}>
				<InfoItem desc={'cn_confirm_info_service'} value={card.provider} />
				<View style={[styles.infoItemContainer, { alignItems: 'center' }]}>
					<AppText variant="l" style={styles.infoDescText}>
						cn_confirm_info_card
					</AppText>
					<View style={{ flex: 1 }} />
					{cardImage}
					<AppText variant="l" style={styles.infoDescValue}>
						{'| ' + card.cardNumber}
					</AppText>
				</View>
				<InfoItem
					desc={t('cn_confirm_info_provider_fee') + ' ' + card.feePct + '%'}
					value={feeTxt}
				/>
			</View>
		)
	}

	const TotalSection = () => {
		const spent = tradeType === 'Buy' ? pair.fiat : pair.crypto
		const received = tradeType === 'Sell' ? pair.fiat : pair.crypto

		return (
			<View style={styles.totalSectionContainer}>
				<InfoItem
					desc={'cn_confirm_info_total_spent'}
					value={formatScale(spentAmount, spent.scale) + ' ' + spent.displayCcy}
				/>
				<InfoItem
					desc={'cn_confirm_info_total_receive'}
					value={
						formatScale(receivedAmount, received.scale) +
						' ' +
						received.displayCcy
					}
				/>
				<InfoItem
					desc={'cn_confirm_info_price'}
					value={formatDisplayPair(pair, tradeType, '≈')}
				/>
			</View>
		)
	}

	const Top = () => {
		return (
			<View style={styles.topContainer}>
				<CloseIcon onPress={() => goBack()} />
			</View>
		)
	}

	return (
		<>
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
					text="cn_confirm_btn"
					onPress={onConfirmPressed}
				/>

				<ConfirmModal
					visible={confirmModalVisible}
					status={confirmModalStatus}
					dismiss={() => setConfirmModalVisible(false)}
					onTransactionsClick={goToTransactions}
				/>
			</AppBackground>
			{webViewState && (
				<AppWebView
					source={{ uri: webViewState.actionUrl }}
					onNavigationStateChange={handleWebViewUrlChange}
				/>
			)}
		</>
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
		infoPriceChanged: {
			color: theme.color.error,
		},
		button: {
			marginBottom: 40,
		},
		generalError: {
			marginTop: 18,
		},
	})

export default ConfirmConvertScreen
