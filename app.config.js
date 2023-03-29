export default {
  name: 'cryptal-app',
  version: '1.0.0',
  android: {
    package: 'com.cryptal.exchange.mobile',
  },
  ios: {
    bundleIdentifier: 'cryptalapp',
  },
  extra: {
    auth:
      process.env.DEV === 'true'
        ? 'https://auth.cryptal.com'
        : 'http://test-auth-cryptal.cryptx.loc',
    core:
      process.env.DEV === 'true'
        ? 'https://exchange.cryptal.com/exchange/api/v1/mobile'
        : 'http://test-core-matching.cryptx.loc/exchange/api/v1/mobile',

    authRedirectUrl:
      process.env.DEV === 'true'
        ? 'https://cryptal.com'
        : 'http://test-core-matching.cryptx.loc',
  },
};
