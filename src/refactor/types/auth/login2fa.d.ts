type OTP = 'TOTP' | 'EMAIL' | 'SMS'

type ResetOtp = 'Support' | 'Manual'

// TODO: Keycloak common response

interface ResetOtpResponse {
	attributes: {
		resetOTPInstructions?: boolean
		resetOTP?: boolean
		otpType?: OTP
	}
	execution: Execution | ''
	callbackUrl: string
}

interface ResendOtpResponse {
	execution: Execution
	callbackUrl: string
}

interface OtpLoginResponse {
	callbackUrl: string
	code: string
	session_state: string
	execution: Execution
	errors: any[] //TODO: Type
}

interface CodeToTokenResponse {
	access_token: string
	expires_in: number
	id_token: string
	refresh_expires_in: number
	refresh_token: string
}
