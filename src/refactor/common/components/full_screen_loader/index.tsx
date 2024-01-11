import { StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import { MaterialIndicator } from 'react-native-indicators'
import { Theme, useTheme } from '@theme/index'

interface Props {
	children: ReactNode
	loading: boolean
}

export const FullScreenLoader = (props: Props) => {
	const { children, loading } = props
	const { styles, theme } = useTheme(_styles)

	return (
		<>
			{children}
			{loading && (
				<View style={[StyleSheet.absoluteFill, styles.wrapper]}>
					<MaterialIndicator
						color={theme.color.brandSecondary}
						animationDuration={3000}
						size={40}
					/>
				</View>
			)}
		</>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		wrapper: {
			backgroundColor: 'rgba(31, 31, 53, 0.5)',
			alignItems: 'center',
			justifyContent: 'center',
		},
	})
