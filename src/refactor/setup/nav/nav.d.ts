import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'

export type ScreenProp<R extends keyof Screens> = NativeStackScreenProps<
	Screens,
	R
>
export type NavProp<R extends keyof Screens> = NativeStackNavigationProp<
	Screens,
	R,
	Screens[R]
>

export type Screens = {
	Splash?: {}
	Welcome?: {}
	UpdateAvailable?: {}
	Maintenance?: {}
	Login?: {}
	Registration?: {}
	EmailVerification?: {}
	Login2Fa?: {}
	ForgotPassword?: {}
	SetNewPassword?: {}
	ResetOtpInstructions?: {
		resetOtpType?: ResetOtp
	}
	Main?: {}
	Resume: {
		fromSplash: boolean
		maintenanceInProgress: boolean
		version?: boolean
	}
	TransactionFilter?: {}
	UserProfile?: {}
	Balance?: {}
	CardVerificationOne?: {}
	CardVerificationTwo?: {}
}
