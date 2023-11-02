export interface TokenParams {
	email: string
	otpType: OTP
}

export type Dictionary = Record<string, { translation: Record<string, string> }>

export interface AppReadiness {
	status: string
	versionValid: boolean
}

export interface RefreshTokenResponse {
	access_token: string
	expires_in: number
	id_token: string
	refresh_token: string
	refresh_expires_in: number
}
