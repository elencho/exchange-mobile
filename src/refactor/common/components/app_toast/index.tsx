import React, { memo, useEffect } from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import AppText from '@components/text'
import AppAnimatedCircle from './animated-circle'
import { useAnimation } from './use-animation'
import { useSelector } from 'react-redux'
import { Theme, useTheme } from '@theme/index'
import { RootState } from '@app/refactor/redux/rootReducer'
import { formatUiError } from '@components/util'

const AppToast = () => {
	const { styles } = useTheme(_styles)

	const appToast = useSelector((state: RootState) => state.common.appToastData)
	const { pressed, setPressed, translateY } = useAnimation(appToast)

	const errorBody = formatUiError(appToast)

	useEffect(() => {
		console.log('AppToast.index', appToast)
	}, [appToast])

	return (
		<>
			{appToast && (
				<Animated.View
					style={[styles.container, { transform: [{ translateY }] }]}>
					<Pressable
						style={styles.pressable}
						onPressIn={() => setPressed(true)}
						onPressOut={() => setPressed(false)}>
						<AppAnimatedCircle
							duration={6000}
							radius={15}
							strokeWidth={3}
							delay={500}
							pressed={pressed}
						/>

						<View style={styles.texts}>
							{appToast?.errorKey ? (
								<AppText style={styles.white}>Error</AppText>
							) : null}
							{errorBody ? (
								<AppText variant="s" style={styles.white}>
									{errorBody}
								</AppText>
							) : null}
						</View>
					</Pressable>
				</Animated.View>
			)}
		</>
	)
}

const _styles = (_: Theme) =>
	StyleSheet.create({
		container: {
			paddingVertical: 15,
			paddingHorizontal: 22,
			borderRadius: 35,
			backgroundColor: '#E2274C',
			position: 'absolute',
			top: 0,
			left: 20,
			right: 20,
			zIndex: 1,
		},
		pressable: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		texts: {
			marginLeft: 18,
			flex: 1,
		},
		white: {
			color: 'white',
		},
	})

export default AppToast
