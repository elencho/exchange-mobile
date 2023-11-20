import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import { ChooseLanguageModal } from '@components/modal/choose-language'
import AppText from '@components/text'
import IdentityIcon from '@app/assets/images/User_profile/Identity.svg'
import LanguageIcon from '@app/assets/images/User_profile/Language.svg'
import NotificationsIcon from '@app/assets/images/User_profile/Notifications.svg'
import PhoneIcon from '@app/assets/images/User_profile/Phone.svg'
import { PersonalFeatures } from '@app/refactor/types/enums'
import { errorHappenedHere } from '@app/utils/appUtils'
import { CompanyInformation } from '../modals/user-profile/company-information'
import DeleteAccount from '../modals/user-profile/delete-account'
import EditCompanyModal from '../modals/user-profile/edit-company'
import IdentityModal from '../modals/user-profile/identity-modal'
import PersonalInfoModal from '../modals/user-profile/personal-info-modal'
import PersonalInformation from '../modals/user-profile/personal-information'
import PhoneNumberModal from '../modals/user-profile/phone-number-modal'
import PersonalProfileSkeleton from '../modals/user-profile/skeletons/PersonalProfileSkeleton'
// import launchSumsubSdk from '@app/utils/sumsubMobileSdk'
import { Identity, IdentitySecond } from './identity'
import { Language } from './language'
import { Notifications } from './notifications'
import { Phone } from './phone'
import { usePersonal } from './use-personal'

interface PersonalProps {
	loading: boolean
}

export const Personal = ({ loading }: PersonalProps) => {
	const {
		userStatus,
		hideError,
		edit,
		verify,
		goToSupport,
		editLanguage,
		openModal,
		handleEmailUpdates,
		userInfo,
		generalError,
		language,
		corporate,
		togglePersonalInfoModal,
		personalInfoModalVisible,
		languageModalVisible,
		setLanguageModalVisible,
		phoneNumberModalVisible,
		togglePhoneNumberModal,
	} = usePersonal()

	const { styles } = useTheme(_styles)

	const textCond = useCallback(
		(r: string) => {
			const isOn = !!userInfo?.emailUpdates
			switch (r) {
				case PersonalFeatures.IDENTITY:
					return (
						<Identity
							styles={styles}
							userStatus={userStatus!}
							verify={verify}
							goToSupport={goToSupport}
							openModal={openModal}
						/>
					)
				case PersonalFeatures.PHONE:
					return <Phone styles={styles} edit={edit} />
				case PersonalFeatures.NOTIFICATIONS:
					return (
						<Notifications
							styles={styles}
							isOn={isOn}
							onToggle={(value) => handleEmailUpdates(value)}
						/>
					)
				case PersonalFeatures.LANGUAGE:
					return <Language styles={styles} editLanguage={editLanguage} />
				default:
					break
			}
		},
		[userInfo]
	)

	const secondaryTextCond = (r: string) => {
		const error = generalError && errorHappenedHere('NotificationSwitcher')
		switch (r) {
			case PersonalFeatures.IDENTITY:
				return (
					<IdentitySecond
						userStatus={userStatus}
						userInfoStatus={userInfo?.userStatus}
						styles={styles}
					/>
				)
			case PersonalFeatures.PHONE:
				return (
					<AppText variant="s" style={styles.secondary}>
						{userInfo?.phoneNumber}
					</AppText>
				)

			case PersonalFeatures.NOTIFICATIONS:
				return (
					<AppText
						variant="s"
						style={[styles.secondary, error ? { color: '#F45E8C' } : {}]}>
						{error
							? 'Sorry.. Something went wrong'
							: 'Receive updates & news from us'}
					</AppText>
				)
			case PersonalFeatures.LANGUAGE:
				return (
					<AppText variant="s" style={styles.secondary}>
						{language === 'ka' ? 'ქართული' : language === 'en' ? 'English' : ''}
					</AppText>
				)
			default:
				break
		}
	}

	const images = {
		Identity: <IdentityIcon />,
		Phone: <PhoneIcon />,
		Notifications: <NotificationsIcon />,
		Language: <LanguageIcon />,
	}

	if (loading) return <PersonalProfileSkeleton />

	return (
		<>
			<View style={styles.block}>
				{[
					PersonalFeatures.IDENTITY,
					PersonalFeatures.PHONE,
					PersonalFeatures.NOTIFICATIONS,
					PersonalFeatures.LANGUAGE,
				].map((item, i, a) => (
					<View
						style={[styles.row, i < a.length - 1 && { marginBottom: 30 }]}
						key={item}>
						{images[item]}
						<View style={styles.justify}>
							{textCond(item)}
							{secondaryTextCond(item)}
						</View>
					</View>
				))}
			</View>
			<View style={styles.line} />
			<PersonalInformation togglePersonalInfoModal={togglePersonalInfoModal} />
			{corporate && <CompanyInformation />}
			<View style={styles.line} />
			<DeleteAccount />
			<PersonalInfoModal
				togglePersonalInfoModal={togglePersonalInfoModal}
				personalInfoModalVisible={personalInfoModalVisible}
			/>
			<PhoneNumberModal
				phoneNumberModalVisible={phoneNumberModalVisible}
				togglePhoneNumberModal={togglePhoneNumberModal}
			/>
			<ChooseLanguageModal
				languageModalVisible={languageModalVisible}
				setLanguageModalVisible={setLanguageModalVisible}
			/>
			<EditCompanyModal />
			<IdentityModal />
		</>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
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
			backgroundColor: theme.color.backgroundPrimary,
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
			color: theme.color.textSecondary,
			marginTop: 4,
		},
		// switch: {
		//   transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
		//   position: 'absolute',
		//   right: -10,
		//   top: 0,
		// },
		white: {
			color: theme.color.textPrimary,
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
			backgroundColor: theme.color.buttonDisabled,
		},
	})
