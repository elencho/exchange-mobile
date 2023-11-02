import { setAppToast } from '@store/redux/common/slice'
import { useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'
import { useDispatch } from 'react-redux'

export const useAnimation = (appToast?: UiErrorData) => {
	const dispatch = useDispatch()
	const [pressed, setPressed] = useState(false)

	useEffect(() => {
		if (appToast) {
			animationStart()

			const timeout = setTimeout(() => {
				animationFinish()
			}, 5000)

			if (pressed) clearTimeout(timeout)
		}

		return () => {
			setPressed(false)
		}
	}, [appToast, pressed])

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
	const translateY = animated.interpolate({
		inputRange: [0, 1],
		outputRange: [-200, 35],
	})

	const animationStart = () =>
		Animated.timing(animated, animatedObj(1, 200)).start()

	const animationFinish = () =>
		Animated.timing(animated, animatedObj(0, 200)).start(() =>
			dispatch(setAppToast(undefined))
		)

	return {
		pressed,
		setPressed,
		translateY,
		animationStart,
		animationFinish,
	}
}
