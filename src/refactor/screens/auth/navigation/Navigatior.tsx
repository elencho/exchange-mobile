import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Login from '../login'
import Maintenance from '../maintenance'
import Register from '../register'
import Splash from '../splash'
import UpdateAvailable from '../update'
import Welcome from '../welcome'
import { Routes } from './Routes'

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
