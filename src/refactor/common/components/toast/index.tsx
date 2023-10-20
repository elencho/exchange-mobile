import React from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import AppText from '@components/text'
import AppAnimatedCircle from './circle'
import { useToast } from './use-toast'

const Texts = ({ toastObj }) => (
	<View style={styles.texts}>
		{toastObj?.header ? <AppText style={styles.white}>Error</AppText> : null}
		{toastObj?.body ? (
			<AppText variant="s" style={styles.white}>
				{toastObj?.body}
			</AppText>
		) : null}
	</View>
)

export const AppToast = () => {
	const { appToastObj, translateY, setPressed, pressed } = useToast()

	return (
		<>
			{appToastObj && (
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
						<Texts toastObj={appToastObj} />
					</Pressable>
				</Animated.View>
			)}
		</>
	)
}

const styles = StyleSheet.create({
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
