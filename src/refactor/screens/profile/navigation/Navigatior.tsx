import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Routes } from './routes'

const Stack = createNativeStackNavigator()

const Navigatior = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name={Routes.Profile} component={Splash} />
		</Stack.Navigator>
	)
}

export default Navigatior
