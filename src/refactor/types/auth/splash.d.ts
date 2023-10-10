export interface Token {
	email: string
}

export type Dictionary = Record<string, { translation: Record<string, string> }>

export interface AppReadiness {
	status: string
	versionValid: boolean
}
