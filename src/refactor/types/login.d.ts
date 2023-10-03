interface LoginStart {
	attributes: {}
	callbackUrl: string
	errors: string[]
	execution: string
	passwordResetUrl?: string
}

interface PkceInfo {
	codeChallenge: string
	codeVerifier: string
}
