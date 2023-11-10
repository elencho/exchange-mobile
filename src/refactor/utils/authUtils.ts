import { BIOMETRIC_DIFF_MILLIS } from '@app/refactor/common/constants'
import { TokenParams } from '@app/refactor/types/auth/splash'
import KVStore from '@store/kv'
import jwt_decode from 'jwt-decode'

export const canDoBiometric = (accessToken: string | undefined): boolean => {
	const bioEnabledEmails = KVStore.get('bioEnabledEmails')
	if (!bioEnabledEmails || !accessToken) return false

	const email = jwt_decode<TokenParams>(accessToken)?.email
	return bioEnabledEmails.includes(email)
}

export const biometricDiffElapsed = (): boolean => {
	const lastTimeOpenMillis = KVStore.get('lastOpenDateMillis')

	// TODO: Remove
	console.log((Date.now() - (lastTimeOpenMillis || 0)) / 1000)

	return lastTimeOpenMillis
		? Date.now() - lastTimeOpenMillis >= BIOMETRIC_DIFF_MILLIS
		: true
}
