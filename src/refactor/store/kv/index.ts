import { MMKV } from 'react-native-mmkv'
import { Language } from '@app/refactor/common/constants'

interface Schema {
	// Auth
	webViewVisible: boolean
	isLoggedIn: boolean
	accessToken: string
	refreshToken: string
	bioEnabledEmails: string[]
	language: Language
}
type Key = keyof Schema

interface PersistentStore {
	get<T extends Key>(key: T): Schema[T] | undefined
	set<T extends Key>(key: T, value: Schema[T]): void
	del<T extends Key>(key: T): void
}

const mmkv = new MMKV()
const secureMmkv = new MMKV() // TODO: Encrypt

const secureKeys: Key[] = ['accessToken', 'bioEnabledEmails']
const cache = (key: Key) => (secureKeys.includes(key) ? secureMmkv : mmkv)

const KVStore: PersistentStore = {
	get(key) {
		const value = cache(key).getString(key)
		return value ? deserializers[key](value) : undefined
	},
	set(key, value) {
		if (value) {
			cache(key).set(key, serializers[key](value))
		}
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

const deserializeObject = (value: string) => JSON.parse(value)
const serializeObject = (value: any) => JSON.stringify(value)

const deserializers: {
	[key in Key]: (value: string) => Schema[key]
} = {
	webViewVisible: deserializeBoolean,
	isLoggedIn: deserializeBoolean,
	accessToken: deserializeString,
	refreshToken: deserializeString,
	bioEnabledEmails: deserializeObject,
	language: (value: string) => (value === 'ka' ? 'ka' : 'en'),
}

const serializers: { [key in Key]: (value: Schema[key]) => string } = {
	webViewVisible: serializeBoolean,
	isLoggedIn: serializeBoolean,
	accessToken: serializeString,
	refreshToken: serializeString,
	bioEnabledEmails: serializeObject,
	language: serializeString,
}
