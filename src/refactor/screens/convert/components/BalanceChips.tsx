import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

type Props = {
	onChipPressed: (balanceMultiplier: number) => void
}

const BalanceChips = ({ onChipPressed }: Props) => {
	const { styles, theme } = useTheme(_styles)
	const chips = [0.25, 0.5, 0.75, 1]

	const [selectedChip, setSelectedChip] = useState<number>()

	const chipBackgroundColor = (mul: number) => {
		return mul === selectedChip
			? theme.color.brandSecondary + '1F'
			: theme.color.tabTagHint
	}

	const chipTextColor = (mul: number) => {
		return mul === selectedChip ? theme.color.brandSecondary : '#969CBF'
	}

	return (
		<View style={styles.container}>
			{chips.map((mul: number) => (
				<Pressable
					style={[
						styles.chipContainer,
						{
							backgroundColor: chipBackgroundColor(mul),
						},
					]}
					key={mul}
					onPress={() => {
						setSelectedChip(mul)
						onChipPressed(mul)
					}}>
					<AppText
						variant="l"
						style={[styles.mulText, { color: chipTextColor(mul) }]}>
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
		},
		mulText: {
			paddingHorizontal: 16,
			paddingVertical: 6,
		},
	})

export default BalanceChips
