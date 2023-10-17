import { RootState } from '@app/refactor/redux/rootReducer'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

export const useModal = () => {
	const webViewVisible = useSelector((state: RootState) => state?.modals?.webViewVisible)

	return { webViewVisible }
}
