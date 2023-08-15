import {
	isEnrolledAsync,
	supportedAuthenticationTypesAsync,
} from 'expo-local-authentication'

export const getBiometricTypes = async () => {
	const biometricType = await supportedAuthenticationTypesAsync()
	return biometricType
}

export const checkIsCompatable = async () => {
	const enrolled = await isEnrolledAsync()
	return enrolled
}
