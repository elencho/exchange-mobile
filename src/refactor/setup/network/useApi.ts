import { useState } from 'react'

const useApi = <Arg, Res extends { data: any }>(
	apiFunc: (arg: Arg) => Promise<Res>
) => {
	const [data, setData] = useState<Res | null>(null)
	const [error, setError] = useState('') // TODO: Type
	const [loading, setLoading] = useState(false)

	const request = async (arg: Arg) => {
		setLoading(true)
		try {
			const result = await apiFunc(arg)
			setData(result.data)
		} catch (err) {
			// TODO
		} finally {
			setLoading(false)
		}
	}

	return {
		data,
		error,
		loading,
		request,
	}
}

export { useApi }
