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
type File = {
	documentType: string
	fileName: string
	id: string
}

type UserInfoType = {
	address: string
	citizenship: string
	city: string
	company: null
	companyCode: null
	companyCountry: null
	country: string
	countryCode: string
	email: string
	emailUpdates: false
	files: File[]
	firstName: string
	guid: string
	id: number
	idnumber: string
	inviteCode: string
	inviteLink: string
	lastName: string
	notificationsEnabled: boolean
	phoneCountry: string
	phoneNumber: string
	postalCode: string | null
	referralCode: string
	userStatus: string
	userType: string
	verificationToolEnabled: boolean
	verificationToolStatus: string
	walletProEnabled: boolean
	directors?: Directors[]
}

type Directors = {
	id: number
	firstName: string
	lastName: string
}
