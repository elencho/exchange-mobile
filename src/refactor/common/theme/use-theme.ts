import React from 'react'
import { Theme } from 'refactor/common/theme'
import { useContextTheme } from 'refactor/common/theme/index.context'

type Generator<T extends {}> = (theme: Theme) => T

export const useTheme = <T extends {}>(fn: Generator<T>) => {
	const { theme } = useContextTheme()
	return React.useMemo(() => fn(theme), [fn, theme])
}
