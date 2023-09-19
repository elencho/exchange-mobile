import React from 'react'
import { StyleSheet } from 'react-native/Libraries/StyleSheet/StyleSheet'

import { Theme, THEME_DARK } from '@theme/variants'

interface Props {
	initial: Theme
	children?: React.ReactNode
}

interface ThemeData {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeData>({
	theme: THEME_DARK,
	toggleTheme: () => {
		console.log('ThemeProvider is not rendered!')
	},
})

export const CryptalThemeProvider = React.memo<Props>((props) => {
	const [theme, setTheme] = React.useState<Theme>(props.initial)

	const toggleThemeCallback = React.useCallback(() => {
		setTheme((currentTheme) => {
			if (currentTheme.id === THEME_DARK.id) {
				return THEME_DARK
			}
			return currentTheme
		})
	}, [])

	const MemoizedTheme = React.useMemo(() => {
		const value: ThemeData = {
			theme,
			toggleTheme: toggleThemeCallback,
		}
		return value
	}, [theme, toggleThemeCallback])

	return (
		<ThemeContext.Provider value={MemoizedTheme}>
			{props.children}
		</ThemeContext.Provider>
	)
})

export const useTheme = (
	createStyles?: (theme: Theme) => StyleSheet.NamedStyles<any>
) => {
	const data = React.useContext(ThemeContext)
	return {
		theme: data.theme,
		toggleTheme: data.toggleTheme,
		styles: createStyles?.(data.theme) ?? {},
	}
}
