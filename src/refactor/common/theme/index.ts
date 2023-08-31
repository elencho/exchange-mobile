import { ColorTheme, COLORS_DARK } from 'refactor/common/theme/colors'
import { FONTS_DEFAULT, FontTheme } from 'refactor/common/theme/fonts'

export interface Theme {
	id: string
	color: ColorTheme
	font: FontTheme
}

export const THEME_DARK: Theme = {
	id: 'id_theme_dark',
	color: COLORS_DARK,
	font: FONTS_DEFAULT,
}
