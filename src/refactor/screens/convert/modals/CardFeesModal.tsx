import AppModal from '@components/modal'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { Image, Pressable, StyleSheet, View } from 'react-native'

interface Props {
	fees: CardFee[]
	visible: boolean
	dismiss: () => void
}

const CardFeesModal = ({ fees, visible, dismiss }: Props) => {
	const { styles, theme } = useTheme(_styles)

	const renderBankFees = (fee: CardFee, drawUnderline: boolean) => {
		return (
			<View key={fee.providerBank} style={styles.bankFeeContainer}>
				<AppText variant="l" style={styles.bankText}>
					{fee.providerBank}
				</AppText>
				{fee.feeData.map((item) => (
					<AppText variant="l" style={styles.bankText}>
						{item.pct ? item.pct + '%' : '-'}
					</AppText>
				))}
			</View>
		)
	}

	const children = () => {
		return (
			<View style={styles.container}>
				{/* Render icons */}
				{fees.map((fee: CardFee, index) => renderBankFees(fee, index !== 0))}
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
			marginHorizontal: 8,
		},
		bankFeeContainer: {
			flexDirection: 'row',
			marginBottom: 10,
			justifyContent: 'space-around',
		},
		bankText: {
			color: theme.color.textPrimary,
		},
	})

export default CardFeesModal
