import React, { memo, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import GeneralErrorIcon from '@assets/images/User_profile/General_Error.svg'
import AppText from '@components/text'
import { setGeneralError } from '@store/redux/common/slice'
import { RootState } from '@app/refactor/redux/rootReducer'
import { Theme, useTheme } from '@theme/index'
import { formatGeneralError } from '@components/util'

function GeneralError({ style = {} }) {
	const dispatch = useDispatch()
	const { styles } = useTheme(_styles)

	const generalError = useSelector(
		(state: RootState) => state.common.generalError
	)

	useEffect(() => {
		return () => {
			if (generalError) {
				dispatch(setGeneralError(undefined))
			}
		}
	}, [])

	return (
		<>
			{generalError ? (
				<View style={[styles.container, style]}>
					<GeneralErrorIcon />
					<AppText
						variant="m"
						transParams={generalError.transParams}
						style={styles.red}>
						{formatGeneralError(generalError)}
					</AppText>
				</View>
			) : null}
		</>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: 'rgba(244, 94, 140, 0.08)',
			paddingVertical: 8,
			paddingHorizontal: 17,
			width: '100%',
			borderRadius: 22,
			flexDirection: 'row',
			alignItems: 'center',
		},
		red: {
			color: theme.color.error,
			flex: 1,
			marginLeft: 13,
			lineHeight: 16,
		},
	})

export default memo(GeneralError)
