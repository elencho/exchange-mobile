interface ForgotPasswordStartResponse {
	callbackUrl: string
	execution: Execution
	errors: any[] //TODO: Type
}

interface ResetPasswordResponse {
	attributes: {
		otpType: OTP
	}
	callbackUrl: string
	execution: Execution
	errors: any[] //TODO: Type
}

interface ResetPasswordOtpResponse {
	callbackUrl: string
	execution: Execution
	errors: any[] //TODO: Type
}

interface SetNewPasswordResponse {
	code: string
	session_state: string
	errors: any[] //TODO: Type
}
