interface LoginStart {
	attributes: {}
	callbackUrl: string
	errors: string[]
	execution: Execution
	passwordResetUrl?: string
}

type Execution = 'LOGIN_USERNAME_PASSWORD' | 'EMAIL_VERIFICATION_OTP'

interface PkceInfo {
	codeChallenge: string
	codeVerifier: string
}

interface Credentials {
	login: string
	password: string
}

interface UsernameAndPasswordFormProps {
	login: string
	password: string
	url: string
}
