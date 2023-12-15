import React, { useEffect, useRef } from 'react'
import { Easing, Animated } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface Props {
	duration?: number
	radius?: number
	percentage?: number
	strokeWidth?: number
	delay?: number
	max?: number
	pressed?: boolean
	color?: string
}

export default function AppAnimatedCircle({
	percentage = 100,
	radius = 40,
	strokeWidth = 10,
	duration = 500,
	color = 'white',
	delay = 0,
	max = 100,
	pressed = false,
}: Props) {
	const animated = useRef(new Animated.Value(0)).current
	const circleRef = useRef<any>() //TODO: type
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
			animated.addListener((v) => {
				const maxPerc = (100 * v.value) / max
				const strokeDashoffset = circumference - (circumference * maxPerc) / 100
				if (circleRef?.current)
					circleRef.current.setNativeProps({ strokeDashoffset })
			})
		} else {
			animated.setValue(0)
			animated.removeAllListeners()
		}

		return () => {
			animated.removeAllListeners()
			animated.setValue(0)
		}
	}, [pressed])

	return (
		<Svg
			height={radius * 2}
			width={radius * 2}
			viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
			<G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
				<AnimatedCircle
					ref={circleRef}
					cx="48%"
					cy="48%"
					r={radius}
					fill="transparent"
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeDashoffset={circumference}
					strokeDasharray={circumference}
				/>
				<Circle
					cx="48%"
					cy="48%"
					r={radius}
					fill="transparent"
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinejoin="round"
					strokeOpacity=".3"
				/>
			</G>
		</Svg>
	)
}
