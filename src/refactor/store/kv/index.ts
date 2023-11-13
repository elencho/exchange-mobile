import { MMKV } from 'react-native-mmkv'
import { Language } from '@app/refactor/common/constants'

interface Schema {
	// Common
	language: Language
	webViewVisible: boolean
	// Auth
	refreshToken: string
	// Biometric
	bioEnabledEmails: string[]
	lastOpenDateMillis: number
}
type Key = keyof Schema

interface PersistentStore {
	get<T extends Key>(key: T): Schema[T] | undefined
	set<T extends Key>(key: T, value: Schema[T]): void
	del<T extends Key>(key: T): void
}

const mmkv = new MMKV()
const secureMmkv = new MMKV() // TODO: Encrypt

const secureKeys: Key[] = ['refreshToken', 'bioEnabledEmails']
const cache = (key: Key) => (secureKeys.includes(key) ? secureMmkv : mmkv)

const KVStore: PersistentStore = {
	get(key) {
		const value = cache(key).getString(key)
		return value ? deserializers[key](value) : undefined
	},
	set(key, value) {
		value && cache(key).set(key, serializers[key](value))
	},
	del(key) {
		cache(key).delete(key)
	},
}

export default KVStore

/**
 *
 *  Custom serialization
 *
 */

const deserializeBoolean = (value: string) => value === 'true'
const serializeBoolean = (value: boolean) => (value ? 'true' : 'false')

const deserializeString = (value: string) => value
const serializeString = (value: string) => value

const deserializeNumber = (value: string) => parseInt(value)
const serializeNumber = (value: number) => JSON.stringify(value)

const deserializeObject = (value: string) => JSON.parse(value)
const serializeObject = (value: any) => JSON.stringify(value)

const deserializers: {
	[key in Key]: (value: string) => Schema[key]
} = {
	webViewVisible: deserializeBoolean,
	refreshToken: deserializeString,
	bioEnabledEmails: deserializeObject,
	language: (value: string) => (value === 'ka' ? 'ka' : 'en'),
	lastOpenDateMillis: deserializeNumber,
}

const serializers: { [key in Key]: (value: Schema[key]) => string } = {
	webViewVisible: serializeBoolean,
	refreshToken: serializeString,
	bioEnabledEmails: serializeObject,
	language: serializeString,
	lastOpenDateMillis: serializeNumber,
}
