import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { useEffect } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

type Props = {
	animate: boolean
	loading: boolean
	onChipSelect: (balanceMultiplier: number | undefined) => void
}

const BalanceChips = ({ animate, loading, onChipSelect }: Props) => {
	const { styles } = useTheme(_styles)
	const chips = [0.25, 0.5, 0.75, 1]

	const height = useSharedValue(60)

	useEffect(() => {
		height.value = withTiming(animate ? 60 : 0, {
			duration: 250,
			easing: Easing.linear,
		})
	}, [animate])

	const animStyle = useAnimatedStyle(() => {
		return {
			// height: height.value,
			// width: '100%',
		}
	})

	return (
		<View>
			<Animated.View style={animStyle}>
				<View style={styles.container}>
					{chips.map((mul: number) => (
						<Pressable
							style={styles.chipContainer}
							key={mul}
							onPress={() => {
								if (loading) return
								onChipSelect(mul)
							}}>
							<AppText variant="l" style={styles.mulText}>
								{mul === 1 ? 'MAX' : mul * 100 + '%'}
							</AppText>
						</Pressable>
					))}
				</View>
			</Animated.View>
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
