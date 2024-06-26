import background from '@assets/images/BG.png'
import btc from '@assets/images/Currencies/BTC.png'
import eth from '@assets/images/Currencies/ETH.png'
import usd from '@assets/images/Currencies/USD.png'
import geo from '@assets/images/Flags/GEO.png'
import stars from '@assets/images/Stars.png'

export type Language = 'ka' | 'en'

export const COUNTDOWN_SECONDS = 30

export const BIOMETRIC_DIFF_MILLIS = 30 * 1000

export const Images = {
	background,
	stars,
	btc,
	usd,
	eth,
	geo,
} as const
