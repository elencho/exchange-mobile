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
	NoInternet?: {}
	Maintenance?: {}
	Login?: {
		generalError?: UiErrorData
	}
	Registration?: {}
	EmailVerification: {
		from: 'Login' | 'Registration' | 'ForgotPassword'
		mail?: string
	}
	Login2Fa?: {}
	ForgotPassword?: {}
	SetNewPassword?: {}
	ResetOtpInstructions: {
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
	UserProfile?: {
		justRegistered: boolean
	}
	Balance?: {}
	CardVerificationOne?: {}
	CardVerificationTwo?: {}
	ConvertNow?: {}
	SelectCard: {
		fees: ProviderFees[]
		cards: Card[]
		onCardChoose: (card: Card) => void
	}
	ConfirmConvert: {
		spentAmount: string
		receivedAmount: string
		pair: CoinPair
		tradeType: TradeType
		card: Card | undefined
	}
}
