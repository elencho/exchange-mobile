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
						'@assets': './src/assets',
						'@theme': './src/refactor/setup/theme',
						'@components': './src/refactor/common/components',
						'@store': './src/refactor/store',
						'@app': './src',
					},
				},
			],
		],
	}
}
