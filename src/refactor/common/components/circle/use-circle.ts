import React, { forwardRef, useEffect, useRef } from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import { Circle } from 'react-native-svg'

interface UseCircleProps {
	pressed: boolean
	radius: number
	strokeWidth: string
	delay: number
	duration: number
	percentage: number
	max: number
}

export const useCircle: React.FC<UseCircleProps> = forwardRef((props, ref) => {
	const { pressed, radius, strokeWidth, delay, duration, percentage, max } =
		props
	const animated = useRef(new Animated.Value(0)).current

	const circumference = 2 * Math.PI * radius
	const halfCircle = radius + strokeWidth

	const animation = (toValue: number) => {
		return Animated.timing(animated, {
			delay,
			toValue,
			duration,
			useNativeDriver: true,
			easing: Easing.out(Easing.ease),
		}).start()
	}

	useEffect(() => {
		if (!pressed) {
			animation(percentage)
			animated.addListener(
				(v) => {
					const maxPerc = (100 * v.value) / max
					const strokeDashoffset =
						circumference - (circumference * maxPerc) / 100
					if (ref?.current) ref.current.setNativeProps({ strokeDashoffset })
				},
				[max, percentage]
			)
		} else {
			animated.setValue(0)
			animated.removeAllListeners()
		}

		return () => {
			animated.removeAllListeners()
			animated.setValue(0)
		}
	}, [pressed])
	return {}
})
