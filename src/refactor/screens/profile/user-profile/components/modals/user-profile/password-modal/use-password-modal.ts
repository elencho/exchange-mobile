import React, { useEffect, useReducer, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { togglePasswordModal } from '@app/refactor/redux/modals/actions'
import { updatePassword } from '@app/refactor/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'

export const usePasswordModal = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		modals: { passwordModalVisible },
		profile: { isProfileUpdating },
	} = state

	const [error, setError] = useState(false)

	const initialState = {
		secure: true,
		eightChars: false,
		hasNumber: false,
		hasUpperAndLower: false,
		currentPassword: '',
		newPassword: '',
		repeatPassword: '',
	}

	const reducer = (state, action) => {
		const { type, check, password } = action
		switch (type) {
			case 'checkEightChars':
				return { ...state, eightChars: check }
			case 'checkNumber':
				return { ...state, hasNumber: check }
			case 'checkUpperAndLower':
				return { ...state, hasUpperAndLower: check }
			case 'toggleSecure':
				return { ...state, secure: !state.secure }
			case 'currentPassword':
				return { ...state, currentPassword: password }
			case 'newPassword':
				return { ...state, newPassword: password }
			case 'repeatPassword':
				return { ...state, repeatPassword: password }
			case 'hide':
				return initialState
			default:
				throw new Error()
		}
	}

	const [passwordState, dispatchToReducer] = useReducer(reducer, initialState)

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
		dispatch(togglePasswordModal(false))
		dispatchToReducer({ type: 'hide' })
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
				updatePassword(currentPassword, newPassword, repeatPassword, hide)
			)
		}
	}

	const toggle = () => dispatchToReducer({ type: 'toggleSecure' })

	const handleCurrentPass = (password: string) =>
		dispatchToReducer({ type: 'currentPassword', password })
	const handleNewPass = (password: string) => {
		validate(password)
		dispatchToReducer({ type: 'newPassword', password })
	}
	const handleRepeatPass = (password: string) =>
		dispatchToReducer({ type: 'repeatPassword', password })

	const validate = (pass: string) => {
		dispatchToReducer({ type: 'checkEightChars', check: pass.length >= 8 })
		dispatchToReducer({ type: 'checkNumber', check: /\d/.test(pass) })
		dispatchToReducer({
			type: 'checkUpperAndLower',
			check: /^(?=.*[a-z])(?=.*[A-Z])\S+$/.test(pass),
		})
	}

	return {
		toggle,
		handleCurrentPass,
		handleNewPass,
		handleRepeatPass,
		handleSave,
		hide,
		isProfileUpdating,
		initialState,
		passwordModalVisible,
		error,
		newPassCond,
	}
}
