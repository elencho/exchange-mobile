import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppModal from '@components/modal'
import { ModalWithSearch } from '@components/modal/modal-with-search'
import { RootState } from '@app/refactor/redux/rootReducer'
import { Route } from '@app/refactor/setup/nav/nav'
import { fetchCountriesThunk } from '@store/redux/common/thunks'

interface Props {
	hide: () => void
	onCountryChosen: (country: Country) => void
	from: Route
	title?: string
	chosenItem?: Country
	visible: boolean
	phoneCountry?: boolean
	countryFilterText: string
	setCountryFilterText: Dispatch<SetStateAction<string>>
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
		countryFilterText,
		setCountryFilterText,
	} = props
	const { countries } = common
	const dispatch = useDispatch()

	const [filteredCountries, setFilteredCountries] = useState<Country[]>([])

	useEffect(() => {
		setFilteredCountries(countries)
	}, [])

	const filter = (txt: string) => setCountryFilterText(txt.toLowerCase())
	useEffect(() => {
		const filtered = countries.filter(
			(country) => country?.name?.toLowerCase().includes(countryFilterText)
		)
		setFilteredCountries(filtered)
	}, [countryFilterText])

	const onShow = () => dispatch(fetchCountriesThunk())

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
			filterText={countryFilterText}
		/>
	)

	return (
		<AppModal
			visible={visible}
			hide={hide}
			children={children}
			delayedOpen
			fullScreen
			backgroundStyle={{ paddingHorizontal: 10 }}
			onShow={onShow}
		/>
	)
}

export default CountriesModal
