import { t } from 'i18next'
import React from 'react'
import { StyleSheet, View, Pressable, Image, Linking } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CheckEmpty from '../../assets/images/Check_Empty.svg'
import CheckFull from '../../assets/images/Check_Full.svg'
import CheckRed from '../../assets/images/Check_Red.svg'
import { setRegistrationInputs } from '../../redux/profile/actions'
import AppText from '../AppText'
import PurpleText from '../PurpleText'

export default function CheckMarks({ error, validations }) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		profile: { registrationInputs },
	} = state

	const i = registrationInputs
	const v = validations
	const set = (obj) => dispatch(setRegistrationInputs({ ...i, ...obj }))

	const image = (type) => {
		if (type === 'acceptTerms') {
			if (v.terms) {
				return <CheckFull />
			} else if (error) {
				return <CheckRed />
			}
		} else if (type === 'updates' && i.getEmailUpdates === 'on') {
			return <CheckFull />
		}
		return <CheckEmpty />
	}

	const toggle = (type) => {
		if (type === 'acceptTerms')
			set({ acceptTerms: i.acceptTerms !== 'on' ? 'on' : 'off' })
		if (type === 'updates')
			set({ getEmailUpdates: i.getEmailUpdates !== 'on' ? 'on' : 'off' })
	}

	const textColor = { color: error && !v.terms ? '#F45E8C' : '#c0c5e0' }

	const text = (type) => {
		const goToTerms = () =>
			Linking.openURL('https://ge.cryptal.com/en/terms-of-use')

		if (type === 'acceptTerms')
			return (
				<AppText style={[styles.text, textColor]}>
					{t("I'm over 18 years old and agree to")}
					{'\n'}
					<PurpleText text="Terms & Conditions" onPress={goToTerms} />
				</AppText>
			)
		if (type === 'updates')
			return (
				<AppText style={styles.text}>Receive e-mail updates & news</AppText>
			)
	}

	return (
		<View style={styles.container}>
			<View style={[styles.row, { marginTop: 20 }]}>
				<Pressable style={styles.image} onPress={() => toggle('acceptTerms')}>
					{/* {image('acceptTerms')} */}
				</Pressable>
				{/* {text('acceptTerms')} */}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 25,
		marginBottom: 50,
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
