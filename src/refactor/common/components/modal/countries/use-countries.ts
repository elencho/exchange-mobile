import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserInfo, setRegistrationInputs } from '@app/redux/profile/actions'
import { toggleCountriesModal } from '@app/refactor/redux/modals/modalsSlice'
import {
	fetchCountries,
	saveCountries,
} from '@app/refactor/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'

interface useCountriesProps {
	reset?: () => void
	citizenshipDrop?: boolean
	phoneCountry?: boolean
	registration?: boolean
}

export const useCountries = (props: useCountriesProps) => {
	const { reset } = props
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)

	const {
		modals: { countriesModalVisible },
		profile: { countries, countriesConstant, userInfo, registrationInputs },
	} = state

	useEffect(() => {
		dispatch(fetchCountries())
	}, [])

	const filter = (text: string) => {
		const filteredArray = countriesConstant.filter((c) =>
			c.name.toLowerCase().includes(text.toLowerCase())
		)
		dispatch(saveCountries(filteredArray))
	}

	const hide = () => {
		dispatch(toggleCountriesModal(false))
		dispatch(saveCountries(countriesConstant))
		reset && reset()
	}

	const choose = (country: string) => {
		const code = (country: string) => {
			let code
			countriesConstant.forEach((c) => {
				if (c.name === country) code = c.code
			})
			return code
		}

		if (countryDrop) {
			dispatch(
				saveUserInfo({ ...userInfo, country, countryCode: code(country) })
			)
		}
		if (citizenshipDrop) {
			dispatch(saveUserInfo({ ...userInfo, citizenship: code(country) }))
		}
		if (phoneCountry && !registration) {
			dispatch(saveUserInfo({ ...userInfo, phoneCountry: code(country) }))
		}
		if (phoneCountry && registration) {
			dispatch(
				setRegistrationInputs({
					...registrationInputs,
					phoneCountry: code(country),
				})
			)
		}
		hide()
	}
	return {
		filter,
		countriesModalVisible,
		countries,
		countriesConstant,
		userInfo,
		registrationInputs,
		hide,
		choose,
	}
}
