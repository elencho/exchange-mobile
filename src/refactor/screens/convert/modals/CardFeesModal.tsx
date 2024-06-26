import AppModal from '@components/modal'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { Image, StyleSheet, View } from 'react-native'
import EmptyFeeX from '@assets/images/Instant_Empty_Fee.svg'
import { t } from 'i18next'
import { providerBankTranslate } from '@app/refactor/screens/convert/util'

interface Props {
	fees: ProviderFees[]
	visible: boolean
	dismiss: () => void
}

const CardFeesModal = ({ fees, visible, dismiss }: Props) => {
	const { styles } = useTheme(_styles)

	const renderBankFees = (
		fee: ProviderFees,
		drawUnderline: boolean,
		indx: number
	) => {
		const renderPct = (pct: number | null, index: number) => {
			return pct ? (
				<AppText variant="title" style={styles.bankText} key={index}>
					{pct + '%'}
				</AppText>
			) : (
				<View
					style={{
						width: 38,
						marginLeft: 42,
						justifyContent: 'center',
						alignItems: 'center',
						alignSelf: 'center',
					}}>
					<EmptyFeeX />
				</View>
			)
		}

		return (
			<View style={{ flexDirection: 'column' }} key={fee.providerBank + indx}>
				<View key={fee.providerBank} style={styles.bankFeeContainer}>
					<AppText
						noTranslate
						variant="title"
						style={[
							styles.bankText,
							{ marginLeft: 0, textAlign: 'left', flex: 100 },
						]}>
						{providerBankTranslate(fee.providerBank)}
					</AppText>
					<View style={{ flex: 1 }}></View>
					{fee.feeData.map((item, index) => renderPct(item.pct, index))}
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
					cn_fees_providers
				</AppText>
				<View style={{ flex: 1 }}></View>
				{icons.map((cardIcon, index) => (
					<Image
						key={index}
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
					renderBankFees(fee, index !== fees.length - 1, index)
				)}
			</View>
		)
	}

	return (
		<AppModal
			title="cn_fees_title"
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
			marginEnd: 10,
			marginTop: -10,
			marginLeft: 8,
		},
		providersContainer: {
			alignItems: 'center',
			flexDirection: 'row',
			marginVertical: 25,
		},
		bankFeeContainer: {
			alignSelf: 'center',
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
