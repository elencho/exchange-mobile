import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AppModal from '@app/components/AppModal'
import { ModalWithSearch } from '@components/modal/modal-with-search'
import { RootState } from '@app/refactor/redux/rootReducer'
import { Route } from '@app/refactor/setup/nav/nav'

interface Props {
	hide: () => void
	onCountryChosen: (country: Country) => void
	from: Route
	title?: string
	chosenItem?: Country
	visible: boolean
	phoneCountry?: boolean
}

const CountriesModal = (props: Props) => {
	const { auth, common } = useSelector((state: RootState) => state)
	const { phoneCountryCode } = auth
	const {
		hide,
		onCountryChosen,
		chosenItem = phoneCountryCode,
		from,
		title = 'Choose Country',
		visible = true,
		phoneCountry,
	} = props
	const { countries } = common

	const [filteredCountries, setFilteredCountries] = useState<Country[]>([])

	useEffect(() => {
		setFilteredCountries(countries)
	}, [])

	const filter = (txt: string) => {
		const filtered = countries.filter((country) =>
			country?.name?.toLowerCase().includes(txt.toLowerCase())
		)
		setFilteredCountries(filtered)
	}

	const choose = (countryName?: string) => {
		const country = countries.find((c: Country) => c.name === countryName)
		country && onCountryChosen(country)
		hide()
	}

	const children = (
		<ModalWithSearch
			array={filteredCountries}
			choose={choose}
			filter={filter}
			currentItem={chosenItem?.name}
			title={title}
			phoneCountry={phoneCountry}
			countryDrop={true}
		/>
	)

	return (
		<AppModal
			visible={visible}
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
