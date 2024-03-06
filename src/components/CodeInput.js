import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useDispatch } from 'react-redux'
import colors from '../constants/colors'
import { errorHappenedHere } from '../utils/appUtils'
import AppText from './AppText'
import GeneralError from './GeneralError'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'

export default function CodeInput({
	cellCount = 6,
	value,
	setValue,
	autoFocus,
}) {
	const dispatch = useDispatch()
	const ref = useBlurOnFulfill({ value, cellCount })
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	})

	const handleValue = (value) => {
		setValue(value)
		dispatch(saveGeneralError(null))
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
				ref={ref}
				{...props}
				value={value}
				onChangeText={handleValue}
				caretHidden={false}
				cellCount={cellCount}
				keyboardType="number-pad"
				textContentType="oneTimeCode"
				autoFocus={autoFocus}
				renderCell={({ index, symbol, isFocused }) => (
					<AppText
						key={index}
						style={[styles.cell, isFocused && styles.focusCell]}
						onLayout={getCellOnLayoutHandler(index)}
						header
						isForCodeInput>
						{symbol || (isFocused ? <Cursor /> : null)}
					</AppText>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	cell: {
		width: 40,
		height: 45,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: colors.SECONDARY_TEXT,
		color: colors.PRIMARY_TEXT,
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
		borderColor: colors.SECONDARY_PURPLE,
	},
})
