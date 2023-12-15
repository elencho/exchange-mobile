interface FetchCurrenciesResponse {
	[Currency]
}

interface Currency {
	code: string
	displayCode: string
	name: string
	type: CurrencyType
	types: Array<CurrencyType>
	stableCoin: boolean
	providerToUrlPattern: {
		additionalProp1: {
			transactionUrlPattern: string
			addressUrlPattern: string
		}
		additionalProp2: {
			transactionUrlPattern: string
			addressUrlPattern: string
		}
		additionalProp3: {
			transactionUrlPattern: string
			addressUrlPattern: string
		}
	}
}

type CurrencyType = 'FIAT' | 'CRYPTO'

type CompanyInfoData = {
	header: string
	description: string
	link: string
	button: string
}
