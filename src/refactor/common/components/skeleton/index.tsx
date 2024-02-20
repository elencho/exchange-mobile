import { Theme, useTheme } from '@theme/index'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef, useEffect } from 'react'
import { View, Animated, StyleProp, StyleSheet } from 'react-native'

type Props = {
	width: number
	height: number
	style?: StyleProp<any>
}

const Skeleton = ({ width, height, style }: Props) => {
	const { theme } = useTheme(_styles)

	const transalteX = useRef(new Animated.Value(-width)).current

	useEffect(() => {
		Animated.loop(
			Animated.timing(transalteX, {
				toValue: width + 100,
				useNativeDriver: true,
				duration: 1600,
			})
		).start()
	}, [width])

	return (
		<View
			style={[
				{
					width,
					height,
					overflow: 'hidden',
					backgroundColor: 'rgba(63, 66, 91, 0.3)',
				},
				style,
			]}>
			<Animated.View
				style={{
					width: '100%',
					height: '100%',
					transform: [{ translateX: transalteX }],
				}}>
				<LinearGradient
					style={{ width: '100%', height: '100%' }}
					colors={['#31334B', theme.color.skeleton, '#31334B']}
					start={{ x: 1, y: 1 }}
				/>
			</Animated.View>
		</View>
	)
}

const _styles = (theme: Theme) => StyleSheet.create({})

export default Skeleton
