import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Portfolio from '../../assets/images/Portfolio.svg'
import User from '../../assets/images/User.svg'
import { COLORS_DARK } from 'refactor/setup/theme/colors'
import { Button } from 'refactor/common/components/button'
import { switchPersonalCompany } from 'redux/profile/actions'

type UserType = 'Personal' | 'Company'

export default function PersonalCompanySwitcher() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		profile: { Personal_Company }, // TODO
	} = state

	const handleSwitch = (type: UserType) => {
		dispatch(switchPersonalCompany(type))
	}

	const backgroundColor = (type: UserType) => {
		if (type === 'Personal') {
			return COLORS_DARK.brandPrimary
		} else {
			return 'rgba(101, 130, 253, 0.1)'
		}
	}

	return (
		<View style={styles.switchers}>
			<Button
				variant="primary"
				text="Personal"
				onPress={() => handleSwitch('Personal')}
				backgroundColor={backgroundColor('Personal')}
				leftComponent={<User />}
				style={styles.switcher}
			/>
			<Button
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

const styles = StyleSheet.create({
	switcher: {
		borderRadius: 21,
		width: '48%',
	},
	switchers: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
})
