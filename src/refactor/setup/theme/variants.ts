import { ColorTheme, COLORS_DARK } from '@theme/colors'
import { FontTheme, FONTS_DEFAULT } from '@theme/fonts'

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
