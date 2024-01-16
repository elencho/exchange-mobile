import { useAssets } from 'expo-asset'
import { useFonts } from 'expo-font'
import React, { useCallback } from 'react'
import { StatusBar, LogBox, View, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import store from '@app/refactor/redux/store'
import AppNavigator from '@app/refactor/setup/nav/index'
import AppToast from '@components/app_toast'
import images from './src/constants/images'
import {
	CryptalThemeProvider,
	Theme,
	useTheme,
} from './src/refactor/setup/theme'
import { THEME_DARK } from './src/refactor/setup/theme/variants'
import '@app/refactor/setup/network/interceptor'
import { System } from '@app/refactor/common/util'
import { ModalProvider } from '@components/modal/global_modal'

LogBox.ignoreLogs([
	// TODO: Remove when fixed
	'VirtualizedLists should never be nested',
])

const App = React.memo(() => {
	// useNotificationHandler()
	const [fontsLoaded] = useFonts({
		Ubuntu_Regular: require('./src/assets/fonts/Ubuntu_Regular.ttf'),
		Ubuntu_Medium: require('./src/assets/fonts/Ubuntu_Medium.ttf'),
		HelveticaNeue: require('./src/assets/fonts/HelveticaNeue.ttf'),
	})

	const { styles } = useTheme(_styles)
	const [assets] = useAssets(Object.values(images))

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) return
	}, [fontsLoaded])

	if (!fontsLoaded || !assets) {
		return <View />
	}

	return (
		<CryptalThemeProvider initial={THEME_DARK}>
			<Provider store={store}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<StatusBar
						backgroundColor={'transparent'}
						translucent
						barStyle="light-content"
					/>

					{System.isAndroid ? (
						<SafeAreaView
							style={styles.container}
							onLayout={onLayoutRootView}
							edges={['bottom']}>
							<ModalProvider>
								<AppToast />
								<AppNavigator />
							</ModalProvider>
						</SafeAreaView>
					) : (
						<>
							<ModalProvider>
								<AppToast />
								<AppNavigator />
							</ModalProvider>
						</>
					)}
				</GestureHandlerRootView>
			</Provider>
		</CryptalThemeProvider>
	)
})

const _styles = (theme: Theme) => {
	return StyleSheet.create({
		container: {
			flex: 1,
			overflow: 'hidden',
			backgroundColor: theme.color.backgroundPrimary,
		},
		statusBar: {
			flex: 0,
			backgroundColor: theme.color.backgroundPrimary,
		},
	})
}

export default App
