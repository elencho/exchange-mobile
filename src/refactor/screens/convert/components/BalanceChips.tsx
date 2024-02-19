import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { Pressable, StyleSheet, View } from 'react-native'

type Props = {
	selectedChip: number | undefined
	onChipSelect: (balanceMultiplier: number | undefined) => void
}

const BalanceChips = ({ selectedChip, onChipSelect }: Props) => {
	const { styles } = useTheme(_styles)
	const chips = [0.25, 0.5, 0.75, 1]

	return (
		<View style={styles.container}>
			{chips.map((mul: number) => (
				<Pressable
					style={styles.chipContainer}
					key={mul}
					onPress={() => {
						if (selectedChip === mul) {
							onChipSelect(undefined)
						} else {
							onChipSelect(mul)
						}
					}}>
					<AppText variant="l" style={styles.mulText}>
						{mul === 1 ? 'MAX' : mul * 100 + '%'}
					</AppText>
				</Pressable>
			))}
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			marginTop: 30,
			flexDirection: 'row',
		},
		chipContainer: {
			marginEnd: 10,
			borderRadius: 16,
			backgroundColor: theme.color.tabTagHint,
		},
		mulText: {
			paddingHorizontal: 16,
			paddingVertical: 6,
			color: '#969CBF',
		},
	})

export default BalanceChips
