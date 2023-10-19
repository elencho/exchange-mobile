export interface TokenEmail {
	email: string
}

export interface TokenOtpType {
	otpType: OTP
}

export type Dictionary = Record<string, { translation: Record<string, string> }>

export interface AppReadiness {
	status: string
	versionValid: boolean
}
