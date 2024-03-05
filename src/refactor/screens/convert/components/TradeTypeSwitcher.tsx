import { convertColors } from '@app/refactor/screens/convert/util'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { useEffect, useRef } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

type Props = {
	selectedType: TradeType
	onTypeChanged: (type: TradeType) => void
}

const TradeTypeSwitcher = ({ selectedType, onTypeChanged }: Props) => {
	const { styles, theme } = useTheme(_styles)
	const tradesToDraw: TradeType[] = ['Buy', 'Sell']

	const containerWidthRef = useRef(0)
	const xPosition = useSharedValue(0)

	useEffect(() => {
		xPosition.value = selectedType === 'Buy' ? 0 : containerWidthRef.current / 2
	}, [selectedType])

	const animStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(xPosition.value, {
						duration: 250,
						easing: Easing.linear,
					}),
				},
			],
			position: 'absolute',
			width: '50%',
			height: '100%',
			borderRadius: 40,
			backgroundColor:
				selectedType === 'Buy' ? convertColors.buy : convertColors.sell,
		}
	})

	return (
		<View
			style={styles.container}
			onLayout={(e) => {
				containerWidthRef.current = e.nativeEvent.layout.width
			}}>
			<Animated.View style={animStyle}></Animated.View>
			<View
				style={{
					height: '100%',
					flexDirection: 'row',
				}}>
				{tradesToDraw.map((type: TradeType) => (
					<Pressable
						key={type}
						style={styles.button}
						onPress={() => {
							type !== selectedType && onTypeChanged(type)
						}}>
						<AppText
							style={{
								color:
									type === selectedType
										? theme.color.textPrimary
										: theme.color.textThird,
							}}
							variant="l">
							{type}
						</AppText>
					</Pressable>
				))}
			</View>
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			alignContent: 'stretch',
			height: 40,
			borderRadius: 40,
			backgroundColor: theme.color.backgroundSecondary,
		},
		button: {
			justifyContent: 'center',
			alignItems: 'center',
			flex: 1,
		},
	})

export { TradeTypeSwitcher }
