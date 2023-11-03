import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AppModal from '@app/components/AppModal'
import ModalWithSearch from '@app/components/ModalWithSearch'
import { RootState } from '@app/refactor/redux/rootReducer'
import { Route } from '@app/refactor/setup/nav/nav'

interface Props {
	hide: () => void
	onCountryChosen: (country: Country) => void
	from: Route
	title?: string
}

const CountriesModal = ({
	hide,
	onCountryChosen,
	from,
	title = 'Choose Country',
}: Props) => {
	const { auth, common } = useSelector((state: RootState) => state)
	const { phoneCountryCode } = auth
	const { countries } = common

	const [filteredCountries, setFilteredCountries] = useState<Country[]>([])

	useEffect(() => {
		setFilteredCountries(countries)
	}, [])

	const filter = (txt: string) => {
		const filtered = countries.filter((country) =>
			country.name.toLowerCase().includes(txt.toLowerCase())
		)
		setFilteredCountries(filtered)
	}

	const choose = (countryName: string) => {
		const country = countries.find((c: Country) => c.name === countryName)
		country && onCountryChosen(country)
		hide()
	}

	const children = (
		<ModalWithSearch
			array={filteredCountries}
			choose={choose}
			filter={filter}
			currentItem={phoneCountryCode}
			title={title}
			phoneCountry={true}
			countryDrop={undefined}
			citizenshipDrop={undefined}
			tradeType={undefined}
			isForTransactions={undefined}
			wallet={undefined}
		/>
	)

	return (
		<AppModal
			visible={true}
			hide={hide}
			onModalHide={hide}
			children={children}
			fullScreen
			bottom={undefined}
			title={undefined}
			custom={undefined}
			onDismiss={undefined}
			modalStyle={undefined}
		/>
	)
}

export default CountriesModal
