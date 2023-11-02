import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCountries } from '../auth/api'

export const fetchCountriesThunk = createAsyncThunk(
	'fetchCountries',
	async (_, {}) => {
		const data = await fetchCountries()
		return data
	}
)
