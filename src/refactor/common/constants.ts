import background from 'assets/images/BG.png'
import stars from 'assets/images/Stars.png'
import btc from 'assets/images/Currencies/BTC.png'
import usd from 'assets/images/Currencies/USD.png'
import eth from 'assets/images/Currencies/ETH.png'
import geo from 'assets/images/Flags/GEO.png'

export enum Language {
	ka = 'ka',
	en = 'en',
}

export const Images = {
	background,
	stars,
	btc,
	usd,
	eth,
	geo,
} as const
