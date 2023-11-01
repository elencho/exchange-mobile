import React, { useEffect } from 'react'
import { Linking, Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import launchSumsubSdk from '@app/utils/sumsubMobileSdk'
import Identity from '../../assets/images/User_profile/Identity.svg'
import Language from '../../assets/images/User_profile/Language.svg'
import Notifications from '../../assets/images/User_profile/Notifications.svg'
import Phone from '../../assets/images/User_profile/Phone.svg'
import colors from '../../constants/colors'
import {
	openCompanyInfoModal,
	toggleLanguageModal,
	togglePhoneNumberModal,
} from '../../redux/modals/actions'
import { toggleEmailSubscription } from '../../redux/profile/actions'
import { errorHappenedHere } from '../../utils/appUtils'
import AppSwitcher from '../AppSwitcher'
import AppText from '../AppText'
import PurpleText from '../PurpleText'
import ChooseLanguageModal from './ChooseLanguageModal'
import CompanyInformation from './CompanyInformation'
import DeleteAccount from './DeleteAccount'
import EditCompanyModal from './EditCompanyModal'
import IdentityModal from './IdentityModal'
import PersonalInfoModal from './PersonalInfoModal'
import PersonalInformation from './PersonalInformation'
import PersonalProfileSkeleton from './PersonalProfileSkeleton'
import PhoneNumberModal from './PhoneNumberModal'

export default function Personal({ loading }) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		profile: { userInfo, smsAuth },
		common: { language },
		errors: { generalError },
	} = state

	const verified = userInfo?.userStatus === 'VERIFIED'
	const unverified = userInfo?.userStatus === 'UNVERIFIED'
	const pending = userInfo?.userStatus === 'PENDING'
	const corporate = userInfo?.userType === 'CORPORATE'
	const eligibleToVerify = userInfo?.verificationToolEnabled

	const hideError = () =>
		dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })

	useEffect(() => {
		return () => hideError()
	}, [])

	const edit = () => {
		if (smsAuth) {
			dispatch(
				openCompanyInfoModal(
					'go web phone header',
					'go web phone description',
					'go web phone link',
					'go web phone button'
				)
			)
		} else {
			dispatch(togglePhoneNumberModal(true))
		}
		hideError()
	}

	const verify = () => {
		if (eligibleToVerify) launchSumsubSdk()
		else
			dispatch(
				openCompanyInfoModal(
					'go web personal header',
					'go web personal description',
					'go web personal link',
					'go web personal button'
				)
			)
	}

	const goToSupport = () =>
		Linking.openURL('https://support.cryptal.com/hc/en-us/requests/new')

	const editLanguage = () => {
		hideError()
		dispatch(toggleLanguageModal(true))
	}

	const openModal = () => {
		hideError()
		dispatch({ type: 'TOGGLE_IDENTITY_MODAL' })
	}

	const handleEmailUpdates = (value) => dispatch(toggleEmailSubscription(value))

	const textCond = (r) => {
		const isOn = !!userInfo?.emailUpdates
		switch (r) {
			case 'Identity':
				return (
					<View style={styles.row}>
						<View style={[styles.row, styles.flex]}>
							<AppText medium style={styles.white}>
								Identification
							</AppText>

							{!verified && (
								<Pressable style={styles.circle} onPress={openModal}>
									<AppText medium body style={{ color: '#9EA6D0' }}>
										i
									</AppText>
								</Pressable>
							)}
						</View>

						{unverified && <PurpleText text="Verify" onPress={verify} />}
						{pending && (
							<PurpleText text="Go To Support" onPress={goToSupport} />
						)}
					</View>
				)
			case 'Phone':
				return (
					<View style={styles.row}>
						<AppText medium style={styles.white}>
							My Phone Number
						</AppText>
						<View style={styles.flex}>
							<PurpleText text="Edit" style={styles.purple} onPress={edit} />
						</View>
					</View>
				)
			case 'Notifications':
				return (
					<View style={styles.row}>
						<AppText medium style={[styles.white, { maxWidth: '80%' }]}>
							Receive Notifications
						</AppText>
						<View style={[styles.flex, { alignItems: 'flex-end' }]}>
							<AppSwitcher
								onToggle={(value) => handleEmailUpdates(value)}
								isOn={isOn}
							/>
						</View>
					</View>
				)
			case 'Language':
				return (
					<View style={styles.row}>
						<AppText medium style={styles.white}>
							Choose Language
						</AppText>
						<View style={styles.flex}>
							<PurpleText
								text="Edit"
								style={styles.purple}
								onPress={editLanguage}
							/>
						</View>
					</View>
				)
			default:
				break
		}
	}

	const secondaryTextCond = (r) => {
		const error = generalError && errorHappenedHere('NotificationSwitcher')
		switch (r) {
			case 'Identity':
				return (
					<View style={styles.upload}>
						<View
							style={[
								styles.check,
								{ backgroundColor: verified ? '#25D8D1' : '#FFC65C' },
							]}
						/>
						<AppText subtext style={styles.secondary}>
							{`Verification subtext ${userInfo?.userStatus}`}
						</AppText>
					</View>
				)
			case 'Phone':
				return (
					<AppText subtext style={styles.secondary}>
						{userInfo.phoneNumber}
					</AppText>
				)
			case 'Notifications':
				return (
					<AppText
						subtext
						style={[styles.secondary, error && { color: '#F45E8C' }]}>
						{error
							? 'Sorry.. Something went wrong'
							: 'Receive updates & news from us'}
					</AppText>
				)
			case 'Language':
				return (
					<AppText subtext style={styles.secondary}>
						{language === 'ka' ? 'ქართული' : language === 'en' ? 'English' : ''}
					</AppText>
				)
			default:
				break
		}
	}

	const images = {
		Identity: <Identity />,
		Phone: <Phone />,
		Notifications: <Notifications />,
		Language: <Language />,
	}

	return !loading ? (
		<>
			<View style={styles.block}>
				{['Identity', 'Phone', 'Notifications', 'Language'].map((r, i, a) => (
					<View
						style={[styles.row, i < a.length - 1 && { marginBottom: 30 }]}
						key={r}>
						{images[r]}
						<View style={styles.justify}>
							{textCond(r)}
							{secondaryTextCond(r)}
						</View>
					</View>
				))}
			</View>
			<View style={styles.line} />
			<PersonalInformation />
			{corporate && <CompanyInformation />}
			<View style={styles.line} />
			<DeleteAccount />
			<PersonalInfoModal />
			<PhoneNumberModal />
			<ChooseLanguageModal />
			<EditCompanyModal />
			<IdentityModal />
		</>
	) : (
		<PersonalProfileSkeleton />
	)
}

const styles = StyleSheet.create({
	check: {
		width: 4,
		height: 4,
		marginRight: 8,
		marginTop: 4,
	},
	circle: {
		borderWidth: 1,
		borderColor: '#9EA6D0',
		width: 22,
		height: 22,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -2,
		marginLeft: 10,
	},
	column: {
		height: 60,
		justifyContent: 'space-between',
	},
	rightColumn: {
		alignItems: 'flex-end',
		flex: 1,
		marginLeft: 15,
	},
	block: {
		paddingVertical: 5,
		backgroundColor: colors.PRIMARY_BACKGROUND,
		marginBottom: 10,
	},
	flex: {
		flex: 1,
	},
	justify: {
		flex: 1,
		// height: 37,
		marginLeft: 25,
	},
	row: {
		flexDirection: 'row',
	},
	purple: {
		alignSelf: 'flex-end',
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		marginTop: 4,
	},
	// switch: {
	//   transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
	//   position: 'absolute',
	//   right: -10,
	//   top: 0,
	// },
	white: {
		color: colors.PRIMARY_TEXT,
	},
	upload: {
		flexDirection: 'row',
		alignItems: 'center',
		textAlign: 'center',
	},
	line: {
		marginVertical: 20,
		marginHorizontal: 4,
		height: 1,
		flex: 1,
		backgroundColor: colors.BUTTON_DISABLED,
	},
})
