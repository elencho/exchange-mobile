export type ScreenRoute = keyof Screens

// TODO: Add props
export type Screens = {
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
		maintenanceInProgress: boolean
		version?: boolean
	}
}
