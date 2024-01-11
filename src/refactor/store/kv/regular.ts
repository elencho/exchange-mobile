import { MMKV } from 'react-native-mmkv'
import { Language } from '@app/refactor/common/constants'
import {
	deserializeBoolean,
	deserializeNumber,
	serializeBoolean,
	serializeString,
	serializeNumber,
} from '@store/kv/serialization'

interface Schema {
	everOpened: boolean
	language: Language
	webViewVisible: boolean
	lastOpenDateMillis: number
	bioIsAvailableOnUser: boolean
}
type Key = keyof Schema

interface PersistentStore {
	get<T extends Key>(key: T): Schema[T] | undefined
	set<T extends Key>(key: T, value: Schema[T]): void
	del<T extends Key>(key: T): void
}

const mmkv = new MMKV()

const KV: PersistentStore = {
	get(key) {
		const value = mmkv.getString(key)
		return value ? deserializers[key](value) : undefined
	},
	set(key, value) {
		value && mmkv.set(key, serializers[key](value))
	},
	del(key) {
		mmkv.delete(key)
	},
}

const deserializers: {
	[key in Key]: (value: string) => Schema[key]
} = {
	webViewVisible: deserializeBoolean,
	everOpened: deserializeBoolean,
	language: (value: string) => (value === 'ka' ? 'ka' : 'en'),
	lastOpenDateMillis: deserializeNumber,
	bioIsAvailableOnUser: deserializeBoolean,
}

const serializers: { [key in Key]: (value: Schema[key]) => string } = {
	webViewVisible: serializeBoolean,
	everOpened: serializeBoolean,
	language: serializeString,
	lastOpenDateMillis: serializeNumber,
	bioIsAvailableOnUser: serializeBoolean,
}

export default KV
