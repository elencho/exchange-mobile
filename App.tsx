import { useAssets } from 'expo-asset'
import { useFonts } from 'expo-font'
import React from 'react'
import { StatusBar, LogBox, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'

import AppToast from './src/components/AppToast'
import images from './src/constants/images'
import Navigator from './src/navigation'
import store from './src/redux/store'
import { CryptalThemeProvider } from './src/refactor/setup/theme'
import { THEME_DARK } from './src/refactor/setup/theme/variants'
import './src/utils/interceptor'

LogBox.ignoreLogs([
	// TODO: Remove when fixed
	'VirtualizedLists should never be nested',
])

const App = React.memo(() => {
	const [fontsLoaded] = useFonts({
		Ubuntu_Regular: require('./src/assets/fonts/Ubuntu_Regular.ttf'),
		Ubuntu_Medium: require('./src/assets/fonts/Ubuntu_Medium.ttf'),
	})

	const [assets] = useAssets(Object.values(images))

	if (!fontsLoaded || !assets) {
		return <View />
	}

	return (
		<CryptalThemeProvider initial={THEME_DARK}>
			<Provider store={store}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<StatusBar
						backgroundColor="transparent"
						translucent
						barStyle="light-content"
					/>
					<AppToast />
					<Navigator />
				</GestureHandlerRootView>
			</Provider>
		</CryptalThemeProvider>
	)
})

export default App
