import React, { forwardRef, useEffect } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import {
	useClearByFocusCell,
	CodeField,
	Cursor,
} from 'react-native-confirmation-code-field'
import { MaterialIndicator } from 'react-native-indicators'
import { useDispatch, useSelector } from 'react-redux'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'
import GeneralError from '@components/general_error'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'
import { useSmsOtpVerifier } from '../../util'
import { CodeFieldOverridableComponent } from 'react-native-confirmation-code-field/esm/CodeField'
interface Props {
	value: string
	setValue: (text: string) => void
	cellCount: 4 | 6
	indicatorStyle?: StyleProp<ViewStyle>
	generalErrorData?: UiErrorData | null
	onFill: () => void
	loading?: boolean
	autoFocus?: boolean
}

const TwoFaInput = forwardRef<
	CodeFieldOverridableComponent,
	Props & { ref?: React.Ref<CodeFieldOverridableComponent> }
>(
	(
		{
			value,
			setValue,
			cellCount,
			indicatorStyle,
			onFill,
			generalErrorData,
			loading,
			autoFocus = false,
		},
		ref
	) => {
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
				ref={ref}
				cellCount={cellCount}
				value={value}
				setValue={setValue}
				generalErrorData={generalErrorData}
				autoFocus={autoFocus}
			/>
		)
	}
)

type CodeInputProps = Pick<
	Props,
	'value' | 'setValue' | 'cellCount' | 'autoFocus'
> & {
	generalErrorData?: UiErrorData | null
}

const CodeInput = forwardRef<CodeFieldOverridableComponent, CodeInputProps>(
	({ value, setValue, cellCount, autoFocus, generalErrorData }, ref) => {
		const { styles } = useTheme(_styles)
		const dispatch = useDispatch()

		const [props, getCellOnLayoutHandler] = useClearByFocusCell({
			value,
			setValue,
		})

		const handleValue = (value: string) => {
			setValue(value)
			// TODO: Remove after wallets refactor
			dispatch(saveGeneralError(null))
		}

		useSmsOtpVerifier(handleValue)

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
					autoFocus={autoFocus}
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
)

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
