import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCountriesModal } from '../../redux/modals/actions'
import {
	fetchCountries,
	saveCountries,
	saveUserInfo,
	setRegistrationInputs,
} from '../../redux/profile/actions'
import AppModal from '../AppModal'
import ModalWithSearch from '../ModalWithSearch'

export default function CountriesModal({
	countryDrop = false,
	citizenshipDrop = false,
	phoneCountry = false,
	registration = false,
	reset,
	title = 'Choose Country',
}) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		modals: { countriesModalVisible },
		profileOld: { countries, countriesConstant, userInfo, registrationInputs },
	} = state

	useEffect(() => {
		dispatch(fetchCountries())
	}, [])

	const filter = (text) => {
		const filteredArray = countriesConstant.filter((c) =>
			c?.name.toLowerCase().includes(text.toLowerCase())
		)
		dispatch(saveCountries(filteredArray))
	}

	const hide = () => {
		dispatch(toggleCountriesModal(false))
		dispatch(saveCountries(countriesConstant))
		reset && reset()
	}

	const currentItem = () => {
		if (countryDrop) return userInfo?.country
		if (citizenshipDrop) return userInfo?.citizenship
		if (registration) return registrationInputs?.phoneCountry
		if (phoneCountry) return userInfo?.phoneCountry
	}

	const choose = (country) => {
		const code = (country) => {
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

	const children = (
		<ModalWithSearch
			array={countries}
			choose={choose}
			filter={filter}
			currentItem={currentItem()}
			title={title}
			phoneCountry={phoneCountry}
			countryDrop={countryDrop}
			citizenshipDrop={citizenshipDrop}
		/>
	)

	return (
		<AppModal
			visible={countriesModalVisible}
			hide={hide}
			onModalHide={hide}
			children={children}
			fullScreen
		/>
	)
}
