import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import GeneralErrorIcon from '@assets/images/User_profile/General_Error.svg'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { formatUiError } from '@components/util'

interface Props {
	errorData: UiErrorData | null
	style?: any
}

function GeneralError({ errorData, style }: Props) {
	const { styles } = useTheme(_styles)

	return (
		<>
			{errorData ? (
				<View style={[styles.container, style]}>
					<GeneralErrorIcon />
					<AppText
						variant="m"
						transParams={errorData.transParams}
						style={styles.red}>
						{formatUiError(errorData)}
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
