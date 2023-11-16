import {
	deserializeString,
	deserializeObject,
	serializeString,
	serializeObject,
} from '@store/kv/serialization'
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store'

interface Schema {
	refreshToken: string
	bioEnabledEmails: string[]
}
type Key = keyof Schema

interface PersistentStore {
	get<T extends Key>(key: T): Promise<Schema[T] | null>
	set<T extends Key>(key: T, value: Schema[T]): void
	del<T extends Key>(key: T): void
}

const SecureKV: PersistentStore = {
	async get(key) {
		const value = await getItemAsync(key)
		return value ? deserializers[key](value) : null
	},
	set(key, value) {
		setItemAsync(key, serializers[key](value))
	},
	del(key) {
		deleteItemAsync(key)
	},
}

const deserializers: {
	[key in Key]: (value: string) => Schema[key]
} = {
	refreshToken: deserializeString,
	bioEnabledEmails: deserializeObject,
}

const serializers: { [key in Key]: (value: Schema[key]) => string } = {
	refreshToken: serializeString,
	bioEnabledEmails: serializeObject,
}

export default SecureKV
