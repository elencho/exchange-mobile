import React, { ReactNode, memo } from 'react'
import {
	StatusBar,
	StyleSheet,
	View,
	SafeAreaView,
	StyleProp,
	ViewStyle,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Theme, useTheme } from '@theme/index'
import { System } from '@app/refactor/common/util'

type Props = {
	children: ReactNode
	style?: StyleProp<any>
}

const AppBackground: React.FC<Props> = ({ children, style }) => {
	const { theme, styles } = useTheme(_styles)
	const { top, right, left } = useSafeAreaInsets()

	const safeAreaStyles = {
		paddingTop: top,
		paddingLeft: left,
		paddingRight: right,
		backgroundColor: theme.color.backgroundPrimary,
	}
	return (
		<>
			{System.isIos && <View style={safeAreaStyles} />}
			<View style={[styles.container, { ...style }]}>{children}</View>
			{System.isIos && <SafeAreaView style={styles.safeArea} />}
		</>
	)
}

const _styles = (theme: Theme) => {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.color.backgroundPrimary,
			paddingVertical: StatusBar.currentHeight,
			paddingHorizontal: 20,
		},
		safeArea: {
			backgroundColor: theme.color.backgroundPrimary,
		},
	})
}

export default memo(AppBackground)
