import AppModal from '@components/modal'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { Image, Pressable, StyleSheet, View } from 'react-native'

interface Props {
	fees: ProviderFees[]
	visible: boolean
	dismiss: () => void
}

const CardFeesModal = ({ fees, visible, dismiss }: Props) => {
	const { styles, theme } = useTheme(_styles)

	const renderBankFees = (fee: ProviderFees, drawUnderline: boolean) => {
		return (
			<View style={{ flexDirection: 'column' }}>
				<View key={fee.providerBank} style={styles.bankFeeContainer}>
					<AppText variant="title" style={[styles.bankText, { marginLeft: 0 }]}>
						{fee.providerBank}
					</AppText>
					<View style={{ flex: 1 }}></View>
					{fee.feeData.map((item) => (
						<AppText
							variant="title"
							style={styles.bankText}
							key={item.cardType}>
							{item.pct ? item.pct + '%' : '-'}
						</AppText>
					))}
				</View>
				{drawUnderline && <View style={styles.underline} />}
			</View>
		)
	}

	const ProviderRow = () => {
		const icons = [
			...new Set(
				fees.flatMap((fee) => fee.feeData.map((data) => data.iconPngUrl))
			),
		]
		return (
			<View style={styles.providersContainer}>
				<AppText variant="l" style={styles.providersText}>
					{'PROVIDERS :'}
				</AppText>
				<View style={{ flex: 1 }}></View>
				{icons.map((cardIcon) => (
					<Image
						key={cardIcon}
						style={{ width: 38, height: 22, marginLeft: 42, borderRadius: 2 }}
						source={{
							uri: cardIcon,
						}}
					/>
				))}
			</View>
		)
	}

	const children = () => {
		return (
			<View style={styles.container}>
				<ProviderRow />
				{fees.map((fee: ProviderFees, index) =>
					renderBankFees(fee, index !== fees.length - 1)
				)}
			</View>
		)
	}

	return (
		<AppModal
			title="About Fees"
			hide={dismiss}
			visible={visible}
			children={children()}
			bottom
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			marginLeft: 8,
		},
		providersContainer: {
			alignItems: 'center',
			flexDirection: 'row',
			marginVertical: 25,
		},
		bankFeeContainer: {
			flexDirection: 'row',
			marginBottom: 10,
		},
		bankText: {
			textAlign: 'center',
			width: 38,
			marginLeft: 42,
			color: theme.color.textPrimary,
		},
		providersText: {
			color: theme.color.textSecondary,
		},
		underline: {
			backgroundColor: '#2E2E4D',
			height: 1,
			marginBottom: 10,
		},
	})

export default CardFeesModal
