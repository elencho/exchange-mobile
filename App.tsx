import React from 'react'
import { StatusBar, LogBox, View } from 'react-native'
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font'
import { useAssets } from 'expo-asset'

import AppToast from './src/components/AppToast'
import Navigator from './src/navigation'
import store from './src/redux/store'
import images from './src/constants/images'
import './src/utils/i18n'
import './src/utils/interceptor'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { CryptalThemeProvider } from './src/refactor/common/theme/index.context'
import { THEME_DARK } from './src/refactor/common/theme'

LogBox.ignoreLogs([
	// TODO: Remove when fixed
	'VirtualizedLists should never be nested',
])

export const App = React.memo(() => {
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
