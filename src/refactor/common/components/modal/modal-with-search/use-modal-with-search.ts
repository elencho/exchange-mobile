import { useSelector } from 'react-redux'
import { COINS_URL_PNG, COUNTRIES_URL_PNG } from '@app/constants/api'
import { RootState } from '@app/refactor/redux/rootReducer'

interface useModalWithSearch {
	choose: (countryName?: string, code?: string) => void
	crypto?: boolean
	title: string
}

export const useModalWithSearch = (props: useModalWithSearch) => {
	const { choose, crypto, title } = props

	const usdBtcSwitch = useSelector(
		(state: RootState) => state.wallet.usdBtcSwitch
	)

	const handlePress = (name: string, code: string) => {
		crypto ? choose(code) : choose(name, code)
	}

	const getUri = (code: string) => {
		return title === 'Choose Currency'
			? `${COINS_URL_PNG}/${code?.toLowerCase()}.png`
			: `${COUNTRIES_URL_PNG}/${code}.png`
	}

	return { getUri, handlePress, usdBtcSwitch }
}
