interface LoginStartResponse {
	attributes?: {}
	callbackUrl: string
	errors: string[]
	execution: Execution | ''
	passwordResetUrl?: string
}

interface LoginFormResponse {
	execution: Execution | ''
	code?: string
}

interface PkceInfo {
	codeChallenge: string
	codeVerifier: string
}
