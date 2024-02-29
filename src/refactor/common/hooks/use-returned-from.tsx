import { navigationRef } from '@app/refactor/setup/nav'
import { Route } from '@app/refactor/setup/nav/nav'
import { useEffect, useRef } from 'react'

type Props = {
	from: Route
	onReturn: () => void
}

export const useReturnedFrom = ({ from, onReturn }: Props) => {
	const lastRoute = useRef<string>()

	useEffect(() => {
		return navigationRef.current?.addListener('state', (e) => {
			const routeNames = e.data.state?.routes.map((r) => r.name)
			if (!routeNames) return

			const curRoute = routeNames[routeNames.length - 1]
			if (lastRoute.current === from) {
				onReturn()
			}
			lastRoute.current = curRoute
		})
	}, [])
}
