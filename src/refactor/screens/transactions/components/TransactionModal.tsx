import * as Linking from 'expo-linking'
import React, { memo } from 'react'
import {
	Image,
	StyleSheet,
	View,
	TouchableOpacity,
	Pressable,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Copy from '@app/assets/images/Copy.svg'
import Link from '@app/assets/images/Link.svg'
import AppModal from '@app/components/AppModal'
import AppText from '@app/components/AppText'
import TradeDetails from '@app/components/InstantTrade/TradeDetails'
import { COINS_URL_PNG } from '@app/constants/api'
import colors from '@app/constants/colors'
import TransactionDetails from '@app/refactor/screens/transactions/components/TransactionDetails'
import useCopyToClipboard from '@app/utils/copyToClipboard'
import { toggleTransactionDetails } from '@app/refactor/redux/modals/modalsSlice'

function TransactionModal({ transactions, trades, isInstantTrade }) {
	const { copyToClipboard } = useCopyToClipboard()
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		transactions: {
			selectedTransactionDetails: {
				currency,
				provider,
				method,
				transactionInfo,
				baseCurrency,
				quoteCurrency,
				action,
				recipient,
				tag,
			},
			currencies,
		},
		modalState: { transactionDetailsVisible },
	} = state

	const handleTransactionUrl = () => {
		let pattern
		currencies.forEach((c) => {
			if (c.code === currency) {
				pattern =
					c.providerToUrlPattern[provider].transactionUrlPattern.split('{')[0]
			}
		})
		Linking.openURL(pattern + transactionInfo)
	}

	const handleAddressUrl = () => {
		let pattern
		currencies.forEach((c) => {
			if (c.code === currency) {
				pattern =
					c.providerToUrlPattern[provider].addressUrlPattern.split('{')[0]
			}
		})
		Linking.openURL(pattern + recipient)
	}

	const copyId = () => copyToClipboard(transactionInfo)
	const copyDestination = () => copyToClipboard(recipient)
	const copyTag = () => copyToClipboard(tag)

	const hide = () => {
		dispatch(toggleTransactionDetails(false))
	}

	const buySell = action === 'BID' ? 'Buy' : 'Sell'
	const backgroundColor =
		action === 'BID' ? 'rgba(12, 203, 181, 0.08)' : 'rgba(234, 121, 156, 0.08)'

	const children = () => {
		if (transactions) {
			return (
				<View style={styles.container}>
					{!isInstantTrade && transactionInfo && (
						<View style={styles.top}>
							<View style={styles.middle}>
								<AppText medium style={styles.white}>
									identifier (TXID):
								</AppText>
								<AppText style={styles.address} subtext>
									{transactionInfo}
								</AppText>
							</View>

							<View style={styles.vertical} />

							<View style={styles.row}>
								<TouchableOpacity onPress={copyId}>
									<Copy />
								</TouchableOpacity>
								{method === 'WALLET' && (
									<TouchableOpacity
										onPress={handleTransactionUrl}
										style={{ marginLeft: 25 }}>
										<Link />
									</TouchableOpacity>
								)}
							</View>
						</View>
					)}

					{!isInstantTrade && transactionInfo && <View style={styles.line} />}

					<TransactionDetails isInstantTrade={isInstantTrade} />

					{/* DESTINATION  */}
					{(method === 'WALLET' || method === 'WALLET_INTERNAL') &&
						recipient && (
							<>
								<View style={styles.line} />
								<View style={{ marginTop: 12 }}>
									<AppText medium style={styles.white}>
										Destination
									</AppText>

									<View style={styles.tagRow}>
										<AppText subtext style={[styles.address, { flex: 1 }]}>
											{recipient}
										</AppText>
										<View style={{ flexDirection: 'row' }}>
											<View style={styles.vertical} />
											<View style={styles.row}>
												<TouchableOpacity onPress={copyDestination}>
													<Copy />
												</TouchableOpacity>
												{(method === 'WALLET' ||
													method === 'WALLET_INTERNAL') && (
													<TouchableOpacity
														onPress={handleAddressUrl}
														style={{ marginLeft: 25 }}>
														<Link />
													</TouchableOpacity>
												)}
											</View>
										</View>
									</View>
								</View>
							</>
						)}
					{tag && (
						<>
							<View style={{ marginTop: 20 }}>
								<AppText medium style={styles.white}>
									Memo/Tag
								</AppText>

								<View style={styles.tagRow}>
									<AppText subtext style={[styles.address, { flex: 1 }]}>
										{tag}
									</AppText>
									<View style={{ flexDirection: 'row' }}>
										<View style={styles.vertical} />
										<View style={styles.row}>
											<TouchableOpacity onPress={copyTag}>
												<Copy />
											</TouchableOpacity>
											<Pressable style={{ marginLeft: 25, opacity: 0 }}>
												<Link />
											</Pressable>
										</View>
									</View>
								</View>
							</View>
						</>
					)}
				</View>
			)
		}
		if (trades) {
			return (
				<View style={styles.container}>
					<View style={[styles.top, { alignItems: 'flex-end' }]}>
						<View style={[styles.top, styles.icons]}>
							<Image
								source={{
									uri: `${COINS_URL_PNG}/${quoteCurrency?.toLowerCase()}.png`,
								}}
								style={styles.leftIcon}
							/>
							<Image
								source={{
									uri: `${COINS_URL_PNG}/${baseCurrency?.toLowerCase()}.png`,
								}}
								style={styles.rightIcon}
							/>
						</View>

						<View style={styles.middle}>
							<AppText medium body style={styles.white}>
								{quoteCurrency} - {baseCurrency}
							</AppText>
							<AppText style={styles.instantTrade}>Instant trade</AppText>
						</View>

						<View style={[styles.buy_sell, { backgroundColor }]}>
							<AppText
								medium
								subtext
								style={styles[action === 'BID' ? 'grey' : 'red']}>
								{buySell}
							</AppText>
						</View>
					</View>

					<View style={styles.line} />

					<TradeDetails />
				</View>
			)
		}
	}

	return (
		<AppModal
			title="Transaction Details"
			hide={hide}
			visible={transactionDetailsVisible}
			children={children()}
			bottom
		/>
	)
}

export default memo(TransactionModal)

const styles = StyleSheet.create({
	container: { paddingLeft: 10 },
	block: {
		padding: 40,
		paddingTop: 20,
		backgroundColor: colors.SECONDARY_BACKGROUND,
	},
	buy_sell: {
		height: 20,
		paddingHorizontal: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 28,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icons: { alignSelf: 'center', marginRight: 15 },
	leftIcon: {
		marginRight: -7,
		zIndex: 10,
		width: 31,
		height: 31,
	},
	rightIcon: {
		width: 31,
		height: 31,
	},
	middle: {
		flex: 1,
		marginRight: 15,
		justifyContent: 'space-between',
	},
	line: {
		height: 0.5,
		backgroundColor: '#32344C',
		marginVertical: 15,
	},
	vertical: {
		width: 0.5,
		height: 34,
		backgroundColor: '#32344C',
		marginRight: 15,
	},
	red: { color: '#FA6392' },
	grey: { color: '#0CCBB5' },
	top: {
		flexDirection: 'row',
		alignItems: 'center',
		// height: 37,
	},
	tagRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	address: {
		color: '#C0C5E0',
		marginTop: 6,
		marginRight: 15,
	},
	instantTrade: { color: colors.SECONDARY_TEXT, marginTop: 3 },
	white: { color: colors.PRIMARY_TEXT },
})
