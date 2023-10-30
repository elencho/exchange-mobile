export interface TokenParams {
	email: string
	otpType: OTP
}

export type Dictionary = Record<string, { translation: Record<string, string> }>

export interface AppReadiness {
	status: string
	versionValid: boolean
}
