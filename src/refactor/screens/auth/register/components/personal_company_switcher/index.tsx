import React from 'react'
import { StyleSheet, View } from 'react-native'
import Portfolio from '@assets/images/Portfolio.svg'
import User from '@assets/images/User.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'

interface Props {
	chosenType: UserType
	onUserTypeChanged: (userType: UserType) => void
}

const PersonalCompanySwitcher = ({ chosenType, onUserTypeChanged }: Props) => {
	const { theme, styles } = useTheme(_styles)

	const chooseBackgroundColor = (type: UserType) => {
		if (type === chosenType) return theme.color.brandPrimary
		return 'rgba(101, 130, 253, 0.1)'
	}

	return (
		<View style={styles.switchers}>
			<AppButton
				variant="primary"
				text="Personal"
				onPress={() => onUserTypeChanged('Personal')}
				backgroundColor={chooseBackgroundColor('Personal')}
				leftComponent={<User />}
				style={styles.switcher}
			/>
			<AppButton
				variant="primary"
				text="Company"
				onPress={() => onUserTypeChanged('Company')}
				backgroundColor={chooseBackgroundColor('Company')}
				leftComponent={<Portfolio />}
				style={styles.switcher}
			/>
		</View>
	)
}

const _styles = (_: Theme) =>
	StyleSheet.create({
		switcher: {
			borderRadius: 21,
			width: '48%',
		},
		switchers: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
	})

export default PersonalCompanySwitcher
