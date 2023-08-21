import React from 'react'
import { THEME_DARK, Theme } from 'refactor/common/theme'

interface ProvidedValue {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = React.createContext<ProvidedValue>({
	theme: THEME_DARK,
	toggleTheme: () => {
		console.log('ThemeProvider is not rendered!')
	},
})

interface Props {
	initial: Theme
	children?: React.ReactNode
}

export const CryptalThemeProvider = React.memo<Props>((props) => {
	const [theme, setTheme] = React.useState<Theme>(props.initial)

	const ToggleThemeCallback = React.useCallback(() => {
		setTheme((currentTheme) => {
			if (currentTheme.id === THEME_DARK.id) {
				return THEME_DARK
			}
			return currentTheme
		})
	}, [])

	const MemoizedValue = React.useMemo(() => {
		const value: ProvidedValue = {
			theme,
			toggleTheme: ToggleThemeCallback,
		}
		return value
	}, [theme, ToggleThemeCallback])
	return (
		<ThemeContext.Provider value={MemoizedValue}>
			{props.children}
		</ThemeContext.Provider>
	)
})

export const useContextTheme = () => React.useContext(ThemeContext)
