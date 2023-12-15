export const deserializeBoolean = (value: string) => value === 'true'
export const serializeBoolean = (value: boolean) => (value ? 'true' : 'false')

export const deserializeString = (value: string) => value
export const serializeString = (value: string) => value

export const deserializeNumber = (value: string) => parseInt(value)
export const serializeNumber = (value: number) => JSON.stringify(value)
export const deserializeObject = (value: string) => JSON.parse(value)
export const serializeObject = (value: any) => JSON.stringify(value)
