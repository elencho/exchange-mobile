export interface ColorTheme {
	brandPrimary: string //PRIMARY_PURPLE
	brandSecondary: string //SECONDARY_PURPLE

	backgroundPrimary: string //PRIMARY_BACKGROUND
	onPrimary: string //PRIMARY TEXT
	backgroundSecondary: string //SECONDARY_BACKGROUND
	onSecondary: string //SECONDARY_TEXT

	skeleton: string //SKELETON
	border: string //BORDER
	buttonDisabled: string //BUTTON_DISABLED
	redLite: string //LITE_RED
	error: string //ERROR_TEXT
}

export const COLORS_DARK: ColorTheme = {
	brandPrimary: '#4A6DFF',
	brandSecondary: '#6582FD',
	backgroundPrimary: '#161629',
	onPrimary: '#FFFFFF',
	backgroundSecondary: '#1F1F35',
	onSecondary: '#696F8E',
	skeleton: '#4B4B65',
	border: '#42475D',
	buttonDisabled: '#292943',
	redLite: '#DE90A8',
	error: '#F45E8C',
}

// TODO: Refactor bottom colors & Remove comments from ColorTheme
