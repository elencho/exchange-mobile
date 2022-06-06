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
        ? 'http://test-core-matching.cryptx.loc'
        : 'https://exchange.cryptal.com',
  },
};
