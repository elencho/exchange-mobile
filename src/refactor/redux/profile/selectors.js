export const getUserData = (state) => {
	const {
		profile: { userInfo },
	} = state

	let formData = new FormData()
	formData.append('address', userInfo.address)
	formData.append('country', userInfo.countryCode)
	formData.append('city', userInfo.city)
	formData.append('postalCode', userInfo.postalCode)

	if (userInfo?.userStatus === 'UNVERIFIED') {
		formData.append('firstName', userInfo.firstName)
		formData.append('lastName', userInfo.lastName)
		formData.append('citizenship', userInfo.citizenship)
	}

	return formData
}

export const registrationParams = (state) => {
	const {
		profile: { registrationInputs, Personal_Company },
	} = state

	const clientType = Personal_Company === 'Company' ? 'CORPORATE' : 'PHYSICAL'

	return {
		...registrationInputs,
		clientType,
		phoneCountry: 'GEO',
	}
}
