import { t } from 'i18next'
import React from 'react'
import { StyleSheet, View, Pressable, Linking } from 'react-native'
import CheckEmpty from '@assets/images/Check_Empty.svg'
import CheckFull from '@assets/images/Check_Full.svg'
import CheckRed from '@assets/images/Check_Red.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppText from '@components/text'

interface Props {
	checked: boolean
	toggleChecked: () => void
	error: boolean
}

const TermsCheck = ({ checked, toggleChecked, error }: Props) => {
	const { styles, theme } = useTheme(_styles)

	const goToTerms = () =>
		Linking.openURL('https://ge.cryptal.com/en/terms-of-use')

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Pressable style={styles.image} onPress={toggleChecked}>
					{error ? <CheckRed /> : checked ? <CheckFull /> : <CheckEmpty />}
				</Pressable>
				<AppText
					style={[
						styles.text,
						{ color: error ? theme.color.error : '#c0c5e0' },
					]}>
					{t("I'm over 18 years old and agree to")}
					{'\n'}
					<AppButton
						variant="text"
						text="Terms & Conditions"
						onPress={goToTerms}
					/>
				</AppText>
			</View>
		</View>
	)
}

const _styles = (_: Theme) =>
	StyleSheet.create({
		container: {
			marginTop: 25,
			marginBottom: 55,
			justifyContent: 'space-between',
		},
		image: {
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: 18,
		},
		row: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		text: {
			lineHeight: 20,
			flex: 1,
			color: '#B7BFDB',
		},
	})

export default TermsCheck
