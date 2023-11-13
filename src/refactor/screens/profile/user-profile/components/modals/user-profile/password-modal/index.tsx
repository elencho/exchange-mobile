import React from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import ShowIcon from '@assets/images/User_profile/Show.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppInput from '@components/input'
import AppModal from '@components/modal'
import AppText from '@components/text'
import HideIcon from '@app/assets/images/User_profile/Hide.svg'
import GeneralError from '@app/components/GeneralError'
import WithKeyboard from '@app/components/WithKeyboard'
import { errorHappenedHere } from '@app/utils/appUtils'
import { usePasswordModal } from './use-password-modal'

export default function PasswordModal() {
	const array = [
		'8 or more characters',
		'At least one number',
		'Upper & lowercase letters',
	]
	const { styles, theme } = useTheme(_styles)
	const {
		toggle,
		handleSave,
		hide,
		passwordState,
		passwordModalVisible,
		error,
		newPassCond,
		handleFieldChange,
		userProfileLoading,
	} = usePasswordModal()

	const background = (i: number) => {
		switch (i) {
			case 0:
				return {
					backgroundColor: passwordState.eightChars ? '#25D8D1' : '#F83974',
				}
			case 1:
				return {
					backgroundColor: passwordState.hasNumber ? '#25D8D1' : '#F83974',
				}
			case 2:
				return {
					backgroundColor: passwordState.hasUpperAndLower
						? '#25D8D1'
						: '#F83974',
				}
			default:
				break
		}
	}

	const color = (i: number) => {
		switch (i) {
			case 0:
				return {
					color: passwordState.eightChars
						? theme.color.textSecondary
						: '#969CBF',
				}
			case 1:
				return {
					color: passwordState.hasNumber
						? theme.color.textSecondary
						: '#969CBF',
				}
			case 2:
				return {
					color: passwordState.hasUpperAndLower
						? theme.color.textSecondary
						: '#969CBF',
				}
			default:
				break
		}
	}

	const hideIcon = (
		<Pressable onPress={toggle}>
			{passwordState.secure ? <ShowIcon /> : <HideIcon />}
		</Pressable>
	)

	const children = () => {
		return (
			<WithKeyboard
				padding
				flexGrow
				modal
				scrollUp={false}
				refreshControl={null}>
				<TouchableOpacity activeOpacity={0.99} style={{ flex: 1 }}>
					<GeneralError
						style={styles.error}
						show={errorHappenedHere('PasswordModal')}
					/>

					<AppInput
						style={[styles.inputContainer, { marginTop: 18 }]}
						label="Current Password"
						autoCapitalize={'none'}
						secureTextEntry={passwordState.secure}
						onChangeText={(text: string) =>
							handleFieldChange('currentPassword', text)
						}
						value={passwordState.currentPassword}
						error={error && !passwordState.currentPassword}
					/>
					<AppInput
						style={styles.inputContainer}
						label="New Password"
						autoCapitalize={'none'}
						secureTextEntry={passwordState.secure}
						onChangeText={(text: string) =>
							handleFieldChange('newPassword', text)
						}
						value={passwordState.newPassword}
						rightComponent={hideIcon}
						error={error && !newPassCond}
					/>
					<AppInput
						style={styles.inputContainer}
						label="Repeat Password"
						autoCapitalize={'none'}
						secureTextEntry={passwordState.secure}
						onChangeText={(text: string) =>
							handleFieldChange('repeatPassword', text)
						}
						value={passwordState.repeatPassword}
						error={
							error &&
							passwordState.newPassword !== passwordState.repeatPassword
						}
					/>

					{array.map((v, i) => (
						<View key={v} style={styles.validation}>
							<View style={[styles.dot, background(i)]} />
							<AppText variant="s" style={color(i)}>
								{v}
							</AppText>
						</View>
					))}
				</TouchableOpacity>

				<AppButton
					variant="primary"
					onPress={handleSave}
					style={styles.button}
					loading={userProfileLoading}
					text="Save"
				/>
			</WithKeyboard>
		)
	}

	return (
		<AppModal
			visible={passwordModalVisible}
			hide={hide}
			fullScreen
			title="Set a Strong Password"
			children={children()}
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		button: {
			marginVertical: 20,
		},
		dot: {
			width: 3,
			height: 3,
			borderRadius: 3,
			marginRight: 15,
		},
		error: {
			marginTop: 10,
		},
		inputContainer: {
			marginBottom: 20,
		},
		opacity: {
			opacity: 1,
		},
		validation: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 12,
		},
	})
