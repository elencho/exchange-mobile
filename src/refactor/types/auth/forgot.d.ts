interface ForgotPasswordStartResponse {
	callbackUrl: string
	execution: Execution
	errors: UiErrorData[]
}

interface ResetPasswordResponse {
	callbackUrl: string
	execution: Execution
	errors: UiErrorData[]
}

interface ResetPasswordOtpResponse {
	attributes: {
		otpType: OTP
	}
	callbackUrl: string
	execution: Execution
	errors: UiErrorData[]
}

interface SetNewPasswordResponse {
	code: string
	session_state: string
	errors: UiErrorData[]
}
