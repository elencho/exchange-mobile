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
