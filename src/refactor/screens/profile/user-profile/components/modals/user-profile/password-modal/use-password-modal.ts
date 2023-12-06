import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import { updatePasswordThunk } from '@app/refactor/redux/profile/profileThunks'
import { handleGeneralError } from '@app/refactor/utils/errorUtils'

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
		profile: { userProfileButtonsLoading },
	} = state

	const [generalErrorData, setGeneralErrorData] = useState<UiErrorData | null>(
		null
	)
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
		!userProfileButtonsLoading && togglePasswordModal(false)
	}

	const onHide = () => {
		setError(false)
		setGeneralErrorData(null)
		setPasswordState({
			secure: true,
			eightChars: false,
			hasNumber: false,
			hasUpperAndLower: false,
			currentPassword: '',
			newPassword: '',
			repeatPassword: '',
		})
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
			handleGeneralError(
				() =>
					dispatch(
						updatePasswordThunk({
							currentPassword,
							newPassword,
							repeatPassword,
							onSuccess: hide,
						})
					),
				setGeneralErrorData
			)
		}
	}

	const toggle = () =>
		setPasswordState((prevState) => ({
			...prevState,
			secure: !secure,
		}))

	const validate = (pass: string) => {
		let hasEightChars = pass.length >= 8
		let hasNumber = /\d/.test(pass)
		let hasLowercase = /[a-z]/.test(pass)
		let hasUppercase = /[A-Z]/.test(pass)

		setPasswordState((prevState) => ({
			...prevState,
			eightChars: hasEightChars,
			hasNumber: hasNumber,
			hasUpperAndLower: hasLowercase && hasUppercase,
		}))
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
		userProfileButtonsLoading,
		onHide,
		generalErrorData,
	}
}
