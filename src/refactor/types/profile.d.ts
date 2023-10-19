interface UserStatusObject {
	verified: boolean
	unverified: boolean
	pending: boolean
	corporate: boolean
	eligibleToVerify: boolean
}

interface UserInfoData {
	fromRegistration: boolean
}

interface UpdatePasswordData {
	currentPassword: string
	newPassword: string
	repeatPassword: string
	hide: () => void
}

interface UpdatePhoneNumberData {
	phoneNumber: string
	phoneCountry: string
	setUserInfoVariable: (value: any) => void
}
interface ToggleSubscriptionData {
	value: boolean
}

interface CredentialsForEmailData {
	OTP: string
}

interface ActivateGoogleData {
	OTP: string
	setGoogleAuthLoading: (value: boolean) => void
}

interface OtpSagaData {
	token: string
}

interface ResendThunkData {
	url: string
	emailVerification: boolean
	smsEmailAuth: boolean
	login2Fa: boolean
	setOtpLoading?: (value: boolean) => void
}
