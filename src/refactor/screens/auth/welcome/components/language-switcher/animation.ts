import {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
	withSpring,
} from 'react-native-reanimated'

export default function useAnimation() {
	const toggle = useSharedValue(0)

	const fillStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: toggle.value }],
			opacity: toggle.value,
		}
	})

	const outlineStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(toggle.value, [0, 1], [1, 0], Extrapolate.CLAMP),
				},
			],
		}
	})

	const toggleAnimation = () => {
		toggle.value = withSpring(toggle.value ? 0 : 1)
	}

	return { fillStyle, outlineStyle, toggleAnimation }
}
