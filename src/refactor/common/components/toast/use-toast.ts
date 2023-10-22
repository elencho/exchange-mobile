import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export const useToast = () => {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		modals: { appToastObj },
	} = state
	const [pressed, setPressed] = useState(false)

	const animated = useRef(new Animated.Value(0)).current
	const animatedObj = (toValue: number, delay: number) => {
		return {
			delay,
			toValue,
			duration: 500,
			useNativeDriver: true,
			easing: Easing.out(Easing.ease),
		}
	}

	const animationStart = () =>
		Animated.timing(animated, animatedObj(1, 200)).start()

	const animationFinish = () =>
		Animated.timing(animated, animatedObj(0, 200)).start(() =>
			dispatch(setAppToast(null))
		)

	useEffect(() => {
		if (appToastObj) {
			animationStart()

			const timeout = setTimeout(() => {
				animationFinish()
			}, 5000)

			if (pressed) clearTimeout(timeout)
		}

		return () => {
			setPressed(false)
		}
	}, [appToastObj, pressed])

	const translateY = animated.interpolate({
		inputRange: [0, 1],
		outputRange: [-200, 35],
	})

	return {
		pressed,
		setPressed,
		translateY,
		animationStart,
		animationFinish,
		appToastObj,
	}
}

const styles = StyleSheet.create({})
