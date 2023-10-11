interface LoginStartResponse {
	attributes?: {}
	callbackUrl: string
	errors: string[]
	execution: Execution | ''
	passwordResetUrl?: string
}

interface LoginFormResponse {
	attributes: {
		otpType: OTP
	}
	execution: Execution | ''
	callbackUrl: string
}

interface PkceInfo {
	codeChallenge: string
	codeVerifier: string
}
