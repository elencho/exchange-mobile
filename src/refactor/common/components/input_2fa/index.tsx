import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import {
	Keyboard,
	Platform,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'
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
import GeneralError from '@components/general_error'
import { RootState } from '@app/refactor/redux/rootReducer'
import { Screens } from '@app/refactor/setup/nav/nav'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'
import { startOtpListener, removeListener } from 'react-native-otp-verify'
interface Props {
	value: string
	setValue: (text: string) => void
	cellCount: 4 | 6
	indicatorStyle?: StyleProp<ViewStyle>
	generalErrorData?: UiErrorData | null
	onFill: () => void
	loading?: boolean
}

const TwoFaInput = ({
	value,
	setValue,
	cellCount,
	indicatorStyle,
	onFill,
	generalErrorData,
	loading,
}: Props) => {
	useEffect(() => {
		if (value.length === cellCount) {
			setTimeout(() => {
				onFill()
			}, 500)
		}
	}, [value])

	return loading ? (
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

type CodeInputProps = Pick<Props, 'value' | 'setValue' | 'cellCount'> & {
	generalErrorData?: UiErrorData | null
}

const CodeInput = ({
	value,
	setValue,
	cellCount,
	generalErrorData,
}: CodeInputProps) => {
	const { styles } = useTheme(_styles)
	const dispatch = useDispatch()
	const TAN_CODE_REGULAR_EXP = /^[0-9]{0,9}$/

	const ref = useBlurOnFulfill({ value, cellCount })
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	})
	const otpHandler = (message) => {
		console.log(message, 'message')
		const messageLower = message.toLowerCase()
		const keyWord = 'code:'
		var re = new RegExp(keyWord + '\\s*(\\d+)')
		var m = messageLower.match(re)
		if (TAN_CODE_REGULAR_EXP.test(m[1])) {
			setValue(m[1])
		}

		removeListener()
		Keyboard.dismiss()
	}

	useEffect(() => {
		if (Platform.OS === 'android') {
			startOtpListener((message) => {
				console.log('first', message)
				// extract the otp using regex e.g. the below regex extracts 4 digit otp from message
				const otp = /(\d{4})/g.exec(message)[1]
				setValue(otp)
			})

			return () => removeListener()
		}
	}, [setValue])

	const handleValue = (value: string) => {
		setValue(value)
		// TODO: Remove after wallets refactor
		dispatch(saveGeneralError(null))
	}

	return (
		<View>
			<View>
				{generalErrorData && (
					<GeneralError style={styles.error} errorData={generalErrorData} />
				)}
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
				autoComplete="sms-otp"
				autoFocus={true}
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
