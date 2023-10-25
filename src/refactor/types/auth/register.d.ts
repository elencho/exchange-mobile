interface RegistrationStartResponse {
	execution: Execution
	callbackUrl: string
	errors: string[]
	attributes: {
		phoneCountry: string
	}
}

interface RegistrationFormResponse {
	execution: Execution
	callbackUrl: string
}

type UserType = 'Personal' | 'Company'

type CountriesResponse = Country[]

interface Country {
	code: string
	name: string
	phoneCode: string
	banned: boolean
}
