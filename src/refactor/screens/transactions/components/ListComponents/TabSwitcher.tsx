import React, { Dispatch, SetStateAction } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import colors from '@app/constants/colors'
import AppText from '@app/refactor/common/components/text/index'
import { FilterState } from '../../transactions_history'
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from 'react-native-reanimated'

interface Props {
	activeTab: TabName
	setActiveTab: Dispatch<SetStateAction<TabName>>
	setIsFilterVisible: Dispatch<SetStateAction<FilterState>>
}

const TabSwitcher: React.FC<Props> = ({
	activeTab,
	setActiveTab,
	setIsFilterVisible,
}) => {
	const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

	const tabTextStyle = (tabName: TabName) => {
		return {
			color: activeTab === tabName ? colors.PRIMARY_TEXT : '#969CBF',
		}
	}
	const tabColor = (tabName: TabName) => {
		return {
			backgroundColor: withTiming(
				activeTab === tabName ? colors.PRIMARY_PURPLE : colors.BUTTON_DISABLED
			),
		}
	}

	const handlePress = (tabName: TabName) => {
		setActiveTab(tabName)
		setIsFilterVisible({ isVisible: false, shouldFilter: true })
	}

	return (
		<View style={styles.container}>
			{['Transfer', 'Instant trade'].map((tabName: string) => {
				const isActive = useDerivedValue(() => {
					return withTiming(activeTab === tabName ? 1 : 0)
				})

				const rStyle = useAnimatedStyle(() => {
					const backgroundColor = interpolateColor(
						isActive.value,
						[0, 1],
						[colors.BUTTON_DISABLED, colors.PRIMARY_PURPLE]
					)
					return {
						backgroundColor,
					}
				})

				const rTextColor = useAnimatedStyle(() => {
					const color = interpolateColor(
						isActive.value,
						[0, 1],
						['#969CBF', colors.PRIMARY_TEXT]
					)
					return { color }
				})

				return (
					<AnimatedPressable
						key={tabName}
						style={[styles.tab, rStyle]}
						onPress={() => handlePress(tabName as TabName)}>
						<AppText medium style={[rTextColor]}>
							{tabName}
						</AppText>
					</AnimatedPressable>
				)
			})}
		</View>
	)
}

export default TabSwitcher

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
		marginTop: 10,
	},
	tab: {
		flex: 1,
		height: 38,
		borderRadius: 40,
		backgroundColor: colors.BUTTON_DISABLED,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
