import KVStore from '@app/refactor/store/kv'

const x = KVStore.get('accessToken')
const y = KVStore.get('webViewVisible')

const l = KVStore.get('language')
KVStore.set('language', 'en')
KVStore.del('language')
