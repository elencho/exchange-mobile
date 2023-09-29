import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../splash'
import { Routes } from './Routes'
import Welcome from '../welcome'
import UpdateAvailable from '../update'
import Maintenance from '../maintenance'
import Login from '../login'
import Register from '../register'

const Stack = createNativeStackNavigator()

const Navigatior = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name={Routes.Splash} component={Splash} />
			<Stack.Screen
				name={Routes.Welcome}
				component={Welcome}
				options={{ animation: 'fade' }}
			/>
			<Stack.Screen
				name={Routes.UpdateAvailable}
				component={UpdateAvailable}
				options={{ animation: 'fade' }}
			/>
			<Stack.Screen
				name={Routes.Maintenance}
				component={Maintenance}
				options={{ animation: 'fade' }}
			/>
			{/* <Stack.Screen name={Routes.ForgotPassword} component={ForgotPassword} />
			<Stack.Screen
				name={Routes.SetNewPassword}
				component={SetNewPasswordScreen}
			/> */}
			<Stack.Screen name={Routes.Login} component={Login} />
			<Stack.Screen name={Routes.Registration} component={Register} />
			{/* <Stack.Screen
				name={Routes.EmailVerification}
				component={EmailVerification}
			/> */}
		</Stack.Navigator>
	)
}

export default Navigatior
