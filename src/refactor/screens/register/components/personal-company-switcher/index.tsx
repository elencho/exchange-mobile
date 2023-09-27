import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import { switchPersonalCompany } from '@app/redux/profile/actions'
import Portfolio from '../../assets/images/Portfolio.svg'
import User from '../../assets/images/User.svg'

type UserType = 'Personal' | 'Company'

export default function PersonalCompanySwitcher() {
	const { theme, styles } = useTheme(_styles)
	const dispatch = useDispatch()

	const state = useSelector((state) => state)
	const {
		profile: { Personal_Company },
	}: any = state

	const handleSwitch = (type: UserType) => {
		dispatch(switchPersonalCompany(type))
	}

	const backgroundColor = (type: UserType) => {
		if (type === 'Personal') {
			return theme.color.brandPrimary
		} else {
			return 'rgba(101, 130, 253, 0.1)'
		}
	}

	return (
		<View style={styles.switchers}>
			<AppButton
				variant="primary"
				text="Personal"
				onPress={() => handleSwitch('Personal')}
				backgroundColor={backgroundColor('Personal')}
				leftComponent={<User />}
				style={styles.switcher}
			/>
			<AppButton
				variant="primary"
				text="Company"
				onPress={() => handleSwitch('Company')}
				backgroundColor={backgroundColor('Company')}
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
