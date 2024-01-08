import { BIOMETRIC_DIFF_MILLIS } from '@app/refactor/common/constants'
import { TokenParams } from '@app/refactor/types/auth/splash'
import KV from '@store/kv/regular'
import SecureKV from '@store/kv/secure'
import { isEnrolledAsync } from 'expo-local-authentication'
import jwt_decode from 'jwt-decode'

export const canDoBiometric = async (
	accessToken: string | undefined
): Promise<boolean> => {
	const bioEnabledEmails = await SecureKV.get('bioEnabledEmails')
	if (!bioEnabledEmails || !accessToken) return false

	const email = jwt_decode<TokenParams>(accessToken)?.email
	const hasFaceOrTouchIdSaved = await isEnrolledAsync()

	return bioEnabledEmails.includes(email) && hasFaceOrTouchIdSaved
}

export const biometricDiffElapsed = (): boolean => {
	const lastTimeOpenMillis = KV.get('lastOpenDateMillis')

	return lastTimeOpenMillis
		? Date.now() - lastTimeOpenMillis >= BIOMETRIC_DIFF_MILLIS
		: false
}
