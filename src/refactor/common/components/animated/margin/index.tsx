import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

/**
 * Currently only supports vertical
 * We can add horizontal easily
 */

type Props = {
	min: number
	max: number
	expanded: boolean
	durationMillis: number
}

const AnimatedMargin = ({ min, max, expanded, durationMillis }: Props) => {
	const margin = useSharedValue(min)

	useEffect(() => {
		toggleSize()
	}, [expanded])

	const toggleSize = () => {
		margin.value = withTiming(expanded ? max : min, {
			duration: durationMillis,
		})
	}

	const animStyle = useAnimatedStyle(() => {
		return {
			height: margin.value,
			width: '100%',
		}
	})

	return (
		<Animated.View style={animStyle}>
			<View style={{ height: min, width: '100%' }} />
		</Animated.View>
	)
}

export { AnimatedMargin }
