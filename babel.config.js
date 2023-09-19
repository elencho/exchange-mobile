module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'react-native-reanimated/plugin',
			[
				'module-resolver',
				{
					root: ['.'],
					extensions: [
						'android.tsx',
						'ios.tsx',
						'.tsx',
						'android.ts',
						'ios.ts',
						'.ts',
						'.json',
					],
					alias: {
						'@app': './src',
						'@theme': './src/refactor/setup/theme',
					},
				},
			],
		],
	}
}
