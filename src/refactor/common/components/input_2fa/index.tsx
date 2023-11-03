import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
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
import GeneralError from '@app/components/GeneralError'
import { RootState } from '@app/refactor/redux/rootReducer'
import { Route, Screens } from '@app/refactor/setup/nav/nav'
import { errorHappenedHere } from '@app/utils/appUtils'

interface Props {
	value: string
	setValue: (text: string) => void
	cellCount: 4 | 6
	navigation: NativeStackNavigationProp<Screens>
	from?: Route
	indicatorStyle?: StyleProp<ViewStyle>
}

const TwoFaInput = ({
	value,
	setValue,
	cellCount,
	navigation,
	from,
	indicatorStyle,
}: Props) => {
	const dispatch = useDispatch()
	const authLoading = useSelector((state: RootState) => state.auth.authLoading)

	useEffect(() => {
		if (value.length === cellCount) {
			if (from === 'Login2Fa') {
				dispatch(otpForLoginThunk({ otp: value, from: 'Login2Fa', navigation }))
			} else if (from === 'Registration') {
				dispatch(verifyRegistrationThunk({ otp: value, navigation }))
			}
		}
	}, [value])

	return authLoading ? (
		<MaterialIndicator
			color="#6582FD"
			animationDuration={3000}
			style={[{ position: 'absolute', alignSelf: 'center' }, indicatorStyle]}
		/>
	) : (
		<CodeInput cellCount={cellCount} value={value} setValue={setValue} />
	)
}

type CodeInputProps = Pick<Props, 'value' | 'setValue' | 'cellCount'>

const CodeInput = ({ value, setValue, cellCount }: CodeInputProps) => {
	const { styles } = useTheme(_styles)
	const dispatch = useDispatch()

	const ref = useBlurOnFulfill({ value, cellCount })
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	})

	const handleValue = (value: string) => {
		setValue(value)
		// TODO
		dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })
	}

	return (
		<View>
			<View>
				<GeneralError
					style={styles.error}
					show={errorHappenedHere('CodeInput')}
				/>
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
