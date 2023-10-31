import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'
import usePersonalSecuritySwitcher from './usePersonalSecuritySwitcher'

export default function PersonalSecuritySwitcher() {
	const { Personal_Security, handleSwitch } = usePersonalSecuritySwitcher()
	const { theme, styles } = useTheme(_styles)

	const stylesCond = (p: string) => {
		if (p === Personal_Security) {
			return styles.active
		} else {
			return styles.inactive
		}
	}

	const textCond = (f: string) => {
		const isActive = f === Personal_Security
		return (
			<AppText
				variant="m"
				style={{ color: isActive ? theme.color.textPrimary : '#C0C5E0' }}>
				{f}
			</AppText>
		)
	}

	return (
		<View style={styles.filterRow}>
			{['Personal', 'Security'].map((p) => (
				<Pressable
					style={[styles.button, stylesCond(p)]}
					onPress={() => handleSwitch(p)}
					key={p}>
					{textCond(p)}
				</Pressable>
			))}
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		active: {
			backgroundColor: theme.color.brandPrimary,
		},
		inactive: {
			backgroundColor: theme.color.backgroundSecondary,
		},
		button: {
			paddingVertical: 12,
			borderRadius: 40,
			width: '48%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		filterRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: 20,
		},
		text: {
			fontSize: 15,
			lineHeight: 19,
			color: theme.color.textSecondary,
		},
	})