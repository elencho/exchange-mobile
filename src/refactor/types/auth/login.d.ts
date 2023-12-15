interface LoginStartResponse {
	attributes?: {}
	callbackUrl: string
	passwordResetUrl: string
	errors: string[]
	execution: Execution
}

interface LoginFormResponse {
	attributes: {
		email?: string
		otpType: OTP
	}
	execution: Execution
	callbackUrl: string
	passwordResetUrl: string
}

interface PkceInfo {
	codeChallenge: string
	codeVerifier: string
}
