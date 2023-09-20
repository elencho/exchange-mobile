export type ScreenRoute = keyof ScreenProps

// TODO: Add props
export type ScreenProps = {
	Splash?: {}
	Welcome?: {}
	UpdateAvailable?: {}
	Maintenance?: {}
	Login?: {}
	Registration?: {}
	EmailVerification?: {}
	Main?: {}
	TransactionFilter?: {}
	UserProfile?: {}
	Balance?: {}
	CardVerificationOne?: {}
	CardVerificationTwo?: {}
	Login2Fa?: {}
	ResetOtpInstructions?: {}
	ForgotPassword?: {}
	SetNewPassword?: {}
	Resume: {
		fromSplash: boolean
		version?: boolean
		maintenanceInProgress: boolean
	}
}
