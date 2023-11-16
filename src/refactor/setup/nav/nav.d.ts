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

export type Nav = NativeStackNavigationProp<Screens, any, any>
export type Route = keyof Screens

export type Screens = {
	Splash?: {}
	Welcome?: {}
	UpdateAvailable?: {}
	Maintenance?: {}
	Login?: {}
	Registration?: {}
	EmailVerification?: {
		from: Route
		mail?: string
	}
	Login2Fa?: {}
	ForgotPassword?: {}
	SetNewPassword?: {}
	ResetOtpInstructions?: {
		resetOtpType?: ResetOtp
	}
	Main?: {
		fromResume: boolean
	}
	Resume: {
		from: Route
		maintenanceInProgress?: boolean
		version?: boolean
	}
	TransactionFilter?: {}
	UserProfile?: {}
	Balance?: {}
	CardVerificationOne?: {}
	CardVerificationTwo?: {}
}
