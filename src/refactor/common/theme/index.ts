import { ColorTheme, COLORS_DARK } from 'refactor/common/theme/colors'

export interface Theme {
	id: string
	color: ColorTheme
}

export const THEME_DARK: Theme = {
	id: 'id_theme_dark',
	color: COLORS_DARK,
}
