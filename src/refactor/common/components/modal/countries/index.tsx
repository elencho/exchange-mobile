import React from 'react'
import AppModal from '@components/modal'
import { ModalWithSearch } from '@components/modal/modal-with-search'
import { useCountries } from './use-countries'

interface CountriesModalProps {
	countryDrop?: boolean
	citizenshipDrop?: boolean
	phoneCountry?: boolean
	registration?: boolean
	reset?: () => void
	title?: string
}

export const CountriesModal = (props: CountriesModalProps) => {
	const {
		countryDrop = false,
		citizenshipDrop = false,
		phoneCountry = false,
		registration = false,
		reset,
		title = 'Choose Country',
	} = props
	const {
		filter,
		countriesModalVisible,
		countries,
		countriesConstant,
		userInfo,
		registrationInputs,
		hide,
		choose,
	} = useCountries({ reset })

	const currentItem = () => {
		if (countryDrop) return userInfo?.country
		if (citizenshipDrop) return userInfo?.citizenship
		if (registration) return registrationInputs?.phoneCountry
		if (phoneCountry) return userInfo?.phoneCountry
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
			backgroundStyle={{ paddingHorizontal: 10 }}
		/>
	)
}
