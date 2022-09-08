export default {
  name: 'cryptal-app',
  version: '1.0.0',
  extra: {
    auth:
      process.env.DEV === 'true'
        ? 'http://test-auth-cryptal.cryptx.loc'
        : 'https://auth.cryptal.com',
    core:
      process.env.DEV === 'true'
        ? 'http://test-core-matching.cryptx.loc/exchange/api/v1/mobile'
        : 'https://exchange.cryptal.com/exchange/api/v1/mobile',
    authRedirectUrl:
      process.env.DEV === 'true'
        ? 'http://test-core-matching.cryptx.loc'
        : 'https://cryptal.com',
  },
};
