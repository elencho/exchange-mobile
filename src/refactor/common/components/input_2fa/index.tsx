import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import {
	useBlurOnFulfill,
	useClearByFocusCell,
	CodeField,
	Cursor,
} from 'react-native-confirmation-code-field'
import { MaterialIndicator } from 'react-native-indicators'
import { useDispatch, useSelector } from 'react-redux'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'
import {
	otpForLoginThunk,
	verifyRegistrationThunk,
} from '@store/redux/auth/thunks'
import GeneralError from '@components/general_error'
import { RootState } from '@app/refactor/redux/rootReducer'
import { Route, Screens } from '@app/refactor/setup/nav/nav'
import { errorHappenedHere } from '@app/utils/appUtils'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'

interface Props {
	value: string
	setValue: (text: string) => void
	cellCount: 4 | 6
	navigation: NativeStackNavigationProp<Screens>
	from?: Route
	indicatorStyle?: StyleProp<ViewStyle>
	onFill?: () => void
}

const TwoFaInput = ({
	value,
	setValue,
	cellCount,
	navigation,
	from,
	indicatorStyle,
	onFill = () => {},
}: Props) => {
	const dispatch = useDispatch()
	// TODO: add loading from param
	const authLoading = useSelector((state: RootState) => state.auth.authLoading)
	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)

	// TODO: add onSuccess instead of if elses
	useEffect(() => {
		if (value.length === cellCount) {
			if (from === 'Login2Fa') {
				handleGeneralError(
					() =>
						dispatch(
							otpForLoginThunk({ otp: value, from: 'Login2Fa', navigation })
						),
					setGeneralErrorData
				)
			} else if (from === 'Registration') {
				dispatch(verifyRegistrationThunk({ otp: value, navigation }))
			}
			onFill()
		}
	}, [value])

	return authLoading ? (
		<MaterialIndicator
			color="#6582FD"
			animationDuration={3000}
			style={[{ position: 'absolute', alignSelf: 'center' }, indicatorStyle]}
		/>
	) : (
		<CodeInput
			cellCount={cellCount}
			value={value}
			setValue={setValue}
			generalErrorData={generalErrorData}
		/>
	)
}

type CodeInputProps = Pick<
	Props,
	'value' | 'setValue' | 'cellCount' | 'generalErrorData'
>

const CodeInput = ({
	value,
	setValue,
	cellCount,
	generalErrorData,
}: CodeInputProps) => {
	const { styles } = useTheme(_styles)
	const dispatch = useDispatch()

	const ref = useBlurOnFulfill({ value, cellCount })
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	})

	const handleValue = (value: string) => {
		setValue(value)
		// TODO: Remove after wallets refactor
		dispatch(saveGeneralError(null))
	}

	return (
		<View>
			<View>
				<GeneralError style={styles.error} errorData={generalErrorData} />
			</View>

			<CodeField
				{...props}
				ref={ref}
				value={value}
				onChangeText={handleValue}
				caretHidden={false}
				cellCount={cellCount}
				keyboardType="number-pad"
				textContentType="oneTimeCode"
				renderCell={({ index, symbol, isFocused }) => (
					<AppText
						key={index}
						variant="headline"
						style={[styles.cell, isFocused && styles.focusCell]}
						onLayout={getCellOnLayoutHandler(index)}>
						{symbol || (isFocused ? <Cursor /> : null)}
					</AppText>
				)}
			/>
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		cell: {
			width: 40,
			height: 45,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: theme.color.textSecondary,
			color: theme.color.textPrimary,
			marginHorizontal: 5,
			justifyContent: 'center',
			textAlign: 'center',
			paddingVertical: 10,
		},
		error: {
			marginBottom: 25,
			marginTop: -10,
		},
		focusCell: {
			borderColor: theme.color.brandSecondary,
		},
	})

export default TwoFaInput
