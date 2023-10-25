import React, { useEffect, useRef } from 'react'
import { Easing, Animated } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function AppAnimatedCircle({
	percentage = 100,
	radius = 40,
	strokeWidth = 10,
	duration = 500,
	color = 'white',
	delay = 0,
	max = 100,
	pressed = false,
}) {
	const circleRef = useRef<AnimatedCircle>()

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
