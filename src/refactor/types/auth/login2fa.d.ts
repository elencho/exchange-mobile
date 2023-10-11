type OTP = 'TOTP' | 'EMAIL' | 'SMS'

type ResetOtp = 'Support' | 'Manual'

interface ResetOtpResponse {
	attributes: {
		resetOTPInstructions: boolean
		resetOTP: boolean
		otpType: OTP
	}
	execution: Execution | ''
	callbackUrl: string
}
