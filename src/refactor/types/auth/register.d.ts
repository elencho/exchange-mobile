type UserType = 'Personal' | 'Company'

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

interface VerifyAccountResponse {
	code: string
	session_state: string
	errors: any[] //TODO: Type
}

type CountriesResponse = Country[]

interface Country {
	code: string
	name: string
	phoneCode: string
	banned: boolean
}
