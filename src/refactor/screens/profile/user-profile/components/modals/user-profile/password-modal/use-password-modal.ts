import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import { updatePasswordThunk } from '@app/refactor/redux/profile/profileThunks'

export const usePasswordModal = ({
	togglePasswordModal,
	passwordModalVisible,
}: {
	togglePasswordModal: (v: boolean) => void
	passwordModalVisible: boolean
}) => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		profile: { userProfileLoading },
	} = state

	const [error, setError] = useState(false)
	const [passwordState, setPasswordState] = useState({
		secure: true,
		eightChars: false,
		hasNumber: false,
		hasUpperAndLower: false,
		currentPassword: '',
		newPassword: '',
		repeatPassword: '',
	})

	const {
		eightChars,
		hasNumber,
		hasUpperAndLower,
		newPassword,
		repeatPassword,
		currentPassword,
		secure,
	} = passwordState
	const newPassCond = newPassword && eightChars && hasUpperAndLower && hasNumber

	useEffect(() => {
		error && setError(false)
	}, [passwordModalVisible, passwordState])

	const hide = () => {
		togglePasswordModal(false)
	}

	const handleSave = () => {
		const condition =
			error ||
			!currentPassword ||
			!newPassword ||
			!repeatPassword ||
			!eightChars ||
			!hasNumber ||
			!hasUpperAndLower ||
			newPassword !== repeatPassword
		if (condition) {
			setError(true)
		} else {
			dispatch(
				updatePasswordThunk({
					currentPassword,
					newPassword,
					repeatPassword,
					hide,
				})
			)
		}
	}

	const toggle = () =>
		setPasswordState((prevState) => ({
			...prevState,
			secure: !secure,
		}))

	const validate = (pass: string) => {
		if (pass.length >= 8) {
			setPasswordState((prevState) => ({
				...prevState,
				eightChars: true,
			}))
		} else if (/\d/.test(pass)) {
			setPasswordState((prevState) => ({
				...prevState,
				hasNumber: true,
			}))
		} else if (/^(?=.*[a-z])(?=.*[A-Z])\S+$/.test(pass)) {
			setPasswordState((prevState) => ({
				...prevState,
				hasUpperAndLower: true,
			}))
		} else {
			setPasswordState((prevState) => ({
				...prevState,
				hasUpperAndLower: false,
				hasNumber: false,
				eightChars: false,
			}))
		}
	}
	const handleFieldChange = (fieldName: string, value: string) => {
		setPasswordState((prevState) => ({
			...prevState,
			[fieldName]: value,
		}))
		if (fieldName === 'newPassword') {
			validate(value)
		}
	}

	return {
		toggle,
		handleSave,
		hide,
		passwordState,
		error,
		newPassCond,
		handleFieldChange,
		userProfileLoading,
	}
}
